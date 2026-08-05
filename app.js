/* ============================================================
   פורטל שירות ותיקונים — לוגיקת אפליקציה (Vanilla JS + Supabase)
   ============================================================ */
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- מצב גלובלי ---------- */
const State = { user:null, profile:null, view:null, drawerOpen:false };

/* ---------- מטא-דאטה של סטטוסים (מפתח אנגלי -> תצוגה עברית) ----------
   מודל 8 שלבים. מפתחות ה-enum במסד נשמרים, רק התוויות והזרימה הותאמו. */
const STAGES = [
  ['draft','טיוטה'],
  ['opened','קריאה נפתחה'],
  ['at_supplier','נשלח לספק'],
  ['inspection','התקבל אצל הספק'],
  ['awaiting_approval','הצעת מחיר / חלקים'],
  ['in_repair','בתיקון'],
  ['handled','מוכן לחזרה לחנות'],
  ['received_at_store','חזר לחנות — מוכן לאיסוף'],
  ['delivered_closed','נמסר ללקוח ונסגר'],
];
const STAGE_LABEL = Object.fromEntries(STAGES);
/* סטטוס קצר לתגים במובייל */
const STAGE_SHORT = {
  draft:'טיוטה', opened:'נפתחה', at_supplier:'נשלח לספק', inspection:'אצל הספק',
  awaiting_approval:'הצעת מחיר', in_repair:'בתיקון', handled:'מוכן לחזרה',
  received_at_store:'מוכן לאיסוף', delivered_closed:'נמסר'
};
const RESULTS = [
  ['repaired','תוקן'],
  ['replaced','הוחלף בכלי חדש'],
  ['rejected_out_of_warranty','נדחה / מחוץ לאחריות'],
  ['returned_untouched','הוחזר ללא תיקון'],
];
const RESULT_LABEL = Object.fromEntries(RESULTS);
const WARRANTY = {in_warranty:'באחריות', out_of_warranty:'מחוץ לאחריות', to_verify:'נדרש בירור'};
const URGENCY  = {normal:'רגילה', urgent:'דחופה'};
const PAYER    = {customer:'לקוח', store:'חנות', supplier:'ספק'};
const OPEN_STAGES = STAGES.map(s=>s[0]).filter(k=>k!=='delivered_closed' && k!=='draft');

/* ---------- זרימת מעברים ופעולה הבאה ----------
   מגדיר לכל סטטוס מה הצעד הבא, מי מבצע אותו, ואיזו תווית על הכפתור. */
const FLOW = {
  opened:            {next:'at_supplier',       by:'store',    label:'סימון: נשלח לספק'},
  at_supplier:       {next:'inspection',        by:'supplier', label:'סימון: התקבל אצל הספק'},
  inspection:        {next:'awaiting_approval', by:'supplier', label:'העברה להצעת מחיר / חלקים'},
  awaiting_approval: {next:'in_repair',         by:'supplier', label:'סימון: אושר לתיקון'},
  in_repair:         {next:'handled',           by:'supplier', label:'סיום טיפול (עם תוצאה)'},
  handled:           {next:'received_at_store', by:'store',    label:'סימון: חזר לחנות'},
  received_at_store: {next:'delivered_closed',  by:'store',    label:'מסירה ללקוח והחתמה', special:'deliver'},
};
/* מעברים שמנהל חנות רשאי לבצע (נאכף גם ב-DB) */
const STORE_ALLOWED = [['opened','at_supplier'],['handled','received_at_store'],['received_at_store','delivered_closed']];
function storeCanMove(from,to){ return STORE_ALLOWED.some(p=>p[0]===from&&p[1]===to); }

/* ---------- עזרי DOM ---------- */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
function el(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstElementChild;}
function esc(s){return (s??'').toString().replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function fmtDate(d){if(!d)return '—';const x=new Date(d);return x.toLocaleDateString('he-IL')+' '+x.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'});}
function fmtDay(d){if(!d)return '—';return new Date(d).toLocaleDateString('he-IL');}
function daysBetween(a,b){return Math.max(0,Math.round((new Date(b)-new Date(a))/86400000));}
function pill(stage){const l=STAGE_LABEL[stage]||stage;return `<span class="pill s-${stage}"><span class="dot"></span>${esc(l)}</span>`;}
function toast(msg,type=''){const t=el(`<div class="toast ${type}">${esc(msg)}</div>`);$('#toasts').appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='.3s';setTimeout(()=>t.remove(),300);},3200);}
const isAdmin = ()=>State.profile?.role==='super_admin';
function overdue(r){return r.sla_due_at && OPEN_STAGES.includes(r.stage) && new Date(r.sla_due_at)<new Date();}

/* ---------- מודאל ---------- */
function openModal(title,bodyEl,footerEl,wide){
  const root=$('#modal-root');
  const m=el(`<div class="modal open"><div class="scrim"></div>
    <div class="box ${wide?'wide':''}"><div class="modal-h"><h3>${esc(title)}</h3>
    <button class="x" aria-label="סגירה">&times;</button></div>
    <div class="modal-b"></div><div class="modal-f"></div></div></div>`);
  m.querySelector('.modal-b').appendChild(bodyEl);
  if(footerEl) m.querySelector('.modal-f').appendChild(footerEl); else m.querySelector('.modal-f').remove();
  const close=()=>m.remove();
  m.querySelector('.x').onclick=close; m.querySelector('.scrim').onclick=close;
  root.appendChild(m); return {close,el:m};
}

/* ---------- קלט טופס עזר ---------- */
function fieldset(fields){
  // fields: [{name,label,type,req,options,value,ph,full}]
  const wrap=el('<div class="grid2"></div>');
  fields.forEach(f=>{
    const id='f_'+f.name;
    const w=el(`<div class="field" ${f.full?'style="grid-column:1/-1"':''}></div>`);
    w.appendChild(el(`<label for="${id}">${esc(f.label)}${f.req?' <span class="req">*</span>':''}</label>`));
    let inp;
    if(f.type==='select'){
      inp=el(`<select class="select" id="${id}" name="${f.name}"></select>`);
      (f.options||[]).forEach(o=>{const op=el(`<option value="${esc(o[0])}">${esc(o[1])}</option>`);if(String(f.value)===String(o[0]))op.selected=true;inp.appendChild(op);});
    }else if(f.type==='textarea'){
      inp=el(`<textarea class="textarea" id="${id}" name="${f.name}" placeholder="${esc(f.ph||'')}">${esc(f.value||'')}</textarea>`);
    }else{
      inp=el(`<input class="input" id="${id}" name="${f.name}" type="${f.type||'text'}" placeholder="${esc(f.ph||'')}" value="${esc(f.value??'')}">`);
    }
    w.appendChild(inp);
    w.appendChild(el(`<div class="err hidden"></div>`));
    wrap.appendChild(w);
  });
  return wrap;
}
function readForm(container){const o={};$$('[name]',container).forEach(i=>o[i.name]=i.value.trim());return o;}
function validate(container,required){
  let ok=true;
  $$('.err',container).forEach(e=>e.classList.add('hidden'));
  required.forEach(name=>{
    const inp=$(`[name="${name}"]`,container); if(!inp)return;
    const err=inp.parentElement.querySelector('.err');
    if(!inp.value.trim()){ok=false;if(err){err.textContent='שדה חובה';err.classList.remove('hidden');}}
  });
  const phone=$('[name="phone"]',container);
  if(phone&&phone.value.trim()&&!/^0\d{1,2}-?\d{7}$|^\d{9,10}$/.test(phone.value.replace(/[\s-]/g,''))){
    ok=false;const err=phone.parentElement.querySelector('.err');if(err){err.textContent='מספר טלפון לא תקין';err.classList.remove('hidden');}
  }
  return ok;
}

/* ============================================================
   אתחול והתחברות
   ============================================================ */
async function boot(){
  const {data:{session}}=await sb.auth.getSession();
  if(session){ await afterLogin(session.user); }
  else renderLogin();
  sb.auth.onAuthStateChange((_e,s)=>{ if(!s) renderLogin(); });
}

async function afterLogin(user){
  State.user=user;
  const {data:prof,error}=await sb.from('profiles').select('*').eq('id',user.id).single();
  if(error||!prof){ toast('לא נמצא פרופיל למשתמש. פנה למנהל המערכת.','err'); await sb.auth.signOut(); renderLogin(); return; }
  if(prof.is_active===false){ toast('המשתמש מושבת. פנה למנהל המערכת.','err'); await sb.auth.signOut(); renderLogin(); return; }
  State.profile=prof;
  sb.from('profiles').update({last_login_at:new Date().toISOString()}).eq('id',user.id).then(()=>{});
  if(!location.hash) location.hash = isAdmin()?'#/dash':'#/dash';
  renderShell(); route();
}

function renderLogin(){
  State.user=null;State.profile=null;
  $('#app').innerHTML='';
  const card=el(`<div class="login-wrap"><div class="login-card">
    <div class="logo">${icon('wrench',24)}</div>
    <h1>פורטל שירות ותיקונים</h1>
    <div class="sub">התחברות עם שם משתמש וסיסמה</div>
    <div class="field"><label>שם משתמש</label><input class="input" id="lg-user" autocomplete="username" placeholder="שם משתמש"></div>
    <div class="field"><label>סיסמה</label><input class="input" id="lg-pass" type="password" autocomplete="current-password" placeholder="••••••••"></div>
    <div class="err hidden" id="lg-err" style="color:var(--danger);margin-bottom:12px"></div>
    <button class="btn primary block" id="lg-btn">כניסה</button>
  </div></div>`);
  $('#app').appendChild(card);
  const doLogin=async()=>{
    const u=$('#lg-user').value.trim().toLowerCase(), p=$('#lg-pass').value;
    const errEl=$('#lg-err'); errEl.classList.add('hidden');
    if(!u||!p){errEl.textContent='נא למלא שם משתמש וסיסמה';errEl.classList.remove('hidden');return;}
    const btn=$('#lg-btn');btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
    const email = u.includes('@') ? u : `${u}@${EMAIL_DOMAIN}`;
    const {data,error}=await sb.auth.signInWithPassword({email,password:p});
    if(error){errEl.textContent='שם משתמש או סיסמה שגויים';errEl.classList.remove('hidden');btn.disabled=false;btn.textContent='כניסה';return;}
    await afterLogin(data.user);
  };
  $('#lg-btn').onclick=doLogin;
  $('#lg-pass').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
}

async function logout(){ await sb.auth.signOut(); location.hash=''; renderLogin(); }

/* ============================================================
   מעטפת (sidebar + ניתוב)
   ============================================================ */
function navItems(){
  if(isAdmin()) return [
    ['#/dash','לוח בקרה','gauge'],
    ['#/requests','קריאות שירות','clipboard'],
    ['sep'],
    ['#/stores','חנויות','store'],
    ['#/users','משתמשים','users'],
    ['sep'],
    ['#/reports','דוחות וייצוא','download'],
  ];
  return [
    ['#/dash','לוח בקרה','gauge'],
    ['#/todo','הבא לי','check'],
    ['#/new','פתיחת קריאה','plus'],
    ['#/requests','הקריאות שלי','clipboard'],
  ];
}
function renderShell(){
  const nav = navItems().map(it=>it[0]==='sep'?'<div class="sep"></div>':
    `<a href="${it[0]}" data-path="${it[0]}">${icon(it[2])}<span>${esc(it[1])}</span></a>`).join('');
  const who=esc(State.profile.full_name), role=isAdmin()?'מנהל מערכת (ספק)':'מנהל חנות';
  $('#app').innerHTML='';
  const shell=el(`<div class="shell">
    <aside class="sidebar">
      <div class="brand"><div class="logo">${icon('wrench',20)}</div>
        <div><b>פורטל שירות</b><br><span>ניהול תיקונים ואחריות</span></div></div>
      <nav class="nav">${nav}</nav>
      <div class="side-foot"><div class="who">${who}</div><div class="role">${role}</div>
        <button class="btn sm block" id="logout-btn">${icon('logout',15)} התנתקות</button></div>
    </aside>
    <div class="main">
      <div class="topbar">
        <div class="row"><div class="logo">${icon('wrench',18)}</div><b>פורטל שירות</b></div>
        <button class="burger" id="burger" aria-label="תפריט">${icon('menu',24)}</button>
      </div>
      <div class="content" id="content"></div>
    </div>
    <div class="drawer" id="drawer"><div class="scrim"></div>
      <div class="panel"><div class="brand"><div class="logo">${icon('wrench',20)}</div>
        <div><b>פורטל שירות</b></div></div>
        <nav class="nav">${nav}</nav>
        <div class="side-foot"><div class="who">${who}</div><div class="role">${role}</div>
          <button class="btn sm block" id="logout-btn2">${icon('logout',15)} התנתקות</button></div></div>
    </div>
  </div>`);
  $('#app').appendChild(shell);
  $('#logout-btn').onclick=logout; $('#logout-btn2').onclick=logout;
  const drawer=$('#drawer');
  $('#burger').onclick=()=>drawer.classList.add('open');
  drawer.querySelector('.scrim').onclick=()=>drawer.classList.remove('open');
  $$('.nav a').forEach(a=>a.addEventListener('click',()=>drawer.classList.remove('open')));
}

function setActiveNav(path){
  $$('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.path===path||(path.startsWith('#/requests')&&a.dataset.path==='#/requests')));
}

window.addEventListener('hashchange',route);
function route(){
  if(!State.profile)return;
  const hash=location.hash||'#/dash';
  const [path,arg]=hash.split('/id/');
  setActiveNav(path);
  const c=$('#content'); if(!c)return; c.innerHTML='<div class="center-load"><span class="spinner"></span></div>';
  const base=hash.split('?')[0];
  if(base.startsWith('#/requests/id/')) return viewRequestDetail(hash.replace('#/requests/id/',''));
  switch(base){
    case '#/dash': return isAdmin()?adminDash():storeDash();
    case '#/todo': return isAdmin()?adminDash():todoView();
    case '#/requests': return requestsList();
    case '#/new': return newRequestWizard();
    case '#/stores': return isAdmin()?storesView():deny();
    case '#/users': return isAdmin()?usersView():deny();
    case '#/reports': return isAdmin()?reportsView():deny();
    default: c.innerHTML='<div class="empty">הדף לא נמצא</div>';
  }
}
function deny(){ $('#content').innerHTML='<div class="empty">אין לך הרשאה לצפות בעמוד זה</div>'; }
function pageHead(title,sub,actions){
  return `<div class="page-h"><div class="row spread wrap"><div><h1>${esc(title)}</h1>${sub?`<p>${esc(sub)}</p>`:''}</div>${actions||''}</div></div>`;
}

/* ============================================================
   לוח בקרה — מנהל מערכת
   ============================================================ */
async function adminDash(){
  const c=$('#content');
  const {data:rows,error}=await sb.from('service_requests').select('id,stage,sla_due_at,created_at,store_id').eq('is_archived',false);
  if(error){c.innerHTML=errBox(error);return;}
  const now=new Date(), monthStart=new Date(now.getFullYear(),now.getMonth(),1);
  const count=st=>rows.filter(r=>r.stage===st).length;
  const waitingSupplier = count('at_supplier'); // נשלח לספק, ממתין שאסמן שהתקבל
  const stats=[
    ['ממתין לפעולתי', waitingSupplier+count('inspection')+count('awaiting_approval')+count('in_repair'),'accent'],
    ['נשלח אליי (בדרך)', count('at_supplier'),''],
    ['אצל הספק / בבדיקה', count('inspection'),''],
    ['הצעת מחיר / חלקים', count('awaiting_approval'),''],
    ['בתיקון', count('in_repair'),''],
    ['מוכן לחזרה לחנות', count('handled'),''],
    ['אצל החנות / באיסוף', count('received_at_store'),''],
    ['חריגות SLA', rows.filter(overdue).length,'warn'],
    ['נסגרו החודש', rows.filter(r=>r.stage==='delivered_closed'&&new Date(r.created_at)>=monthStart).length,''],
  ];
  c.innerHTML=pageHead('לוח בקרה','תמונת מצב של כל הקריאות בכל החנויות');
  c.appendChild(el(`<div class="stats">${stats.map(s=>`<div class="stat ${s[2]}"><div class="n tnum">${s[1]}</div><div class="l">${esc(s[0])}</div></div>`).join('')}</div>`));
  const all=await loadRequests({});
  const mine=all.filter(r=>['at_supplier','inspection','awaiting_approval','in_repair'].includes(r.stage));
  if(mine.length){c.appendChild(el(`<div class="section-title">ממתין לטיפולך</div>`));c.appendChild(requestsList2(mine,true));}
  c.appendChild(el(`<div class="section-title">קריאות אחרונות</div>`));
  c.appendChild(requestsList2(all.slice(0,10),true));
}

/* ============================================================
   לוח בקרה — מנהל חנות (עם "הבא לי")
   ============================================================ */
async function storeDash(){
  const c=$('#content');
  const rows=await loadRequests({});
  const count=st=>rows.filter(r=>r.stage===st).length;
  const inService=rows.filter(r=>['at_supplier','inspection','awaiting_approval','in_repair','handled'].includes(r.stage)).length;
  const stats=[
    ['לשליחה לספק', count('opened'),count('opened')?'accent':''],
    ['בטיפול הספק', inService,''],
    ['מוכן לאיסוף לקוח', count('received_at_store'),count('received_at_store')?'accent':''],
    ['נסגרו', count('delivered_closed'),''],
  ];
  c.innerHTML=pageHead('לוח בקרה','הקריאות של החנות שלך',
    `<a href="#/new" class="btn primary">${icon('plus',16)} פתיחת קריאה חדשה</a>`);
  c.appendChild(el(`<div class="stats">${stats.map(s=>`<div class="stat ${s[2]}"><div class="n tnum">${s[1]}</div><div class="l">${esc(s[0])}</div></div>`).join('')}</div>`));

  // הבא לי — כל מה שדורש פעולה של החנות
  const todo=rows.filter(r=>['opened','handled','received_at_store'].includes(r.stage));
  if(todo.length){
    c.appendChild(el(`<div class="section-title">${icon('check',13)} הבא לי — ממתין לפעולתך</div>`));
    c.appendChild(requestsList2(todo,false,true));
  }
  c.appendChild(el(`<div class="section-title">קריאות אחרונות</div>`));
  c.appendChild(requestsList2(rows.slice(0,12),false));
}

/* ============================================================
   הבא לי — כל מה שממתין לפעולת החנות, מקובץ לפי סוג הפעולה
   ============================================================ */
async function todoView(){
  const c=$('#content');
  const rows=await loadRequests({});
  c.innerHTML=pageHead('הבא לי','כל מה שממתין לפעולה שלך — לפי סדר עדיפות');
  const groups=[
    ['received_at_store','מוכן למסירה ללקוח','כלים שחזרו מהספק וממתינים שהלקוח יאסוף'],
    ['handled','לסמן שחזר מהספק','הספק סיים — סמן קבלה בחנות'],
    ['opened','לשלוח לספק','קריאות חדשות שממתינות לשליחה'],
  ];
  let any=false;
  groups.forEach(([stage,title,desc])=>{
    const list=rows.filter(r=>r.stage===stage);
    if(!list.length)return; any=true;
    c.appendChild(el(`<div class="section-title">${esc(title)} · ${list.length}</div><p class="small muted" style="margin:-4px 0 10px">${esc(desc)}</p>`));
    c.appendChild(requestsList2(list,false,true));
  });
  if(!any) c.appendChild(el(`<div class="empty">${icon('check',40)}<div>אין משימות ממתינות. הכל מטופל 🎉</div></div>`));
}
async function loadRequests(opts={}){
  let q=sb.from('service_requests')
    .select('*, customers(full_name,phone,city,street), tools(category,brand,model,serial_no,sku,warranty), stores(name)')
    .eq('is_archived',false).order('created_at',{ascending:false});
  if(opts.limit)q=q.limit(opts.limit);
  const {data,error}=await q;
  if(error){toast('שגיאה בטעינת קריאות','err');return [];}
  return data||[];
}

/* ============================================================
   רשימת קריאות + חיפוש/סינון
   ============================================================ */
let _reqCache=[];
async function requestsList(){
  const c=$('#content');
  c.innerHTML=pageHead('קריאות שירות', isAdmin()?'כל הקריאות מכל החנויות':'הקריאות בהרשאתך',
    isAdmin()?'':`<a href="#/new" class="btn primary">${icon('plus',16)} קריאה חדשה</a>`);
  const bar=el(`<div class="card pad" style="margin-bottom:16px">
    <div class="row wrap" style="gap:10px">
      <input class="input" id="q" placeholder="חיפוש: מספר קריאה, לקוח, טלפון, דגם, מספר סידורי..." style="min-width:260px;flex:1">
      <select class="select" id="f-stage" style="max-width:190px"><option value="">כל הסטטוסים</option>${STAGES.map(s=>`<option value="${s[0]}">${esc(s[1])}</option>`).join('')}</select>
      <select class="select" id="f-open" style="max-width:150px"><option value="">פתוחות וסגורות</option><option value="open">פתוחות</option><option value="closed">סגורות</option><option value="overdue">חריגות SLA</option></select>
      <button class="btn" id="f-clear">ניקוי</button>
      ${isAdmin()?`<button class="btn" id="f-csv">${icon('download',15)} ייצוא CSV</button>`:''}
    </div></div>`);
  c.appendChild(bar);
  const holder=el('<div id="req-holder"><div class="center-load"><span class="spinner"></span></div></div>');
  c.appendChild(holder);
  _reqCache=await loadRequests({});
  const apply=()=>{
    const q=$('#q').value.trim().toLowerCase();
    const st=$('#f-stage').value, op=$('#f-open').value;
    let list=_reqCache.filter(r=>{
      if(st&&r.stage!==st)return false;
      if(op==='open'&&!OPEN_STAGES.includes(r.stage))return false;
      if(op==='closed'&&r.stage!=='delivered_closed')return false;
      if(op==='overdue'&&!overdue(r))return false;
      if(q){
        const hay=[r.request_no,r.customers?.full_name,r.customers?.phone,r.tools?.brand,r.tools?.model,
          r.tools?.serial_no,r.tools?.sku,r.tools?.category,r.fault_description,r.stores?.name,r.branches?.name,r.opened_by_name]
          .join(' ').toLowerCase();
        if(!hay.includes(q))return false;
      }
      return true;
    });
    holder.innerHTML=''; holder.appendChild(requestsList2(list,isAdmin(),true));
    $('#count-lbl') && ($('#count-lbl').textContent=list.length+' קריאות');
  };
  apply();
  $('#q').addEventListener('input',debounce(apply,200));
  $('#f-stage').onchange=apply; $('#f-open').onchange=apply;
  $('#f-clear').onclick=()=>{$('#q').value='';$('#f-stage').value='';$('#f-open').value='';apply();};
  if(isAdmin()) $('#f-csv').onclick=()=>exportCSV(currentFiltered());
  function currentFiltered(){const q=$('#q').value.trim().toLowerCase();const st=$('#f-stage').value,op=$('#f-open').value;
    return _reqCache.filter(r=>{if(st&&r.stage!==st)return false;if(op==='open'&&!OPEN_STAGES.includes(r.stage))return false;
      if(op==='closed'&&r.stage!=='delivered_closed')return false;if(op==='overdue'&&!overdue(r))return false;
      if(q){const hay=[r.request_no,r.customers?.full_name,r.customers?.phone,r.tools?.brand,r.tools?.model,r.tools?.serial_no].join(' ').toLowerCase();if(!hay.includes(q))return false;}return true;});}
}

function isMobile(){ return window.matchMedia('(max-width:860px)').matches; }

/* כפתור "צעד הבא" מהיר לפי הסטטוס והתפקיד */
function quickActionBtn(r,onDone){
  const flow=FLOW[r.stage]; if(!flow) return null;
  if(!(isAdmin()||flow.by==='store')) return null;
  const b=el(`<button class="btn primary sm">${esc(flow.label)}</button>`);
  b.onclick=async(e)=>{
    e.stopPropagation();
    if(flow.special==='deliver'){ deliveryFlow(r); return; }
    if(flow.next==='handled'){ promptResult(r); return; }
    b.disabled=true;b.innerHTML='<span class="spinner"></span>';
    await changeStage(r,flow.next,null,null,onDone||(()=>route()));
  };
  return b;
}

/* רשימה רספונסיבית: טבלה במחשב, כרטיסים בטלפון */
function requestsList2(list,adminCols,showQuick){
  if(!list.length) return el(`<div class="empty">${icon('inbox',40)}<div>אין קריאות להצגה</div></div>`);
  if(isMobile()){
    const wrap=el('<div class="rcards"></div>');
    [...list].forEach(r=>wrap.appendChild(requestCard(r,showQuick)));
    return wrap;
  }
  return requestsTable(list,adminCols,showQuick);
}

function requestCard(r,showQuick){
  const card=el(`<div class="rcard">
    <div class="rcard-top">
      <span class="pill s-${r.stage}"><span class="dot"></span>${esc(STAGE_SHORT[r.stage]||STAGE_LABEL[r.stage])}</span>
      ${overdue(r)?'<span class="pill warn"><span class="dot"></span>חריגה</span>':''}
      <span class="grow"></span>
      <span class="mono small muted">${esc(r.request_no||'')}</span>
    </div>
    <div class="rcard-cust">${esc(r.customers?.full_name||'—')} ${r.urgency==='urgent'?'<span class="chip" style="padding:1px 7px;font-size:11px">⚡ דחוף</span>':''}</div>
    <div class="small muted">${esc((r.tools?.brand||'')+' '+(r.tools?.model||''))} · ${esc(r.tools?.category||'')}</div>
    ${isAdmin()&&r.stores?.name?`<div class="small muted">${icon('store',12)} ${esc(r.stores.name)}</div>`:''}
    <div class="rcard-foot"><span class="small muted">${daysBetween(r.created_at,new Date())} ימים בטיפול</span><span class="grow"></span></div>
  </div>`);
  card.onclick=()=>location.hash='#/requests/id/'+r.id;
  if(showQuick){ const q=quickActionBtn(r,()=>route()); if(q){q.onclick=(orig=>e=>{e.stopPropagation();orig(e);})(q.onclick);card.querySelector('.rcard-foot').appendChild(q);} }
  return card;
}

let _sortCol='created_at', _sortDir=-1;
function requestsTable(list,adminCols,showQuick){
  if(!list.length) return el(`<div class="empty">${icon('inbox',40)}<div>אין קריאות להצגה</div></div>`);
  const cols = adminCols
    ? [['request_no','מס׳ קריאה'],['created_at','נפתחה'],['store','חנות'],['customer','לקוח'],['tool','כלי'],['stage','סטטוס'],['days','ימים'],['','']]
    : [['request_no','מס׳ קריאה'],['created_at','נפתחה'],['customer','לקוח'],['tool','כלי'],['stage','סטטוס'],['days','ימים'],['','']];
  const sorted=[...list].sort((a,b)=>{
    const g=(r)=>({request_no:r.request_no,created_at:r.created_at,store:r.stores?.name,customer:r.customers?.full_name,
      tool:(r.tools?.brand+' '+r.tools?.model),stage:STAGE_LABEL[r.stage],days:daysBetween(r.created_at,new Date())}[_sortCol]);
    const av=g(a),bv=g(b); return (av>bv?1:av<bv?-1:0)*_sortDir;
  });
  const wrap=el('<div class="tbl-wrap"><table class="tbl"><thead></thead><tbody></tbody></table></div>');
  const thead=wrap.querySelector('thead'), tbody=wrap.querySelector('tbody');
  const tr=el('<tr></tr>');
  cols.forEach(col=>{
    const th=el(`<th class="${col[0]?'':'no-sort'}">${esc(col[1])}${col[0]&&_sortCol===col[0]?(_sortDir<0?' ▾':' ▴'):''}</th>`);
    if(col[0])th.onclick=()=>{if(_sortCol===col[0])_sortDir*=-1;else{_sortCol=col[0];_sortDir=1;}
      const holder=wrap.parentElement;holder.innerHTML='';holder.appendChild(requestsTable(list,adminCols,showQuick));};
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  sorted.forEach(r=>{
    const row=el(`<tr>
      <td><span class="link mono">${esc(r.request_no||'—')}</span>${overdue(r)?' <span class="pill warn"><span class="dot"></span>חריגה</span>':''}</td>
      <td class="small">${fmtDay(r.created_at)}</td>
      ${adminCols?`<td>${esc(r.stores?.name||'—')}</td>`:''}
      <td>${esc(r.customers?.full_name||'—')}<br><span class="small muted mono">${esc(r.customers?.phone||'')}</span></td>
      <td>${esc((r.tools?.brand||'')+' '+(r.tools?.model||''))}<br><span class="small muted">${esc(r.tools?.category||'')}</span></td>
      <td>${pill(r.stage)}</td>
      <td class="tnum">${daysBetween(r.created_at,new Date())}</td>
      <td class="row" style="gap:6px"></td>
    </tr>`);
    const actCell=row.querySelector('td:last-child');
    if(showQuick){ const q=quickActionBtn(r,()=>route()); if(q)actCell.appendChild(q); }
    const openBtn=el('<button class="btn sm">פתיחה</button>'); openBtn.onclick=()=>location.hash='#/requests/id/'+r.id; actCell.appendChild(openBtn);
    row.querySelector('.link').onclick=()=>location.hash='#/requests/id/'+r.id;
    tbody.appendChild(row);
  });
  return wrap;
}
function exportCSV(list){
  const head=['מספר קריאה','נפתחה','חנות','ממלא','לקוח','טלפון','סוג כלי','מותג','דגם','מספר סידורי','סטטוס','אחריות','ימים בטיפול','עדכון אחרון'];
  const rows=list.map(r=>[r.request_no,fmtDate(r.created_at),r.stores?.name,r.opened_by_name,
    r.customers?.full_name,r.customers?.phone,r.tools?.category,r.tools?.brand,r.tools?.model,r.tools?.serial_no,
    STAGE_LABEL[r.stage],WARRANTY[r.tools?.warranty],daysBetween(r.created_at,new Date()),fmtDate(r.updated_at)]);
  const csv='\uFEFF'+[head,...rows].map(row=>row.map(c=>`"${(c??'').toString().replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download=`kriaot_${new Date().toISOString().slice(0,10)}.csv`;a.click();
  toast('הקובץ יוצא','ok');
}

/* ============================================================
   פתיחת קריאה — אשף
   ============================================================ */
async function newRequestWizard(){
  const c=$('#content');
  // טעינת סניפים בהרשאת המשתמש
  let stores=[];
  if(isAdmin()){ const {data}=await sb.from('stores').select('id,name').eq('is_active',true).eq('is_archived',false).order('name'); stores=data||[]; }
  else { const {data}=await sb.from('stores').select('id,name').eq('id',State.profile.store_id); stores=data||[]; }
  const data={step:1};
  c.innerHTML=pageHead('פתיחת קריאת שירות','מלא את הפרטים בשלבים. הטיוטה נשמרת אוטומטית.');
  const shell=el(`<div class="card pad" style="max-width:820px">
    <div class="steps"><div class="s cur"></div><div class="s"></div><div class="s"></div><div class="s"></div></div>
    <div class="step-label" id="step-label"></div>
    <div id="wizard-body"></div>
    <div class="row spread" style="margin-top:20px">
      <button class="btn" id="wz-back" style="visibility:hidden">חזרה</button>
      <button class="btn primary" id="wz-next">המשך</button>
    </div>
  </div>`);
  c.appendChild(shell);
  const body=$('#wizard-body');
  const labels=['שלב 1 מתוך 4 · פרטי הסניף והלקוח','שלב 2 מתוך 4 · פרטי הכלי','שלב 3 מתוך 4 · קבצים מצורפים','שלב 4 מתוך 4 · סיכום ואישור'];
  let filesToUpload=[];

  function render(){
    $$('.steps .s').forEach((s,i)=>{s.className='s'+(i+1<data.step?' done':i+1===data.step?' cur':'');});
    $('#step-label').textContent=labels[data.step-1];
    $('#wz-back').style.visibility=data.step>1?'visible':'hidden';
    $('#wz-next').textContent=data.step===4?'שליחת הקריאה':'המשך';
    body.innerHTML='';
    if(data.step===1){
      const storeOpts=stores.map(s=>[s.id,s.name]);
      body.appendChild(el('<div class="section-title" style="margin-top:0">פרטי החנות והעובד</div>'));
      const f1=[{name:'opened_by_name',label:'שם ממלא הקריאה',req:true,value:data.opened_by_name||State.profile.full_name}];
      if(isAdmin()) f1.unshift({name:'store_id',label:'חנות',type:'select',req:true,options:[['','בחר חנות...'],...storeOpts],value:data.store_id});
      else data.store_id=State.profile.store_id;
      body.appendChild(fieldset(f1));
      body.appendChild(el('<div class="section-title">פרטי הלקוח הסופי</div>'));
      body.appendChild(fieldset([
        {name:'full_name',label:'שם מלא',req:true,value:data.full_name},
        {name:'phone',label:'טלפון',req:true,type:'tel',value:data.phone},
        {name:'phone_alt',label:'טלפון נוסף',type:'tel',value:data.phone_alt},
        {name:'city',label:'יישוב',value:data.city},
        {name:'street',label:'רחוב',value:data.street},
        {name:'house_no',label:'מספר בית',value:data.house_no},
        {name:'apartment',label:'דירה',value:data.apartment},
        {name:'address_notes',label:'הערות לכתובת',value:data.address_notes,full:true},
      ]));
    }
    else if(data.step===2){
      body.appendChild(fieldset([
        {name:'category',label:'סוג הכלי',req:true,value:data.category,ph:'מברגה, מקדחה, פטישון...'},
        {name:'brand',label:'מותג',req:true,value:data.brand},
        {name:'model',label:'דגם',req:true,value:data.model},
        {name:'serial_no',label:'מספר סידורי',value:data.serial_no},
        {name:'sku',label:'מק״ט',value:data.sku},
        {name:'purchase_date',label:'תאריך רכישה',type:'date',value:data.purchase_date},
        {name:'invoice_no',label:'מספר חשבונית',value:data.invoice_no},
        {name:'warranty',label:'מצב אחריות',type:'select',value:data.warranty||'to_verify',options:Object.entries(WARRANTY)},
        {name:'accessories',label:'אביזרים שנמסרו',value:data.accessories,ph:'סוללה, מטען, מזוודה...',full:true},
        {name:'external_condition',label:'מצב חיצוני בקבלה',value:data.external_condition,full:true},
        {name:'fault_description',label:'תיאור התקלה לפי הלקוח',type:'textarea',req:true,value:data.fault_description,full:true},
        {name:'employee_notes',label:'הערות עובד החנות',type:'textarea',value:data.employee_notes,full:true},
        {name:'urgency',label:'דחיפות',type:'select',value:data.urgency||'normal',options:Object.entries(URGENCY)},
      ]));
    }
    else if(data.step===3){
      body.appendChild(el(`<div class="field"><label>צירוף תמונות, סרטונים או מסמכים</label>
        <input class="input" type="file" id="file-in" multiple accept="image/*,video/*,application/pdf" style="padding:8px">
        <div class="small muted">אפשר לצלם ישירות מהמצלמה בטלפון. עד 20MB לקובץ.</div></div>
        <div class="row wrap" id="file-list" style="margin-top:8px"></div>`));
      const renderFiles=()=>{const fl=$('#file-list');fl.innerHTML='';filesToUpload.forEach((f,i)=>{
        const chip=el(`<div class="chip">${esc(f.name)} <button title="הסרה">&times;</button></div>`);
        chip.querySelector('button').onclick=()=>{filesToUpload.splice(i,1);renderFiles();};fl.appendChild(chip);});};
      $('#file-in').onchange=e=>{[...e.target.files].forEach(f=>{if(f.size>20*1024*1024){toast(`הקובץ ${f.name} גדול מ-20MB`,'err');return;}filesToUpload.push(f);});e.target.value='';renderFiles();};
      renderFiles();
    }
    else if(data.step===4){
      const st=stores.find(x=>x.id===data.store_id);
      body.appendChild(el(`<div class="section-title" style="margin-top:0">סיכום הקריאה</div>
        <dl class="kv">
          <dt>חנות</dt><dd>${esc(st?st.name:'—')}</dd>
          <dt>ממלא הקריאה</dt><dd>${esc(data.opened_by_name||'')}</dd>
          <dt>לקוח</dt><dd>${esc(data.full_name||'')} · ${esc(data.phone||'')}</dd>
          <dt>כתובת</dt><dd>${esc([data.city,data.street,data.house_no].filter(Boolean).join(' '))||'—'}</dd>
          <dt>כלי</dt><dd>${esc([data.category,data.brand,data.model].filter(Boolean).join(' · '))}</dd>
          <dt>מספר סידורי</dt><dd>${esc(data.serial_no||'—')}</dd>
          <dt>אחריות</dt><dd>${esc(WARRANTY[data.warranty]||'')}</dd>
          <dt>דחיפות</dt><dd>${esc(URGENCY[data.urgency]||'רגילה')}</dd>
          <dt>תקלה</dt><dd>${esc(data.fault_description||'')}</dd>
          <dt>קבצים</dt><dd>${filesToUpload.length} קבצים</dd>
        </dl>`));
    }
  }
  function save(){ Object.assign(data, readForm(body)); }
  $('#wz-back').onclick=()=>{save();data.step--;render();};
  $('#wz-next').onclick=async()=>{
    if(data.step===1){ const req=isAdmin()?['store_id','opened_by_name','full_name','phone']:['opened_by_name','full_name','phone']; if(!validate(body,req))return; save(); if(!isAdmin())data.store_id=State.profile.store_id; data.step=2; render(); }
    else if(data.step===2){ if(!validate(body,['category','brand','model','fault_description']))return; save(); data.step=3; render(); }
    else if(data.step===3){ data.step=4; render(); }
    else { await submitRequest(data,filesToUpload); }
  };
  render();
}

async function submitRequest(data,files){
  const btn=$('#wz-next');btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
  const store_id=data.store_id;
  try{
    const {data:cust,error:e1}=await sb.from('customers').insert({
      store_id,full_name:data.full_name,phone:data.phone,phone_alt:data.phone_alt||null,
      city:data.city||null,street:data.street||null,house_no:data.house_no||null,apartment:data.apartment||null,address_notes:data.address_notes||null
    }).select().single();
    if(e1)throw e1;
    const {data:tool,error:e2}=await sb.from('tools').insert({
      category:data.category,brand:data.brand,model:data.model,serial_no:data.serial_no||null,sku:data.sku||null,
      purchase_date:data.purchase_date||null,invoice_no:data.invoice_no||null,warranty:data.warranty||'to_verify',
      accessories:data.accessories||null,external_condition:data.external_condition||null
    }).select().single();
    if(e2)throw e2;
    const {data:req,error:e3}=await sb.from('service_requests').insert({
      store_id,opened_by:State.profile.id,opened_by_name:data.opened_by_name,
      customer_id:cust.id,tool_id:tool.id,fault_description:data.fault_description,employee_notes:data.employee_notes||null,
      urgency:data.urgency||'normal',stage:'opened'
    }).select().single();
    if(e3)throw e3;
    await sb.from('status_history').insert({request_id:req.id,store_id,from_stage:null,to_stage:'opened',note:'נפתחה קריאה',changed_by:State.profile.id});
    await sb.from('audit_log').insert({actor_id:State.profile.id,store_id,entity:'service_request',entity_id:req.id,action:'create',details:{request_no:req.request_no}});
    // העלאת קבצים
    for(const f of files){
      const path=`${store_id}/${req.id}/${Date.now()}_${f.name}`;
      const {error:eu}=await sb.storage.from(STORAGE_BUCKET).upload(path,f);
      if(!eu) await sb.from('attachments').insert({request_id:req.id,store_id,storage_path:path,file_name:f.name,mime_type:f.type,size_bytes:f.size,uploaded_by:State.profile.id});
    }
    toast('הקריאה נפתחה: '+req.request_no,'ok');
    location.hash='#/requests/id/'+req.id;
  }catch(err){ console.error(err); toast('שגיאה בפתיחת הקריאה: '+(err.message||''),'err'); btn.disabled=false;btn.textContent='שליחת הקריאה'; }
}

/* ============================================================
   פרטי קריאה
   ============================================================ */
async function viewRequestDetail(id){
  const c=$('#content');
  const {data:r,error}=await sb.from('service_requests')
    .select('*, customers(*), tools(*), stores(name), repair_details(*)')
    .eq('id',id).single();
  if(error||!r){c.innerHTML=errBox(error||{message:'קריאה לא נמצאה'});return;}
  const [hist,comments,atts]=await Promise.all([
    sb.from('status_history').select('*, profiles(full_name)').eq('request_id',id).order('created_at',{ascending:true}),
    sb.from('comments').select('*, profiles(full_name)').eq('request_id',id).order('created_at',{ascending:true}),
    sb.from('attachments').select('*').eq('request_id',id).order('created_at',{ascending:true}),
  ]);
  const rd=r.repair_details?.[0];
  c.innerHTML=pageHead('קריאה '+r.request_no, (r.stores?.name||''),
    `<a href="#/requests" class="btn ghost">${icon('back',16)} חזרה לרשימה</a>`);

  const top=el(`<div class="row wrap" style="gap:16px;margin-bottom:18px;align-items:flex-start">
    <div class="grow" style="min-width:280px">
      <div class="card pad">
        <div class="row spread"><div class="row" style="gap:10px">${pill(r.stage)}${r.result?`<span class="chip">תוצאה: ${esc(RESULT_LABEL[r.result])}</span>`:''}${overdue(r)?'<span class="pill warn"><span class="dot"></span>חריגת SLA</span>':''}</div>
        <span class="chip">${URGENCY[r.urgency]==='דחופה'?'⚡ דחופה':'רגילה'}</span></div>
        <div class="section-title">פרטי הלקוח</div>
        <dl class="kv">
          <dt>שם</dt><dd>${esc(r.customers.full_name)}</dd>
          <dt>טלפון</dt><dd class="mono">${esc(r.customers.phone)}${r.customers.phone_alt?' / '+esc(r.customers.phone_alt):''}</dd>
          <dt>כתובת</dt><dd>${esc([r.customers.city,r.customers.street,r.customers.house_no,r.customers.apartment].filter(Boolean).join(' '))||'—'}</dd>
        </dl>
        <div class="section-title">פרטי הכלי</div>
        <dl class="kv">
          <dt>סוג</dt><dd>${esc(r.tools.category)}</dd>
          <dt>מותג / דגם</dt><dd>${esc(r.tools.brand)} ${esc(r.tools.model)}</dd>
          <dt>מספר סידורי</dt><dd class="mono">${esc(r.tools.serial_no||'—')}</dd>
          <dt>מק״ט</dt><dd class="mono">${esc(r.tools.sku||'—')}</dd>
          <dt>אחריות</dt><dd>${esc(WARRANTY[r.tools.warranty])}</dd>
          <dt>אביזרים</dt><dd>${esc(r.tools.accessories||'—')}</dd>
          <dt>מצב חיצוני</dt><dd>${esc(r.tools.external_condition||'—')}</dd>
        </dl>
        <div class="section-title">התקלה</div>
        <p>${esc(r.fault_description)}</p>
        ${r.employee_notes?`<div class="small muted">הערת עובד: ${esc(r.employee_notes)}</div>`:''}
        <div class="section-title">נפתחה ע״י</div>
        <div>${esc(r.opened_by_name)} · ${fmtDate(r.created_at)}</div>
      </div>
    </div>
    <div style="width:340px;max-width:100%;display:flex;flex-direction:column;gap:16px" id="side-col"></div>
  </div>`);
  c.appendChild(top);
  const side=$('#side-col',top);

  // פאנל פעולה חכם — צעד הבא לפי תפקיד
  side.appendChild(actionPanel(r,rd));

  // פרטי טיפול (אם קיימים) — גלוי לשניהם חוץ מהפנימי
  if(rd && (rd.diagnosis||rd.actions_taken||rd.quote_amount||rd.warranty_decision)){
    side.appendChild(el(`<div class="card pad"><div class="section-title" style="margin-top:0">פרטי טיפול</div>
      <dl class="kv">
        ${rd.diagnosis?`<dt>אבחון</dt><dd>${esc(rd.diagnosis)}</dd>`:''}
        ${rd.actions_taken?`<dt>פעולות</dt><dd>${esc(rd.actions_taken)}</dd>`:''}
        ${rd.parts_replaced?`<dt>חלקים</dt><dd>${esc(rd.parts_replaced)}</dd>`:''}
        ${rd.quote_amount!=null?`<dt>הצעת מחיר</dt><dd class="mono">${rd.quote_amount} ₪</dd>`:''}
        ${rd.payer?`<dt>גורם מחייב</dt><dd>${esc(PAYER[rd.payer])}</dd>`:''}
        ${rd.warranty_decision?`<dt>החלטת אחריות</dt><dd>${esc(rd.warranty_decision)}</dd>`:''}
      </dl></div>`));
  }

  // קבצים
  side.appendChild(attachmentsPanel(r,atts.data||[]));

  // הערות + ציר זמן (רוחב מלא מתחת)
  const bottom=el('<div class="row wrap" style="gap:16px;align-items:flex-start"></div>');
  bottom.appendChild(commentsPanel(r,comments.data||[]));
  bottom.appendChild(timelinePanel(hist.data||[]));
  c.appendChild(bottom);
}

/* מעבר סטטוס משותף — משמש כפתורי פעולה מהירה ופאנל מפורט */
async function changeStage(r,toStage,note,result,onDone){
  const patch={stage:toStage}; if(result)patch.result=result;
  const {error}=await sb.from('service_requests').update(patch).eq('id',r.id);
  if(error){toast('שגיאה: '+error.message,'err');return false;}
  await sb.from('status_history').insert({request_id:r.id,store_id:r.store_id,from_stage:r.stage,to_stage:toStage,note:note||null,changed_by:State.profile.id});
  await sb.from('audit_log').insert({actor_id:State.profile.id,store_id:r.store_id,entity:'service_request',entity_id:r.id,action:'status_change',details:{from:r.stage,to:toStage}});
  toast('הסטטוס עודכן','ok'); if(onDone)onDone(); return true;
}

function actionPanel(r,rd){
  const admin=isAdmin();
  const flow=FLOW[r.stage];
  const p=el(`<div class="card pad"><div class="section-title" style="margin-top:0">${admin?'ניהול הקריאה':'הפעולה הבאה'}</div></div>`);

  // כפתור צעד הבא (אם קיים ומתאים לתפקיד)
  if(r.stage==='delivered_closed'){
    p.appendChild(el(`<div class="row" style="gap:8px">${pill(r.stage)}</div><p class="small muted" style="margin-top:10px">הקריאה נסגרה. הכלי נמסר ללקוח.</p>`));
  } else if(flow){
    const iCanDoIt = admin || flow.by==='store';
    if(iCanDoIt){
      const btn=el(`<button class="btn primary block" style="margin-bottom:10px">${icon('check',16)} ${esc(flow.label)}</button>`);
      btn.onclick=async()=>{
        if(flow.special==='deliver'){ deliveryFlow(r); return; }
        if(flow.next==='handled'){ // סיום טיפול — דרושה תוצאה
          promptResult(r); return;
        }
        btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
        await changeStage(r,flow.next,null,null,()=>viewRequestDetail(r.id));
      };
      p.appendChild(btn);
    } else {
      // מחכה לצד השני
      const who = flow.by==='supplier' ? 'הספק' : 'החנות';
      p.appendChild(el(`<div class="row" style="gap:8px;margin-bottom:8px">${pill(r.stage)}</div>
        <p class="small muted">ממתין לפעולת ${who}.</p>`));
    }
  }

  // אדמין: כלים מתקדמים
  if(admin){
    p.appendChild(el('<div style="height:6px"></div>'));
    const adv=el(`<details style="margin-top:4px"><summary class="small muted" style="cursor:pointer">שינוי סטטוס ידני / כלים מתקדמים</summary>
      <div style="margin-top:12px">
        <div class="field"><label>העברה לסטטוס אחר</label>
          <select class="select" id="new-stage">${STAGES.filter(s=>s[0]!=='draft').map(s=>`<option value="${s[0]}" ${r.stage===s[0]?'selected':''}>${esc(s[1])}</option>`).join('')}</select></div>
        <div class="field hidden" id="result-wrap"><label>תוצאת הטיפול</label>
          <select class="select" id="new-result"><option value="">בחר...</option>${RESULTS.map(x=>`<option value="${x[0]}" ${r.result===x[0]?'selected':''}>${esc(x[1])}</option>`).join('')}</select></div>
        <div class="field"><label>הערה (נשמרת בהיסטוריה)</label><input class="input" id="stage-note" placeholder="לא חובה"></div>
        <button class="btn block" id="save-stage">עדכון סטטוס</button>
      </div></details>`);
    p.appendChild(adv);
    const toggleResult=()=>adv.querySelector('#result-wrap').classList.toggle('hidden',adv.querySelector('#new-stage').value!=='handled');
    adv.querySelector('#new-stage').onchange=toggleResult; toggleResult();
    adv.querySelector('#save-stage').onclick=async()=>{
      const stage=adv.querySelector('#new-stage').value, result=adv.querySelector('#new-result').value||null, note=adv.querySelector('#stage-note').value.trim();
      if(stage==='handled'&&!result){toast('בחר תוצאת טיפול','err');return;}
      const b=adv.querySelector('#save-stage');b.disabled=true;b.innerHTML='<span class="spinner"></span>';
      await changeStage(r,stage,note,stage==='handled'?result:null,()=>viewRequestDetail(r.id));
    };
    p.appendChild(el('<div style="height:10px"></div>'));
    const rbtn=el(`<button class="btn block" id="edit-repair">${icon('wrench',15)} עריכת פרטי בדיקה ותיקון</button>`);
    rbtn.onclick=()=>editRepairModal(r,rd);
    p.appendChild(rbtn);
  }
  return p;
}

/* סיום טיפול ע"י הספק — בחירת תוצאה לפני מעבר ל"מוכן לחזרה לחנות" */
function promptResult(r){
  const body=el(`<div><p class="small muted">בחר את תוצאת הטיפול. הקריאה תעבור לסטטוס "מוכן לחזרה לחנות".</p>
    <div class="field"><label>תוצאה <span class="req">*</span></label>
      <select class="select" id="res"><option value="">בחר...</option>${RESULTS.map(x=>`<option value="${x[0]}">${esc(x[1])}</option>`).join('')}</select></div>
    <div class="field"><label>הערה לחנות</label><input class="input" id="rnote" placeholder="לא חובה"></div></div>`);
  const foot=el('<div class="row"><button class="btn primary" id="ok">סיום טיפול</button><button class="btn ghost" id="cancel">ביטול</button></div>');
  const m=openModal('סיום טיפול',body,foot);
  foot.querySelector('#cancel').onclick=m.close;
  foot.querySelector('#ok').onclick=async()=>{
    const res=body.querySelector('#res').value; if(!res){toast('בחר תוצאה','err');return;}
    const ok=await changeStage(r,'handled',body.querySelector('#rnote').value.trim(),res,()=>{m.close();viewRequestDetail(r.id);});
    if(!ok)return;
  };
}

function editRepairModal(r,rd){
  const body=el('<div></div>');
  body.appendChild(fieldset([
    {name:'received_at',label:'תאריך קבלת הכלי',type:'date',value:rd?.received_at},
    {name:'finished_at',label:'תאריך סיום',type:'date',value:rd?.finished_at},
    {name:'inspection_result',label:'תוצאות בדיקה',type:'textarea',value:rd?.inspection_result,full:true},
    {name:'diagnosis',label:'אבחון התקלה',type:'textarea',value:rd?.diagnosis,full:true},
    {name:'actions_taken',label:'פעולות שבוצעו',type:'textarea',value:rd?.actions_taken,full:true},
    {name:'parts_replaced',label:'חלקים שהוחלפו',value:rd?.parts_replaced,full:true},
    {name:'repair_cost',label:'עלות תיקון (₪)',type:'number',value:rd?.repair_cost},
    {name:'quote_amount',label:'הצעת מחיר (₪)',type:'number',value:rd?.quote_amount},
    {name:'payer',label:'גורם מחייב',type:'select',value:rd?.payer||'',options:[['','—'],...Object.entries(PAYER)]},
    {name:'warranty_decision',label:'החלטת אחריות',value:rd?.warranty_decision},
    {name:'rejection_reason',label:'סיבת דחייה',value:rd?.rejection_reason,full:true},
    {name:'replacement_tool_no',label:'מספר כלי חלופי (בהחלפה)',value:rd?.replacement_tool_no},
  ]));
  const foot=el('<div class="row"><button class="btn primary" id="rp-save">שמירה</button><button class="btn ghost" id="rp-cancel">ביטול</button></div>');
  const m=openModal('פרטי בדיקה ותיקון',body,foot,true);
  foot.querySelector('#rp-cancel').onclick=m.close;
  foot.querySelector('#rp-save').onclick=async()=>{
    const f=readForm(body);
    const payload={request_id:r.id,store_id:r.store_id,
      received_at:f.received_at||null,finished_at:f.finished_at||null,inspection_result:f.inspection_result||null,
      diagnosis:f.diagnosis||null,actions_taken:f.actions_taken||null,parts_replaced:f.parts_replaced||null,
      repair_cost:f.repair_cost||null,quote_amount:f.quote_amount||null,payer:f.payer||null,
      warranty_decision:f.warranty_decision||null,rejection_reason:f.rejection_reason||null,replacement_tool_no:f.replacement_tool_no||null};
    const {error}=await sb.from('repair_details').upsert(payload,{onConflict:'request_id'});
    if(error){toast('שגיאה: '+error.message,'err');return;}
    await sb.from('audit_log').insert({actor_id:State.profile.id,store_id:r.store_id,entity:'repair_details',entity_id:r.id,action:'update'});
    toast('פרטי הטיפול נשמרו','ok');m.close();viewRequestDetail(r.id);
  };
}

function commentsPanel(r,comments){
  const admin=isAdmin();
  const visible=comments.filter(c=>admin||!c.is_internal);
  const list=visible.map(c=>`<div style="padding:10px 0;border-bottom:1px solid var(--line)">
    <div class="row spread"><b>${esc(c.profiles?.full_name||'משתמש')}</b>
    <span class="small muted">${fmtDate(c.created_at)}</span></div>
    <div>${esc(c.body)} ${c.is_internal?'<span class="chip" style="background:var(--danger-soft);border-color:#f0c0c0;color:#a13030">פנימי</span>':''}</div></div>`).join('')
    || '<div class="empty" style="padding:24px">אין הערות עדיין</div>';
  const p=el(`<div class="card grow" style="min-width:300px"><div class="card-h">הערות ותקשורת</div>
    <div class="pad"><div id="c-list">${list}</div>
      <div style="margin-top:14px">
        <textarea class="textarea" id="c-body" placeholder="כתיבת הערה..."></textarea>
        ${admin?'<label class="row small" style="margin:8px 0"><input type="checkbox" id="c-internal"> הערה פנימית (לספק בלבד)</label>':''}
        <button class="btn primary sm" id="c-send" style="margin-top:6px">שליחת הערה</button>
      </div></div></div>`);
  p.querySelector('#c-send').onclick=async()=>{
    const body=p.querySelector('#c-body').value.trim(); if(!body)return;
    const is_internal=admin&&p.querySelector('#c-internal')?.checked||false;
    const {error}=await sb.from('comments').insert({request_id:r.id,store_id:r.store_id,author_id:State.profile.id,body,is_internal});
    if(error){toast('שגיאה: '+error.message,'err');return;}
    toast('ההערה נשלחה','ok');viewRequestDetail(r.id);
  };
  return p;
}

function timelinePanel(hist){
  const items=hist.map(h=>`<div class="tl-item"><div>${h.from_stage?esc(STAGE_LABEL[h.from_stage])+' ← ':''}<b>${esc(STAGE_LABEL[h.to_stage]||h.to_stage)}</b></div>
    <div class="t">${fmtDate(h.created_at)} · ${esc(h.profiles?.full_name||'מערכת')}</div>
    ${h.note?`<div class="small">${esc(h.note)}</div>`:''}</div>`).join('')||'<div class="empty" style="padding:24px">אין היסטוריה</div>';
  return el(`<div class="card" style="width:340px;max-width:100%"><div class="card-h">ציר זמן</div><div class="pad"><div class="timeline">${items}</div></div></div>`);
}

function attachmentsPanel(r,atts){
  const canUpload = isAdmin() || r.store_id===State.profile.store_id;
  const p=el(`<div class="card pad"><div class="section-title" style="margin-top:0">קבצים מצורפים (${atts.length})</div>
    <div id="att-list" class="row wrap" style="gap:8px"></div>
    ${canUpload?`<div style="margin-top:12px"><input type="file" id="att-in" multiple accept="image/*,video/*,application/pdf" style="display:none">
      <button class="btn sm" id="att-btn">${icon('plus',14)} הוספת קובץ</button></div>`:''}</div>`);
  const listEl=p.querySelector('#att-list');
  atts.forEach(async a=>{
    const {data}=await sb.storage.from(STORAGE_BUCKET).createSignedUrl(a.storage_path,3600);
    const chip=el(`<a class="chip" target="_blank" href="${data?.signedUrl||'#'}">${icon('file',14)} ${esc(a.file_name||'קובץ')}</a>`);
    listEl.appendChild(chip);
  });
  if(!atts.length)listEl.innerHTML='<span class="small muted">אין קבצים</span>';
  if(canUpload){
    p.querySelector('#att-btn').onclick=()=>p.querySelector('#att-in').click();
    p.querySelector('#att-in').onchange=async e=>{
      for(const f of e.target.files){
        if(f.size>20*1024*1024){toast(`${f.name} גדול מ-20MB`,'err');continue;}
        const path=`${r.store_id}/${r.id}/${Date.now()}_${f.name}`;
        const {error}=await sb.storage.from(STORAGE_BUCKET).upload(path,f);
        if(error){toast('שגיאה בהעלאה','err');continue;}
        await sb.from('attachments').insert({request_id:r.id,store_id:r.store_id,storage_path:path,file_name:f.name,mime_type:f.type,size_bytes:f.size,uploaded_by:State.profile.id});
      }
      toast('הקבצים הועלו','ok');viewRequestDetail(r.id);
    };
  }
  return p;
}

/* ============================================================
   מסירה + חתימה
   ============================================================ */
function deliveryFlow(r){
  const rd=r.repair_details?.[0];
  const body=el(`<div>
    <dl class="kv">
      <dt>קריאה</dt><dd class="mono">${esc(r.request_no)}</dd>
      <dt>לקוח</dt><dd>${esc(r.customers.full_name)} · ${esc(r.customers.phone)}</dd>
      <dt>כלי</dt><dd>${esc(r.tools.brand)} ${esc(r.tools.model)}</dd>
      <dt>תוצאה</dt><dd>${esc(RESULT_LABEL[r.result]||'—')}</dd>
    </dl>
    <div class="section-title">פרטי המסירה</div>
    <div class="grid2">
      <div class="field"><label>שם האוסף <span class="req">*</span></label><input class="input" name="collector_name"></div>
      <div class="field"><label>מספר ת״ז (רשות)</label><input class="input" name="collector_id_no"></div>
      <div class="field"><label>שם העובד המוסר <span class="req">*</span></label><input class="input" name="delivered_by_name" value="${esc(State.profile.full_name)}"></div>
      <div class="field"><label>אביזרים מוחזרים</label><input class="input" name="returned_accessories" value="${esc(r.tools.accessories||'')}"></div>
      <div class="field" style="grid-column:1/-1"><label>הערות למסירה</label><input class="input" name="notes"></div>
    </div>
    <div class="card pad" style="background:var(--surface-2);margin:6px 0 14px">
      <p class="small" style="margin:0 0 10px">אני מאשר/ת שקיבלתי את הכלי והאביזרים המפורטים לעיל, לאחר שהוסבר לי סטטוס הטיפול שבוצע בכלי. בדקתי את פרטי המסירה ואין לי טענה לגבי עצם קבלת הכלי והאביזרים המפורטים במסמך זה.</p>
      <label class="row small"><input type="checkbox" id="d-confirm"> קראתי ואני מאשר/ת את פרטי המסירה</label>
    </div>
    <div class="field"><label>חתימת הלקוח <span class="req">*</span></label>
      <canvas class="sig-pad" id="sig"></canvas>
      <button class="btn sm" id="sig-clear" style="margin-top:8px;width:fit-content">ניקוי חתימה</button></div>
  </div>`);
  const foot=el('<div class="row"><button class="btn primary" id="d-save">אישור מסירה והפקת אישור</button><button class="btn ghost" id="d-cancel">ביטול</button></div>');
  const m=openModal('מסירת כלי ללקוח',body,foot,true);
  foot.querySelector('#d-cancel').onclick=m.close;
  const sig=setupSignature(body.querySelector('#sig'));
  body.querySelector('#sig-clear').onclick=sig.clear;
  foot.querySelector('#d-save').onclick=async()=>{
    const f=readForm(body);
    if(!f.collector_name||!f.delivered_by_name){toast('נא למלא שם אוסף ושם עובד מוסר','err');return;}
    if(!body.querySelector('#d-confirm').checked){toast('יש לאשר את תיבת הסימון','err');return;}
    if(sig.isEmpty()){toast('נדרשת חתימת הלקוח','err');return;}
    const btn=foot.querySelector('#d-save');btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
    const signedText='אני מאשר/ת שקיבלתי את הכלי והאביזרים המפורטים לעיל, לאחר שהוסבר לי סטטוס הטיפול שבוצע בכלי. בדקתי את פרטי המסירה ואין לי טענה לגבי עצם קבלת הכלי והאביזרים המפורטים במסמך זה.';
    try{
      const blob=await sig.toBlob();
      const sigPath=`${r.store_id}/${r.id}/signature_${Date.now()}.png`;
      await sb.storage.from(STORAGE_BUCKET).upload(sigPath,blob);
      let ip=null; try{ip=(await (await fetch('https://api.ipify.org?format=json')).json()).ip;}catch(e){}
      await sb.from('deliveries').insert({request_id:r.id,store_id:r.store_id,
        collector_name:f.collector_name,collector_id_no:f.collector_id_no||null,delivered_by:State.profile.id,
        delivered_by_name:f.delivered_by_name,returned_accessories:f.returned_accessories||null,notes:f.notes||null});
      await sb.from('signatures').insert({request_id:r.id,store_id:r.store_id,storage_path:sigPath,signed_text:signedText,ip_address:ip});
      await sb.from('service_requests').update({stage:'delivered_closed'}).eq('id',r.id);
      await sb.from('status_history').insert({request_id:r.id,store_id:r.store_id,from_stage:r.stage,to_stage:'delivered_closed',note:'נמסר ללקוח: '+f.collector_name,changed_by:State.profile.id});
      await sb.from('audit_log').insert({actor_id:State.profile.id,store_id:r.store_id,entity:'delivery',entity_id:r.id,action:'delivery',details:{collector:f.collector_name}});
      m.close();
      printDeliveryReceipt(r,f,signedText,sig.dataURL());
      toast('המסירה נשמרה','ok');viewRequestDetail(r.id);
    }catch(err){console.error(err);toast('שגיאה במסירה: '+(err.message||''),'err');btn.disabled=false;btn.textContent='אישור מסירה';}
  };
}

function setupSignature(canvas){
  const ctx=canvas.getContext('2d');
  const resize=()=>{const r=canvas.getBoundingClientRect();canvas.width=r.width*devicePixelRatio;canvas.height=r.height*devicePixelRatio;
    ctx.scale(devicePixelRatio,devicePixelRatio);ctx.lineWidth=2.2;ctx.lineCap='round';ctx.strokeStyle='#161a1f';};
  setTimeout(resize,50);
  let drawing=false,empty=true,last=null;
  const pos=e=>{const r=canvas.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return{x:t.clientX-r.left,y:t.clientY-r.top};};
  const start=e=>{e.preventDefault();drawing=true;last=pos(e);};
  const move=e=>{if(!drawing)return;e.preventDefault();const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;empty=false;};
  const end=()=>drawing=false;
  canvas.addEventListener('mousedown',start);canvas.addEventListener('mousemove',move);window.addEventListener('mouseup',end);
  canvas.addEventListener('touchstart',start,{passive:false});canvas.addEventListener('touchmove',move,{passive:false});canvas.addEventListener('touchend',end);
  return {clear:()=>{ctx.clearRect(0,0,canvas.width,canvas.height);empty=true;},isEmpty:()=>empty,
    toBlob:()=>new Promise(res=>canvas.toBlob(res,'image/png')),dataURL:()=>canvas.toDataURL('image/png')};
}

function printDeliveryReceipt(r,f,signedText,sigDataUrl){
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="utf-8"><title>אישור מסירה ${r.request_no}</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#161a1f;line-height:1.6}
  h1{font-size:22px}h2{font-size:15px;color:#666;margin-top:24px;border-bottom:1px solid #ddd;padding-bottom:6px}
  .kv{display:grid;grid-template-columns:150px 1fr;gap:6px}.kv dt{color:#666}
  .note{background:#f6f7f8;padding:14px;border-radius:8px;margin:16px 0}
  img{border:1px solid #ddd;border-radius:8px;max-width:320px;margin-top:8px}
  .foot{margin-top:30px;font-size:12px;color:#999}</style></head><body>
  <h1>אישור מסירת כלי — ${r.request_no}</h1>
  <div class="kv"><dt>תאריך מסירה</dt><dd>${fmtDate(new Date())}</dd>
  <dt>חנות</dt><dd>${esc(r.stores?.name||'')}</dd>
  <dt>לקוח</dt><dd>${esc(r.customers.full_name)} · ${esc(r.customers.phone)}</dd>
  <dt>כלי</dt><dd>${esc(r.tools.brand)} ${esc(r.tools.model)} (${esc(r.tools.category)})</dd>
  <dt>מספר סידורי</dt><dd>${esc(r.tools.serial_no||'—')}</dd>
  <dt>תוצאת טיפול</dt><dd>${esc(RESULT_LABEL[r.result]||'—')}</dd>
  <dt>אביזרים מוחזרים</dt><dd>${esc(f.returned_accessories||'—')}</dd></div>
  <h2>פרטי המקבל</h2>
  <div class="kv"><dt>שם האוסף</dt><dd>${esc(f.collector_name)}</dd>
  ${f.collector_id_no?`<dt>ת״ז</dt><dd>${esc(f.collector_id_no)}</dd>`:''}
  <dt>עובד מוסר</dt><dd>${esc(f.delivered_by_name)}</dd></div>
  <div class="note">${esc(signedText)}</div>
  <h2>חתימת הלקוח</h2><img src="${sigDataUrl}">
  <div class="foot">מסמך זה הופק אוטומטית ממערכת פורטל השירות והתיקונים.</div>
  <script>setTimeout(()=>window.print(),400)<\/script></body></html>`);
  w.document.close();
}

/* ============================================================
   ניהול חנויות וסניפים (אדמין)
   ============================================================ */
async function storesView(){
  const c=$('#content');
  c.innerHTML=pageHead('חנויות','ניהול החנויות והפרטים שלהן',
    `<button class="btn primary" id="add-store">${icon('plus',16)} הוספת חנות</button>`);
  const {data:stores}=await sb.from('stores').select('*').eq('is_archived',false).order('name');
  const holder=el('<div style="display:flex;flex-direction:column;gap:14px"></div>');
  c.appendChild(holder);
  if(!stores?.length)holder.appendChild(el('<div class="empty">אין חנויות. הוסף חנות ראשונה.</div>'));
  (stores||[]).forEach(s=>{
    const card=el(`<div class="card pad">
      <div class="row spread wrap">
        <div><b style="font-size:16px">${esc(s.name)}</b> ${s.is_active?'':'<span class="chip">מושבת</span>'}
          <div class="small muted">${esc([s.tax_id&&'ח.פ '+s.tax_id,s.contact_name,s.phone].filter(Boolean).join(' · '))||''}</div></div>
        <div class="row"><button class="btn sm" data-edit>עריכה</button></div>
      </div></div>`);
    card.querySelector('[data-edit]').onclick=()=>storeModal(s);
    holder.appendChild(card);
  });
  $('#add-store').onclick=()=>storeModal(null);
}
function storeModal(s){
  const body=fieldset([
    {name:'name',label:'שם החנות',req:true,value:s?.name},
    {name:'tax_id',label:'ח.פ / עוסק',value:s?.tax_id},
    {name:'contact_name',label:'איש קשר',value:s?.contact_name},
    {name:'phone',label:'טלפון',type:'tel',value:s?.phone},
    {name:'email',label:'אימייל',type:'email',value:s?.email},
    {name:'address',label:'כתובת',value:s?.address,full:true},
    {name:'internal_notes',label:'הערות פנימיות',type:'textarea',value:s?.internal_notes,full:true},
  ]);
  const foot=el(`<div class="row grow spread"><div class="row"><button class="btn primary" id="s-save">שמירה</button><button class="btn ghost" id="s-cancel">ביטול</button></div>
    ${s?`<button class="btn sm" id="s-toggle">${s.is_active?'השבתה':'הפעלה'}</button>`:''}</div>`);
  const m=openModal(s?'עריכת חנות':'הוספת חנות',body,foot);
  foot.querySelector('#s-cancel').onclick=m.close;
  foot.querySelector('#s-save').onclick=async()=>{
    if(!validate(body,['name']))return;
    const f=readForm(body);
    const {error}= s ? await sb.from('stores').update(f).eq('id',s.id) : await sb.from('stores').insert(f);
    if(error){toast('שגיאה: '+error.message,'err');return;}
    toast('נשמר','ok');m.close();storesView();
  };
  if(s)foot.querySelector('#s-toggle').onclick=async()=>{await sb.from('stores').update({is_active:!s.is_active}).eq('id',s.id);toast('עודכן','ok');m.close();storesView();};
}

/* ============================================================
   ניהול משתמשים (אדמין) — דרך Edge Function
   ============================================================ */
async function usersView(){
  const c=$('#content');
  c.innerHTML=pageHead('משתמשים','ניהול מנהלי הסניפים. רק אתה יכול ליצור, לאפס סיסמה או להשבית.',
    `<button class="btn primary" id="add-user">${icon('plus',16)} משתמש חדש</button>`);
  const [{data:profiles},{data:stores}]=await Promise.all([
    sb.from('profiles').select('*, stores(name)').order('created_at'),
    sb.from('stores').select('id,name').eq('is_archived',false).order('name'),
  ]);
  const holder=el('<div class="tbl-wrap"><table class="tbl"><thead><tr><th>שם</th><th>תפקיד</th><th>חנות</th><th>סטטוס</th><th>כניסה אחרונה</th><th></th></tr></thead><tbody></tbody></table></div>');
  const tb=holder.querySelector('tbody');
  (profiles||[]).forEach(p=>{
    const row=el(`<tr>
      <td><b>${esc(p.full_name)}</b></td>
      <td>${p.role==='super_admin'?'מנהל מערכת':'מנהל חנות'}</td>
      <td>${esc(p.stores?.name||'—')}</td>
      <td>${p.is_active?'<span class="pill s-ready_for_pickup"><span class="dot"></span>פעיל</span>':'<span class="pill warn"><span class="dot"></span>מושבת</span>'}</td>
      <td class="small">${p.last_login_at?fmtDate(p.last_login_at):'—'}</td>
      <td>${p.role==='super_admin'?'':'<button class="btn sm" data-pass>איפוס סיסמה</button> <button class="btn sm" data-toggle>'+(p.is_active?'השבתה':'הפעלה')+'</button>'}</td>
    </tr>`);
    if(p.role!=='super_admin'){
      row.querySelector('[data-pass]').onclick=()=>resetPassModal(p);
      row.querySelector('[data-toggle]').onclick=()=>toggleUser(p);
    }
    tb.appendChild(row);
  });
  c.appendChild(holder);
  $('#add-user').onclick=()=>userModal(stores||[]);
}
function userModal(stores){
  const body=el('<div></div>');
  body.appendChild(fieldset([
    {name:'full_name',label:'שם מלא',req:true},
    {name:'username',label:'שם משתמש (לועזי, ללא רווחים)',req:true,ph:'למשל: haifa1'},
    {name:'password',label:'סיסמה ראשונית',req:true,type:'text'},
    {name:'store_id',label:'חנות',type:'select',req:true,options:[['','בחר...'],...stores.map(s=>[s.id,s.name])],full:true},
  ]));
  const foot=el('<div class="row"><button class="btn primary" id="u-save">יצירת משתמש</button><button class="btn ghost" id="u-cancel">ביטול</button></div>');
  const m=openModal('משתמש חדש',body,foot);
  foot.querySelector('#u-cancel').onclick=m.close;
  foot.querySelector('#u-save').onclick=async()=>{
    if(!validate(body,['full_name','username','password','store_id']))return;
    const f=readForm(body);const btn=foot.querySelector('#u-save');btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
    const res=await callAdmin('create_user',{full_name:f.full_name,username:f.username.toLowerCase(),password:f.password,store_id:f.store_id,branch_id:null});
    if(res.error){toast('שגיאה: '+res.error,'err');btn.disabled=false;btn.textContent='יצירת משתמש';return;}
    toast('המשתמש נוצר','ok');m.close();usersView();
  };
}
function resetPassModal(p){
  const body=fieldset([{name:'password',label:'סיסמה חדשה',req:true,type:'text',full:true}]);
  const foot=el('<div class="row"><button class="btn primary" id="p-save">עדכון סיסמה</button><button class="btn ghost" id="p-cancel">ביטול</button></div>');
  const m=openModal('איפוס סיסמה · '+p.full_name,body,foot);
  foot.querySelector('#p-cancel').onclick=m.close;
  foot.querySelector('#p-save').onclick=async()=>{
    if(!validate(body,['password']))return;const f=readForm(body);
    const res=await callAdmin('reset_password',{user_id:p.id,password:f.password});
    if(res.error){toast('שגיאה: '+res.error,'err');return;}
    toast('הסיסמה עודכנה','ok');m.close();
  };
}
async function toggleUser(p){
  const res=await callAdmin('set_active',{user_id:p.id,is_active:!p.is_active});
  if(res.error){toast('שגיאה: '+res.error,'err');return;}
  toast('עודכן','ok');usersView();
}
async function callAdmin(action,payload){
  try{
    const {data:{session}}=await sb.auth.getSession();
    const r=await fetch(ADMIN_FN_URL,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token},
      body:JSON.stringify({action,...payload})});
    const j=await r.json();
    if(!r.ok)return {error:j.error||'שגיאת שרת'};
    return j;
  }catch(e){return {error:'לא ניתן להגיע ל-Edge Function. ודא שהיא פרוסה.'};}
}

/* ============================================================
   דוחות
   ============================================================ */
async function reportsView(){
  const c=$('#content');
  c.innerHTML=pageHead('דוחות וייצוא','ייצוא נתונים וסיכומים');
  const rows=await loadRequests({});
  const byStore={}; rows.forEach(r=>{const k=r.stores?.name||'—';byStore[k]=(byStore[k]||0)+1;});
  const closed=rows.filter(r=>r.stage==='delivered_closed');
  const avg=closed.length?Math.round(closed.reduce((a,r)=>a+daysBetween(r.created_at,r.updated_at),0)/closed.length):0;
  c.appendChild(el(`<div class="stats">
    <div class="stat"><div class="n tnum">${rows.length}</div><div class="l">סה״כ קריאות</div></div>
    <div class="stat"><div class="n tnum">${avg}</div><div class="l">זמן טיפול ממוצע (ימים)</div></div>
    <div class="stat"><div class="n tnum">${rows.filter(r=>r.result==='repaired').length}</div><div class="l">תוקנו</div></div>
    <div class="stat"><div class="n tnum">${rows.filter(r=>r.result==='replaced').length}</div><div class="l">הוחלפו</div></div>
    <div class="stat"><div class="n tnum">${rows.filter(r=>r.result==='rejected_out_of_warranty').length}</div><div class="l">נדחו</div></div>
  </div>`));
  c.appendChild(el(`<div class="section-title">חלוקה לפי חנות</div>`));
  const t=el('<div class="tbl-wrap"><table class="tbl"><thead><tr><th>חנות</th><th>מספר קריאות</th></tr></thead><tbody></tbody></table></div>');
  Object.entries(byStore).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>t.querySelector('tbody').appendChild(el(`<tr><td>${esc(k)}</td><td class="tnum">${v}</td></tr>`)));
  c.appendChild(t);
  c.appendChild(el(`<div style="margin-top:18px"></div>`));
  const btn=el(`<button class="btn primary">${icon('download',16)} ייצוא כל הקריאות ל-CSV</button>`);
  btn.onclick=()=>exportCSV(rows); c.appendChild(btn);
}

/* ============================================================
   כלי עזר
   ============================================================ */
function debounce(fn,ms){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);};}
function errBox(e){return `<div class="empty"><b>שגיאה</b><div class="small">${esc(e.message||e)}</div></div>`;}
function icon(name,s=18){const p={
  wrench:'<path d="M14.7 6.3a4 4 0 01-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.3 2.3-2.4-.6-.6-2.4z"/>',
  gauge:'<path d="M12 14l4-4M4 20a8 8 0 1116 0"/>',
  clipboard:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h4"/>',
  store:'<path d="M4 9l1-5h14l1 5M4 9v10h16V9M4 9h16M9 19v-5h6v5"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M4 20a5 5 0 0110 0M16 6a3 3 0 010 6M15 20a5 5 0 013-4.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  download:'<path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14"/>',
  logout:'<path d="M14 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2v-2M10 12h10m0 0l-3-3m3 3l-3 3"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  check:'<path d="M5 12l5 5 9-11"/>',
  back:'<path d="M15 6l-6 6 6 6"/>',
  inbox:'<path d="M4 13l2 6h12l2-6M4 13V5h16v8M4 13h5l1 2h4l1-2h5"/>',
  file:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>',
  pin:'<path d="M12 21s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>',
}[name]||'';
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;}

/* ---------- מעבר חלק בין טבלה לכרטיסים בשינוי גודל מסך ---------- */
let _wasMobile=isMobile();
window.addEventListener('resize',debounce(()=>{
  if(State.profile && isMobile()!==_wasMobile){ _wasMobile=isMobile(); route(); }
},250));

/* ---------- הפעלה ---------- */
boot();
