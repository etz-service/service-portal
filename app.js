const APP_LOGO="data:image/png;base64,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";
/* ============================================================
   פורטל שירות ותיקונים — לוגיקת אפליקציה (Vanilla JS + Supabase)
   ============================================================ */
/* ---------- מנגנון רשת עמיד: כל בקשה ל-Supabase מנסה שוב אוטומטית ----------
   פותר את שגיאות "Load failed" של Safari, שנגרמות כשהדפדפן סוגר חיבור
   ומנסה להשתמש בו שוב. עוטף את כל התקשורת ברמה הנמוכה ביותר. */
async function resilientFetch(input, init){
  const tries=4;
  let lastErr;
  for(let i=0;i<tries;i++){
    try{
      const res=await fetch(input, init);
      return res;
    }catch(e){
      lastErr=e;
      // שגיאת רשת (Load failed / Failed to fetch) — נסה שוב אחרי השהיה קצרה
      if(i<tries-1){ await new Promise(r=>setTimeout(r, 300*(i+1))); continue; }
      throw e;
    }
  }
  throw lastErr;
}

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession:true, autoRefreshToken:true },
  global: { fetch: (...args)=>resilientFetch(...args) }
});

/* ---------- ניסיון חוזר אוטומטי בכשל רשת זמני ----------
   עוטף פעולת רשת. אם נכשלה בגלל בעיית רשת (Load failed / Failed to fetch),
   מנסה שוב עד 3 פעמים עם השהיה גוברת. פותר את רוב ה"נפילות" מול השרת המרוחק. */
function isNetErr(e){
  const m=((e&&(e.message||e.error_description||e.msg))||'').toString().toLowerCase();
  return m.includes('load failed')||m.includes('failed to fetch')||m.includes('networkerror')||m.includes('timeout')||m.includes('fetch');
}
async function withRetry(fn,tries=3){
  let lastErr;
  for(let i=0;i<tries;i++){
    try{
      const res=await fn();
      // Supabase מחזיר {data,error} — שגיאת רשת מופיעה כ-error
      if(res&&res.error&&isNetErr(res.error)&&i<tries-1){ await sleep(400*(i+1)); continue; }
      return res;
    }catch(e){
      lastErr=e;
      if(isNetErr(e)&&i<tries-1){ await sleep(400*(i+1)); continue; }
      throw e;
    }
  }
  throw lastErr;
}
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

/* ---------- מצב גלובלי ---------- */
const State = { user:null, profile:null, view:null, drawerOpen:false };

/* ---------- מטא-דאטה של סטטוסים (מפתח אנגלי -> תצוגה עברית) ----------
   מודל 8 שלבים. מפתחות ה-enum במסד נשמרים, רק התוויות והזרימה הותאמו. */
const STAGES = [
  ['draft','טיוטה'],
  ['awaiting_approval','ממתין לאישור ספק'],
  ['opened','אושר — לשליחה לספק'],
  ['at_supplier','נשלח לספק'],
  ['inspection','התקבל אצל הספק'],
  ['handled','נשלח בחזרה לחנות'],
  ['received_at_store','חזר לחנות — מוכן לאיסוף'],
  ['delivered_closed','נמסר ללקוח ונסגר'],
];
const STAGE_LABEL = Object.fromEntries(STAGES);
/* תוויות גיבוי לסטטוסים ישנים שהוסרו — שלא יופיעו באנגלית בקריאות ישנות */
STAGE_LABEL.in_repair = STAGE_LABEL.in_repair || 'בטיפול';
STAGE_LABEL.in_transit_to_store = STAGE_LABEL.in_transit_to_store || 'בדרך לחנות';
STAGE_LABEL.ready_for_pickup = STAGE_LABEL.ready_for_pickup || 'מוכן לאיסוף';
function stageLabel(s){ return STAGE_LABEL[s] || s || '—'; }
/* סטטוס קצר לתגים במובייל */
const STAGE_SHORT = {
  draft:'טיוטה', awaiting_approval:'ממתין לאישור', opened:'לשליחה', at_supplier:'נשלח לספק',
  inspection:'התקבל אצל הספק', handled:'נשלח בחזרה', 
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
  awaiting_approval: {next:'opened',            by:'supplier', label:'אישור תיקון'},
  opened:            {next:'at_supplier',       by:'store',    label:'סימון: נשלח לספק'},
  at_supplier:       {next:'inspection',        by:'supplier', label:'סימון: התקבל אצל הספק'},
  inspection:        {next:'handled',           by:'supplier', label:'שליחה בחזרה לחנות (עם תוצאה)'},
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
function pill(stage){return `<span class="pill s-${stage}"><span class="dot"></span>${esc(stageLabel(stage))}</span>`;}
function toast(msg,type=''){const t=el(`<div class="toast ${type}">${esc(msg)}</div>`);$('#toasts').appendChild(t);
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),260);},3200);}
const isAdmin = ()=>State.profile?.role==='super_admin';
/* חריגת זמן: קריאה פתוחה שנפתחה לפני 30+ יום ולא נסגרה */
function overdue(r){ return OPEN_STAGES.includes(r.stage) && daysBetween(r.created_at,new Date())>=30; }

/* ---------- מודאל ---------- */
function openModal(title,bodyEl,footerEl,wide){
  const root=$('#modal-root');
  const m=el(`<div class="modal open"><div class="scrim"></div>
    <div class="box ${wide?'wide':''}"><div class="modal-h"><h3>${esc(title)}</h3>
    <button class="x" aria-label="סגירה">&times;</button></div>
    <div class="modal-b"></div><div class="modal-f"></div></div></div>`);
  m.querySelector('.modal-b').appendChild(bodyEl);
  if(footerEl) m.querySelector('.modal-f').appendChild(footerEl); else m.querySelector('.modal-f').remove();
  let closed=false;
  const close=()=>{
    if(closed)return; closed=true;
    m.classList.add('closing');
    document.removeEventListener('keydown',onKey);
    setTimeout(()=>m.remove(),190);
  };
  const onKey=e=>{ if(e.key==='Escape')close(); };
  document.addEventListener('keydown',onKey);
  m.querySelector('.x').onclick=close; m.querySelector('.scrim').onclick=close;
  root.appendChild(m);
  // פוקוס לשדה הראשון — נגישות וזרימה טבעית
  setTimeout(()=>{const f=m.querySelector('input,select,textarea');if(f&&!isMobile())f.focus();},60);
  return {close,el:m};
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
  subscribeRealtime();
  // טעינה מקדימה ברקע — הניווט הבא יהיה מיידי
  loadRequests({}).catch(()=>{});
}

function renderLogin(){
  State.user=null;State.profile=null;
  $('#app').innerHTML='';
  const card=el(`<div class="login-wrap"><div class="login-card">
    <div class="logo"><img src="${APP_LOGO}" alt="עץ האורן"></div>
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

async function logout(){ try{ if(_rtChannel){sb.removeChannel(_rtChannel);_rtChannel=null;} }catch(e){} await sb.auth.signOut(); location.hash=''; renderLogin(); }

/* ============================================================
   מעטפת (sidebar + ניתוב)
   ============================================================ */
function navItems(){
  if(isAdmin()) return [
    ['#/dash','לוח בקרה','gauge'],
    ['#/approve','אישור תיקונים','check'],
    ['#/intake','קליטה מחנות','inbox'],
    ['#/dispatch','שליחה לחנות','truck'],
    ['#/requests','כל הקריאות','clipboard'],
    ['#/new','פתיחת קריאה','plus'],
    ['sep'],
    ['#/stores','חנויות','store'],
    ['#/users','משתמשים','users'],
    ['#/reports','דוחות וייצוא','download'],
    ['sep'],
    ['./madrich-oren.pdf','מדריך למשתמש','help'],
  ];
  return [
    ['#/dash','לוח בקרה','gauge'],
    ['#/new','פתיחת קריאה','plus'],
    ['#/send','שליחה לספק','truck'],
    ['#/receive','קליטה מספק','inbox'],
    ['#/requests','הקריאות שלי','clipboard'],
    ['sep'],
    ['./madrich-oren.pdf','מדריך למשתמש','help'],
  ];
}
/* צפייה במדריך המשתמש בתוך האפליקציה — עם כפתור סגירה ברור */
function openGuideViewer(){
  const url='./madrich-oren.pdf';
  const ov=el(`<div class="guide-ov">
    <div class="guide-bar">
      <b>מדריך למשתמש</b>
      <span style="flex:1"></span>
      <a href="${url}" target="_blank" rel="noopener" class="btn sm">פתיחה בטאב חדש</a>
      <button class="btn sm" id="g-close">✕ סגירה</button>
    </div>
    <iframe src="${url}" class="guide-frame" title="מדריך"></iframe>
  </div>`);
  document.body.appendChild(ov);
  const close=()=>ov.remove();
  ov.querySelector('#g-close').onclick=close;
  const onKey=e=>{if(e.key==='Escape'){close();document.removeEventListener('keydown',onKey);}};
  document.addEventListener('keydown',onKey);
}

function renderShell(){
  const nav = navItems().map(it=>it[0]==='sep'?'<div class="sep"></div>':
    (it[0].startsWith('#')
      ? `<a href="${it[0]}" data-path="${it[0]}">${icon(it[2])}<span>${esc(it[1])}</span></a>`
      : `<a href="${it[0]}" target="_blank" rel="noopener" class="nav-ext">${icon(it[2])}<span>${esc(it[1])}</span></a>`)
    ).join('');
  const who=esc(State.profile.full_name), role=isAdmin()?'מנהל מערכת (ספק)':'מנהל חנות/מחסן';
  const LOGO=`<img src="${APP_LOGO}" alt="עץ האורן">`;
  $('#app').innerHTML='';
  const shell=el(`<div class="shell">
    <aside class="sidebar">
      <div class="brand"><div class="logo">${LOGO}</div>
        <div><b>פורטל שירות ותיקונים</b><br><span>עץ האורן</span></div></div>
      <nav class="nav">${nav}</nav>
      <div class="side-foot"><div class="who">${who}</div><div class="role">${role}</div>
        <button class="btn sm block" id="logout-btn">${icon('logout',15)} התנתקות</button></div>
    </aside>
    <div class="main">
      <div class="topbar">
        <div class="row"><div class="logo">${LOGO}</div><b>שירות ותיקונים · עץ האורן</b></div>
        <button class="burger" id="burger" aria-label="תפריט">${icon('menu',24)}</button>
      </div>
      <div class="content" id="content"></div>
    </div>
    <div class="drawer" id="drawer"><div class="scrim"></div>
      <div class="panel"><div class="brand"><div class="logo">${LOGO}</div>
        <div><b>פורטל שירות ותיקונים</b><br><span>עץ האורן</span></div></div>
        <nav class="nav">${nav}</nav>
        <div class="side-foot"><div class="who">${who}</div><div class="role">${role}</div>
          <button class="btn sm block" id="logout-btn2">${icon('logout',15)} התנתקות</button></div></div>
    </div>
  </div>`);
  $('#app').appendChild(shell);
  $('#logout-btn').onclick=logout; $('#logout-btn2').onclick=logout;
  // מדריך למשתמש — נפתח כחלון פנימי עם כפתור סגירה (לא כטאב שכולא)
  $$('.nav-ext').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openGuideViewer();}));
  const drawer=$('#drawer');
  const closeDrawer=()=>{
    if(!drawer.classList.contains('open'))return;
    drawer.classList.add('closing');
    setTimeout(()=>{drawer.classList.remove('open','closing');},240);
  };
  $('#burger').onclick=()=>drawer.classList.add('open');
  drawer.querySelector('.scrim').onclick=closeDrawer;
  $$('.nav a').forEach(a=>a.addEventListener('click',closeDrawer));
}

function setActiveNav(path){
  $$('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.path===path||(path.startsWith('#/requests')&&a.dataset.path==='#/requests')));
}

/* ---------- מעברי מסך: החלקה מהצד לפי כיוון הניווט ---------- */
const NAV_ORDER=['#/dash','#/approve','#/intake','#/dispatch','#/send','#/receive','#/new','#/requests','#/stores','#/users','#/reports'];
let _prevBase=null;
function navDirection(base){
  // כניסה לפרטי קריאה = "קדימה"; חזרה ממנה = "אחורה"
  if(base.startsWith('#/requests/id/')) return 'fwd';
  if(_prevBase && _prevBase.startsWith('#/requests/id/')) return 'back';
  const a=NAV_ORDER.indexOf(_prevBase), b=NAV_ORDER.indexOf(base);
  if(a<0||b<0) return 'fwd';
  return b>=a ? 'fwd' : 'back';
}
/* מפעיל את אנימציית הכניסה על תוכן העמוד לאחר שהורכב */
function animatePage(dir){
  const c=$('#content'); if(!c)return;
  c.classList.remove('page-anim','back');
  void c.offsetWidth;                       // איפוס האנימציה
  c.classList.add('page-anim');
  if(dir==='back') c.classList.add('back');
}

window.addEventListener('hashchange',route);
let _routeToken=0;
/* נקודת רענון של המסך הנוכחי — כל מסך מגדיר אותה לעצמו (שומר על פילטרים) */
let _liveRefresh=null;

/* ---------- עדכונים בזמן אמת (Realtime) ----------
   מנוי לשינויים בטבלאות. כל שינוי שמשתמש אחד מבצע מופיע מיד אצל כולם. */
let _rtChannel=null, _rtTimer=null;
function subscribeRealtime(){
  try{
    if(_rtChannel){ sb.removeChannel(_rtChannel); _rtChannel=null; }
    _rtChannel = sb.channel('rt-portal')
      .on('postgres_changes',{event:'*',schema:'public',table:'service_requests'}, p=>onRealtime(p))
      .on('postgres_changes',{event:'*',schema:'public',table:'comments'}, p=>onRealtime(p))
      .on('postgres_changes',{event:'*',schema:'public',table:'status_history'}, p=>onRealtime(p))
      .subscribe();
  }catch(e){ console.warn('realtime off',e); }
}
function onRealtime(payload){
  invalidateReqCache();
  clearTimeout(_rtTimer);
  _rtTimer=setTimeout(async ()=>{
    await fetchRequests().catch(()=>{});
    const hash=location.hash||'';
    const m=hash.match(/#\/requests\/id\/(.+)$/);
    if(m){
      // בעמוד פרטי קריאה — רענן רק אם לא מקלידים הערה כרגע
      const box=document.getElementById('c-body');
      if(box && box.value.trim().length>0) return;
      const chId=(payload.new&&(payload.new.id||payload.new.request_id))||(payload.old&&(payload.old.id||payload.old.request_id));
      if(chId===m[1]) viewRequestDetail(m[1]);
    } else if(typeof _liveRefresh==='function'){
      _liveRefresh(); // רשימות/דאשבורד — רענון ששומר על פילטרים
    }
  }, 400);
}
/* רינדור מיידי מהמטמון + רענון שקט ברקע (stale-while-revalidate) */
function dataView(build){
  const token=_routeToken;
  const cache=cachedRequests();
  if(cache) build(cache);                 // הצגה מיידית
  const stale=!cache || (Date.now()-_reqMemoTime>=15000);
  if(stale) fetchRequests().then(fresh=>{ if(token===_routeToken) build(fresh); });
  // רענון חי: כשמגיע עדכון Realtime, מרנדר מחדש עם הנתונים הטריים
  _liveRefresh=()=>{ if(token===_routeToken) build(cachedRequests()||[]); };
}
function route(){
  if(!State.profile)return;
  _routeToken++;
  _liveRefresh=null;
  const hash=location.hash||'#/dash';
  const [path,arg]=hash.split('/id/');
  setActiveNav(path);
  const c=$('#content'); if(!c)return;
  const base=hash.split('?')[0];
  const dir=navDirection(base);
  _prevBase=base;
  // spinner רק אם אין מטמון להציג ממנו
  if(!cachedRequests() || base.startsWith('#/requests/id/') || ['#/stores','#/users'].includes(base)){
    c.innerHTML='<div class="center-load"><span class="spinner"></span></div>';
  }
  animatePage(dir);
  State._dir=dir;
  if(base.startsWith('#/requests/id/')) return viewRequestDetail(hash.replace('#/requests/id/',''));
  switch(base){
    case '#/dash': return isAdmin()?adminDash():storeDash();
    case '#/approve': return isAdmin()?stageListView('אישור תיקונים','קריאות חדשות מהחנויות הממתינות לאישורך',['awaiting_approval'],true,true):deny();
    case '#/intake': return isAdmin()?stageListView('קליטה מחנות','כלים שנשלחו אליך מהחנויות וממתינים לקליטה',['at_supplier'],true,true):deny();
    case '#/dispatch': return isAdmin()?stageListView('שליחה לחנות','כלים שהתקבלו אצלך ומוכנים לשליחה חזרה לחנות',['inspection'],true,true):deny();
    case '#/send': return !isAdmin()?stageListView('שליחה לספק','קריאות שאושרו וממתינות לשליחה לספק',['opened'],true,false,
      'לאחר שהקריאה אושרה, תאמו מולנו (עץ האורן) איסוף. <b>אנחנו שולחים שליח שיאסוף את הכלים מהחנות/המחסן</b> בתיאום מולכם וביוזמתכם. סמנו "נשלח לספק" כשהכלים נמסרו לשליח.'):deny();
    case '#/receive': return !isAdmin()?stageListView('קליטה מספק','כלים שחזרו מהספק — לקליטה ולמסירה ללקוח',['handled','received_at_store'],true,false,
      'הכלים חוזרים אליכם דרך השליח שלנו בתיאום. סמנו "חזר לחנות" עם קבלת הכלי, ואז בצעו מסירה ללקוח.'):deny();
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
  dataView(rows=>{
    const now=new Date(), monthStart=new Date(now.getFullYear(),now.getMonth(),1);
    const count=st=>rows.filter(r=>r.stage===st).length;
    const stats=[
      ['ממתין לאישורי', count('awaiting_approval'), count('awaiting_approval')?'accent':'', '#/approve'],
      ['נשלח אליי (בדרך)', count('at_supplier'),'','#/intake'],
      ['אצל הספק / בבדיקה', count('inspection'),'','#/dispatch'],
      ['נשלח בחזרה לחנות', count('handled'),'',''],
      ['אצל החנות / באיסוף', count('received_at_store'),'',''],
      ['חריגות זמן (חודש)', rows.filter(overdue).length,'warn',''],
      ['נסגרו החודש', rows.filter(r=>r.stage==='delivered_closed'&&new Date(r.created_at)>=monthStart).length,'',''],
    ];
    c.innerHTML=pageHead('לוח בקרה','תמונת מצב של כל הקריאות בכל החנויות');
    const sw=el(`<div class="stats stagger">${stats.map(s=>`<div class="stat ${s[2]}" ${s[3]?`data-go="${s[3]}" style="cursor:pointer"`:''}><div class="n tnum">${s[1]}</div><div class="l">${esc(s[0])}</div></div>`).join('')}</div>`);
    sw.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>location.hash=x.dataset.go);
    c.appendChild(sw);
    const mine=rows.filter(r=>['awaiting_approval','at_supplier','inspection'].includes(r.stage));
    if(mine.length){c.appendChild(el(`<div class="section-title">ממתין לטיפולך</div>`));c.appendChild(requestsList2(mine,true,true));}
    c.appendChild(el(`<div class="section-title">קריאות אחרונות</div>`));
    c.appendChild(requestsList2(rows.slice(0,10),true));
  });
}

/* ============================================================
   לוח בקרה — מנהל חנות
   ============================================================ */
async function storeDash(){
  const c=$('#content');
  dataView(rows=>{
    const count=st=>rows.filter(r=>r.stage===st).length;
    const inService=rows.filter(r=>['at_supplier','inspection','handled'].includes(r.stage)).length;
    const stats=[
      ['ממתין לאישור ספק', count('awaiting_approval'), count('awaiting_approval')?'accent':'', ''],
      ['לשליחה לספק', count('opened'), count('opened')?'accent':'', '#/send'],
      ['בטיפול הספק', inService, '', ''],
      ['מוכן לאיסוף לקוח', count('received_at_store'), count('received_at_store')?'accent':'', '#/receive'],
    ];
    c.innerHTML=pageHead('לוח בקרה','הקריאות של החנות שלך',
      `<a href="#/new" class="btn primary">${icon('plus',16)} פתיחת קריאה חדשה</a>`);
    const sw=el(`<div class="stats stagger">${stats.map(s=>`<div class="stat ${s[2]}" ${s[3]?`data-go="${s[3]}" style="cursor:pointer"`:''}><div class="n tnum">${s[1]}</div><div class="l">${esc(s[0])}</div></div>`).join('')}</div>`);
    sw.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>location.hash=x.dataset.go);
    c.appendChild(sw);
    c.appendChild(el(`<div class="section-title">קריאות אחרונות</div>`));
    c.appendChild(requestsList2(rows.slice(0,12),false));
  });
}

/* ============================================================
   תצוגת כרטיסייה לפי שלב/ים + סינון חנות לספק
   ============================================================ */
let _stageFilterStore='', _storesMemo=null;
async function loadStores(){
  if(_storesMemo) return _storesMemo;
  const {data}=await sb.from('stores').select('id,name').eq('is_archived',false).order('name');
  _storesMemo=data||[]; return _storesMemo;
}
async function stageListView(title,sub,stages,showQuick,withStoreFilter,note){
  const c=$('#content');
  const stores = (withStoreFilter && isAdmin()) ? (_storesMemo||await loadStores()) : [];
  c.innerHTML=pageHead(title,sub);
  if(note){
    c.appendChild(el(`<div class="card pad" style="background:var(--accent-soft);border-color:var(--accent-line);margin-bottom:16px;display:flex;gap:12px;align-items:flex-start">
      <div style="width:26px;height:26px;border-radius:8px;background:var(--accent);color:#fff;display:grid;place-items:center;font-weight:800;flex:none">i</div>
      <div class="small" style="color:var(--ink-2);line-height:1.6">${note}</div></div>`));
  }
  if(withStoreFilter && isAdmin()){
    const bar=el(`<div class="filterbar">
      <select class="select" id="sl-store" style="max-width:280px">
        <option value="">כל החנויות</option>
        ${stores.map(s=>`<option value="${s.id}" ${_stageFilterStore===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}
      </select>
      <span class="small muted" id="sl-count"></span>
    </div>`);
    c.appendChild(bar);
    bar.querySelector('#sl-store').onchange=e=>{_stageFilterStore=e.target.value;paint(cachedRequests()||[]);};
    if(!_storesMemo) loadStores(); // רענון רשימת חנויות ברקע
  }
  const holder=el('<div id="sl-holder"></div>');
  c.appendChild(holder);
  function paint(rows){
    let list=rows.filter(r=>stages.includes(r.stage));
    if(withStoreFilter && _stageFilterStore) list=list.filter(r=>r.store_id===_stageFilterStore);
    holder.innerHTML=''; holder.appendChild(requestsList2(list,isAdmin(),showQuick));
    const cnt=$('#sl-count'); if(cnt)cnt.textContent=list.length+' קריאות';
  }
  dataView(paint);
  _liveRefresh=()=>{ if(document.getElementById('sl-holder')) paint(cachedRequests()||[]); };
}
/* ============================================================
   מנוע מטמון מהיר — stale-while-revalidate
   מציג מיד מהזיכרון, מרענן ברקע. הכל מרגיש מיידי.
   ============================================================ */
let _reqMemo=null, _reqMemoTime=0, _reqInflight=null;
const REQ_SELECT='*, customers(full_name,phone,city,street), tools(category,brand,model,serial_no,sku,warranty), stores(name)';
function invalidateReqCache(){ _reqMemoTime=0; } // מסמן כ"ישן" — יטען מחדש בפעם הבאה
function cachedRequests(){ return _reqMemo; } // גישה סינכרונית מיידית (או null)
async function fetchRequests(){
  if(_reqInflight) return _reqInflight; // מונע פניות כפולות במקביל
  _reqInflight=(async()=>{
    let data,error;
    try{ ({data,error}=await withRetry(()=>sb.from('service_requests').select(REQ_SELECT).eq('is_archived',false).order('created_at',{ascending:false}))); }
    catch(e){ error=e; }
    _reqInflight=null;
    if(error){ return _reqMemo||[]; }
    _reqMemo=data||[]; _reqMemoTime=Date.now();
    return _reqMemo;
  })();
  return _reqInflight;
}
async function loadRequests(opts={}){
  const fresh = _reqMemo && (Date.now()-_reqMemoTime<20000);
  const data = fresh ? _reqMemo : await fetchRequests();
  return opts.limit ? data.slice(0,opts.limit) : data;
}

/* ============================================================
   רשימת קריאות + חיפוש/סינון
   ============================================================ */
let _reqCache=[];
async function requestsList(){
  const c=$('#content');
  _sel.clear();
  c.innerHTML=pageHead('קריאות שירות', isAdmin()?'כל הקריאות מכל החנויות':'הקריאות בהרשאתך',
    isAdmin()?'':`<a href="#/new" class="btn primary">${icon('plus',16)} קריאה חדשה</a>`);
  const bar=el(`<div class="card pad" style="margin-bottom:16px">
    <div class="row wrap" style="gap:10px">
      <input class="input" id="q" placeholder="חיפוש: מספר קריאה, לקוח, טלפון, דגם, מספר סידורי..." style="min-width:220px;flex:1">
      ${isAdmin()?`<select class="select" id="f-store" style="max-width:220px"><option value="">כל החנויות</option></select>`:''}
      <select class="select" id="f-stage" style="max-width:180px"><option value="">כל הסטטוסים</option>${STAGES.map(s=>`<option value="${s[0]}">${esc(s[1])}</option>`).join('')}</select>
      <select class="select" id="f-open" style="max-width:150px"><option value="">פתוחות וסגורות</option><option value="open">פתוחות</option><option value="closed">סגורות</option><option value="overdue">חריגות זמן</option></select>
      <button class="btn" id="f-clear">ניקוי</button>
      ${isAdmin()?`<button class="btn" id="f-csv">${icon('download',15)} ייצוא CSV</button>`:''}
    </div></div>`);
  c.appendChild(bar);
  if(isAdmin()){
    const bulk=el(`<div class="card pad hidden" id="bulk-bar" style="margin-bottom:16px;display:flex;align-items:center;gap:12px;background:var(--accent-soft);border-color:var(--accent-line)">
      <span style="font-weight:600">נבחרו <span id="bulk-n">0</span> קריאות</span>
      <span class="grow" style="flex:1"></span>
      <button class="btn" id="bulk-clear">ביטול בחירה</button>
      <button class="btn danger" id="bulk-del">${icon('trash',15)} מחיקה</button>
    </div>`);
    c.appendChild(bulk);
    bulk.querySelector('#bulk-clear').onclick=()=>{_sel.clear();apply();_onSelChange();};
    bulk.querySelector('#bulk-del').onclick=()=>confirmDelete();
  }
  const holder=el('<div id="req-holder"></div>');
  c.appendChild(holder);
  if(isAdmin() && (_storesMemo||cachedRequests())){
    const src=_storesMemo?_storesMemo.map(s=>[s.id,s.name]):[...new Map((cachedRequests()||[]).filter(r=>r.stores).map(r=>[r.store_id,r.stores.name])).entries()];
    const sel=$('#f-store'); src.sort((a,b)=>a[1]>b[1]?1:-1).forEach(([id,name])=>sel.appendChild(el(`<option value="${id}">${esc(name)}</option>`)));
    sel.onchange=apply;
  }
  function apply(){
    _reqCache=cachedRequests()||[];
    if(!$('#req-holder'))return;
    const q=$('#q').value.trim().toLowerCase();
    const st=$('#f-stage').value, op=$('#f-open').value, store=isAdmin()?($('#f-store')?.value||''):'';
    let list=_reqCache.filter(r=>{
      if(store&&r.store_id!==store)return false;
      if(st&&r.stage!==st)return false;
      if(op==='open'&&!OPEN_STAGES.includes(r.stage))return false;
      if(op==='closed'&&r.stage!=='delivered_closed')return false;
      if(op==='overdue'&&!overdue(r))return false;
      if(q){
        const hay=[r.request_no,r.customers?.full_name,r.customers?.phone,r.tools?.brand,r.tools?.model,
          r.tools?.serial_no,r.tools?.sku,r.tools?.category,r.fault_description,r.stores?.name,r.opened_by_name]
          .join(' ').toLowerCase();
        if(!hay.includes(q))return false;
      }
      return true;
    });
    holder.innerHTML=''; holder.appendChild(requestsList2(list,isAdmin(),true,isAdmin()));
    _onSelChange();
  }
  dataView(apply);              // רינדור מיידי + רענון ברקע
  _liveRefresh=()=>{ if(document.getElementById('req-holder')) apply(); };
  $('#q').addEventListener('input',debounce(apply,180));
  $('#f-stage').onchange=apply; $('#f-open').onchange=apply;
  $('#f-clear').onclick=()=>{$('#q').value='';$('#f-stage').value='';$('#f-open').value='';if($('#f-store'))$('#f-store').value='';apply();};
  if(isAdmin()) $('#f-csv').onclick=()=>exportCSV(currentFiltered());
  function currentFiltered(){const q=$('#q').value.trim().toLowerCase();const st=$('#f-stage').value,op=$('#f-open').value,store=$('#f-store')?.value||'';
    return (cachedRequests()||[]).filter(r=>{if(store&&r.store_id!==store)return false;if(st&&r.stage!==st)return false;if(op==='open'&&!OPEN_STAGES.includes(r.stage))return false;
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

/* מצב בחירה למחיקה מרובה (ספק בלבד) */
const _sel=new Set();
function _onSelChange(){ const bar=document.getElementById('bulk-bar'); if(bar){ bar.classList.toggle('hidden',_sel.size===0); const n=bar.querySelector('#bulk-n'); if(n)n.textContent=_sel.size; } }

/* רשימה רספונסיבית: טבלה במחשב, כרטיסים בטלפון */
function requestsList2(list,adminCols,showQuick,selectable){
  if(!list.length) return el(`<div class="empty">${icon('inbox',40)}<div>אין קריאות להצגה</div></div>`);
  if(isMobile()){
    const wrap=el('<div class="rcards stagger"></div>');
    [...list].forEach(r=>wrap.appendChild(requestCard(r,showQuick,selectable)));
    return wrap;
  }
  return requestsTable(list,adminCols,showQuick,selectable);
}

function requestCard(r,showQuick,selectable){
  const card=el(`<div class="rcard">
    <div class="rcard-top">
      ${selectable?`<input type="checkbox" class="sel-box" ${_sel.has(r.id)?'checked':''} style="width:18px;height:18px;flex:none">`:''}
      <span class="pill s-${r.stage}"><span class="dot"></span>${esc(STAGE_SHORT[r.stage]||STAGE_LABEL[r.stage])}</span>
      ${r.alert_text?'<span class="pill" style="background:#fdecec;color:#a1272b;border-color:#f3b9bb"><span class="dot" style="background:#e5484d"></span>התראה</span>':''}
      ${overdue(r)?'<span class="pill warn"><span class="dot"></span>חריגה</span>':''}
      <span class="grow"></span>
      <span class="mono small muted">${esc(r.request_no||'')}</span>
    </div>
    <div class="rcard-cust">${esc(r.customers?.full_name||'—')} ${r.urgency==='urgent'?'<span class="chip" style="padding:1px 7px;font-size:11px">⚡ דחוף</span>':''}</div>
    <div class="small muted">${esc((r.tools?.brand||'')+' '+(r.tools?.model||''))} · ${esc(r.tools?.category||'')}</div>
    ${isAdmin()&&r.stores?.name?`<div class="small muted">${icon('store',12)} ${esc(r.stores.name)}</div>`:''}
    <div class="rcard-foot"><span class="small muted">${daysBetween(r.created_at,new Date())} ימים בטיפול</span><span class="grow"></span></div>
  </div>`);
  if(selectable){
    const cb=card.querySelector('.sel-box');
    cb.onclick=e=>{e.stopPropagation(); if(cb.checked)_sel.add(r.id);else _sel.delete(r.id); _onSelChange();};
  }
  card.onclick=()=>location.hash='#/requests/id/'+r.id;
  if(showQuick){ const q=quickActionBtn(r,()=>route()); if(q){q.onclick=(orig=>e=>{e.stopPropagation();orig(e);})(q.onclick);card.querySelector('.rcard-foot').appendChild(q);} }
  return card;
}

let _sortCol='created_at', _sortDir=-1;
function requestsTable(list,adminCols,showQuick,selectable){
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
  if(selectable){
    const th=el('<th class="no-sort" style="width:42px"><input type="checkbox" id="sel-all" style="width:17px;height:17px"></th>');
    tr.appendChild(th);
  }
  cols.forEach(col=>{
    const th=el(`<th class="${col[0]?'':'no-sort'}">${esc(col[1])}${col[0]&&_sortCol===col[0]?(_sortDir<0?' ▾':' ▴'):''}</th>`);
    if(col[0])th.onclick=()=>{if(_sortCol===col[0])_sortDir*=-1;else{_sortCol=col[0];_sortDir=1;}
      const holder=wrap.parentElement;holder.innerHTML='';holder.appendChild(requestsTable(list,adminCols,showQuick,selectable));};
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  sorted.forEach(r=>{
    const row=el(`<tr>
      ${selectable?`<td style="width:42px"><input type="checkbox" class="sel-box" ${_sel.has(r.id)?'checked':''} style="width:17px;height:17px"></td>`:''}
      <td><span class="link mono">${esc(r.request_no||'—')}</span>${r.alert_text?' <span class="pill" style="background:#fdecec;color:#a1272b;border-color:#f3b9bb"><span class="dot" style="background:#e5484d"></span>התראה</span>':''}${overdue(r)?' <span class="pill warn"><span class="dot"></span>חריגה</span>':''}</td>
      <td class="small">${fmtDay(r.created_at)}</td>
      ${adminCols?`<td>${esc(r.stores?.name||'—')}</td>`:''}
      <td>${esc(r.customers?.full_name||'—')}<br><span class="small muted mono">${esc(r.customers?.phone||'')}</span></td>
      <td>${esc((r.tools?.brand||'')+' '+(r.tools?.model||''))}<br><span class="small muted">${esc(r.tools?.category||'')}</span></td>
      <td>${pill(r.stage)}</td>
      <td class="tnum">${daysBetween(r.created_at,new Date())}</td>
      <td class="act-cell"><div class="act-btns"></div></td>
    </tr>`);
    if(selectable){
      const cb=row.querySelector('.sel-box');
      cb.onclick=()=>{ if(cb.checked)_sel.add(r.id);else _sel.delete(r.id); _onSelChange(); };
    }
    const actCell=row.querySelector('.act-btns');
    if(showQuick){ const q=quickActionBtn(r,()=>route()); if(q)actCell.appendChild(q); }
    // כל השורה לחיצה — פותחת את הקריאה
    row.style.cursor='pointer';
    row.addEventListener('click',e=>{ if(e.target.closest('.act-btns')||e.target.closest('.sel-box'))return; location.hash='#/requests/id/'+r.id; });
    row.querySelector('.link').onclick=()=>location.hash='#/requests/id/'+r.id;
    tbody.appendChild(row);
  });
  if(selectable){
    const all=wrap.querySelector('#sel-all');
    if(all)all.onclick=()=>{ sorted.forEach(r=>{ if(all.checked)_sel.add(r.id);else _sel.delete(r.id); }); wrap.querySelectorAll('.sel-box').forEach(cb=>cb.checked=all.checked); _onSelChange(); };
  }
  return wrap;
}
function confirmDelete(){
  const n=_sel.size; if(!n)return;
  const body=el(`<div><p>למחוק <b>${n}</b> קריאות שנבחרו?</p>
    <p class="small muted">הקריאות יוסרו מכל הרשימות. הפעולה מיועדת לניקוי קריאות בדיקה.</p></div>`);
  const foot=el('<div class="row"><button class="btn danger" id="d-ok">כן, מחק</button><button class="btn ghost" id="d-cancel">ביטול</button></div>');
  const m=openModal('מחיקת קריאות',body,foot);
  foot.querySelector('#d-cancel').onclick=m.close;
  foot.querySelector('#d-ok').onclick=async()=>{
    const btn=foot.querySelector('#d-ok');btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
    const ids=[..._sel];
    let error;
    try{ ({error}=await withRetry(()=>sb.from('service_requests').update({is_archived:true}).in('id',ids))); }
    catch(e){ error=e; }
    if(error){toast('החיבור איטי — נסה שוב','err');btn.disabled=false;btn.textContent='כן, מחק';return;}
    sb.from('audit_log').insert(ids.map(id=>({actor_id:State.profile.id,entity:'service_request',entity_id:id,action:'delete'}))).then(()=>{});
    _sel.clear(); invalidateReqCache();
    toast(ids.length+' קריאות נמחקו','ok'); m.close(); requestsList();
  };
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

  let _lastStep=1;
  function render(){
    $$('.steps .s').forEach((s,i)=>{s.className='s'+(i+1<data.step?' done':i+1===data.step?' cur':'');});
    $('#step-label').textContent=labels[data.step-1];
    $('#wz-back').style.visibility=data.step>1?'visible':'hidden';
    $('#wz-next').textContent=data.step===4?'שליחת הקריאה':'המשך';
    const back=data.step<_lastStep; _lastStep=data.step;
    body.innerHTML='';
    body.classList.remove('page-anim','back'); void body.offsetWidth;
    body.classList.add('page-anim'); if(back)body.classList.add('back');
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
      urgency:data.urgency||'normal',stage:(isAdmin()?'opened':'awaiting_approval')
    }).select().single();
    if(e3)throw e3;
    sb.from('status_history').insert({request_id:req.id,store_id,from_stage:null,to_stage:(isAdmin()?'opened':'awaiting_approval'),note:(isAdmin()?'נפתחה קריאה ע״י הספק':'נפתחה קריאה — ממתינה לאישור ספק'),changed_by:State.profile.id}).then(()=>{});
    sb.from('audit_log').insert({actor_id:State.profile.id,store_id,entity:'service_request',entity_id:req.id,action:'create',details:{request_no:req.request_no}}).then(()=>{});
    // העלאת קבצים
    for(const f of files){
      const path=`${store_id}/${req.id}/${Date.now()}_${f.name}`;
      const {error:eu}=await sb.storage.from(STORAGE_BUCKET).upload(path,f);
      if(!eu) await sb.from('attachments').insert({request_id:req.id,store_id,storage_path:path,file_name:f.name,mime_type:f.type,size_bytes:f.size,uploaded_by:State.profile.id});
    }
    toast('הקריאה נפתחה: '+req.request_no,'ok');
    invalidateReqCache();
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
    `<div class="row" style="gap:8px">${isAdmin()?`<button class="btn" id="alert-btn">${icon('flag',15)} התראה לחנות</button>`:''}<button class="btn" id="edit-req">${icon('wrench',15)} עריכת פרטים</button><button class="btn" id="intake-pdf">${icon('print',15)} אישור קליטה</button><a href="#/requests" class="btn ghost">${icon('back',16)} חזרה</a></div>`);

  // באנר התראה אדום (אם הספק הגדיר התראה על הקריאה)
  if(r.alert_text){
    const ab=el(`<div class="alert-banner">
      <div class="ab-ic">!</div>
      <div class="grow"><b>התראה מהספק</b><div>${esc(r.alert_text)}</div></div>
      ${isAdmin()?`<button class="btn sm" id="alert-clear">הסרה</button>`:''}
    </div>`);
    c.appendChild(ab);
    const acl=ab.querySelector('#alert-clear'); if(acl)acl.onclick=()=>setAlert(r,null);
  }

  const top=el(`<div class="detail-cols">
    <div class="grow" style="min-width:0">
      <div class="card pad">
        <div class="row spread"><div class="row" style="gap:10px">${pill(r.stage)}${r.result?`<span class="chip">תוצאה: ${esc(RESULT_LABEL[r.result])}</span>`:''}${overdue(r)?'<span class="pill warn"><span class="dot"></span>חריגת זמן</span>':''}</div>
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
    <div class="detail-side stagger" id="side-col"></div>
  </div>`);
  c.appendChild(top);
  const ipdf=$('#intake-pdf'); if(ipdf)ipdf.onclick=()=>printIntakeReceipt(r);
  const ereq=$('#edit-req'); if(ereq)ereq.onclick=()=>editRequestModal(r);
  const abtn=$('#alert-btn'); if(abtn)abtn.onclick=()=>alertModal(r);
  const side=$('#side-col',top);

  // פאנל פעולה חכם — צעד הבא לפי תפקיד
  side.appendChild(actionPanel(r,rd));

  // פרטי טיפול (אם קיימים) — גלוי לשניהם חוץ מהפנימי
  if(rd && (rd.diagnosis||rd.actions_taken||rd.parts_replaced||rd.warranty_decision)){
    side.appendChild(el(`<div class="card pad"><div class="section-title" style="margin-top:0">פרטי טיפול</div>
      <dl class="kv">
        ${rd.diagnosis?`<dt>אבחון</dt><dd>${esc(rd.diagnosis)}</dd>`:''}
        ${rd.actions_taken?`<dt>פעולות</dt><dd>${esc(rd.actions_taken)}</dd>`:''}
        ${rd.parts_replaced?`<dt>חלקים</dt><dd>${esc(rd.parts_replaced)}</dd>`:''}
        ${rd.warranty_decision?`<dt>החלטת אחריות</dt><dd>${esc(rd.warranty_decision)}</dd>`:''}
      </dl></div>`));
  }

  // קבצים
  side.appendChild(attachmentsPanel(r,atts.data||[]));

  // הערות + ציר זמן (רוחב מלא מתחת)
  const bottom=el('<div class="detail-bottom"></div>');
  bottom.appendChild(commentsPanel(r,comments.data||[]));
  bottom.appendChild(timelinePanel(hist.data||[]));
  c.appendChild(bottom);
}

/* מעבר סטטוס משותף — משמש כפתורי פעולה מהירה ופאנל מפורט */
async function changeStage(r,toStage,note,result,onDone){
  const patch={stage:toStage}; if(result)patch.result=result;
  let error;
  try{ ({error}=await withRetry(()=>sb.from('service_requests').update(patch).eq('id',r.id))); }
  catch(e){ error=e; }
  if(error){toast('החיבור איטי — נסה שוב בעוד רגע','err');return false;}
  invalidateReqCache();
  sb.from('status_history').insert({request_id:r.id,store_id:r.store_id,from_stage:r.stage,to_stage:toStage,note:note||null,changed_by:State.profile.id}).then(()=>{});
  sb.from('audit_log').insert({actor_id:State.profile.id,store_id:r.store_id,entity:'service_request',entity_id:r.id,action:'status_change',details:{from:r.stage,to:toStage}}).then(()=>{});
  toast('הסטטוס עודכן','ok'); if(onDone)onDone(); return true;
}

/* קישור וואטסאפ ללקוח עם מלל מוכן לפי הסטטוס + חתימת החנות */
function waPhone(r){
  let ph=(r.customers?.phone||'').replace(/\D/g,'');
  if(ph.startsWith('0')) ph='972'+ph.slice(1);
  else if(!ph.startsWith('972')) ph='972'+ph;
  return ph;
}
function waSignature(r){ return `\n\nבברכה,\n${r.stores?.name||''}`; }
function toolLabel(r){
  // סוג הכלי + מותג + דגם — למשל: "מברגה Makita HP488"
  return [r.tools?.category, r.tools?.brand, r.tools?.model].filter(Boolean).join(' ').trim();
}
function waLink(r,customText){
  const name=r.customers?.full_name||'', tool=toolLabel(r), no=r.request_no||'';
  const T={
    awaiting_approval:`שלום ${name}, קיבלנו את הכלי ${tool} (קריאה ${no}). נעדכן אותך בהמשך.`,
    opened:`שלום ${name}, הכלי ${tool} (קריאה ${no}) בטיפולנו. נעדכן בקרוב.`,
    at_supplier:`שלום ${name}, הכלי ${tool} (קריאה ${no}) בדרך למעבדה לבדיקה. נעדכן ברגע שהסטטוס יתעדכן.`,
    inspection:`שלום ${name}, הכלי ${tool} (קריאה ${no}) בתהליך בדיקה במעבדה. נעדכן אותך ברגע שהסטטוס יתעדכן.`,
    handled:`שלום ${name}, הטיפול בכלי ${tool} (קריאה ${no}) הושלם והוא בדרכו חזרה לחנות.`,
    received_at_store:`שלום ${name}, הכלי ${tool} (קריאה ${no}) מוכן לאיסוף בחנות! נשמח לראותך.`,
    delivered_closed:`שלום ${name}, תודה שאספת את הכלי ${tool} (קריאה ${no}). לרשותך תמיד 🙂`,
  };
  const txt=(customText||T[r.stage]||`שלום ${name}, עדכון לגבי קריאה ${no}.`)+waSignature(r);
  return `https://wa.me/${waPhone(r)}?text=${encodeURIComponent(txt)}`;
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

  // כפתורי וואטסאפ ללקוח
  if(r.customers?.phone){
    const wa=el(`<a class="btn wa block" href="${waLink(r)}" target="_blank" rel="noopener" style="margin-top:2px">${icon('whatsapp',17)} עדכון ללקוח בוואטסאפ</a>`);
    p.appendChild(wa);
    const waR=el(`<button class="btn block" style="margin-top:8px;border-color:var(--wa);color:var(--wa)">${icon('whatsapp',16)} שליחת אישור קליטה בוואטסאפ</button>`);
    waR.onclick=()=>sendIntakeWhatsapp(r,waR);
    p.appendChild(waR);
  }

  // אדמין: כלים מתקדמים
  if(admin){
    p.appendChild(el('<div style="height:12px"></div>'));
    const adv=el(`<details open style="margin-top:4px"><summary class="small muted" style="cursor:pointer;font-weight:600">שינוי סטטוס ידני</summary>
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

/* עריכת פרטי הקריאה — לקוח, כלי, תיאור תקלה (זמין לספק ולחנות) */
/* התראה אדומה לחנות — תבניות מוכנות + טקסט חופשי (ספק בלבד) */
const ALERT_TEMPLATES=[
  'חסרה תמונה של הכלי — חובה לצרף כדי שנוכל להתקדם.',
  'חסר תיאור תקלה מפורט — נא להשלים כדי שנוכל לטפל.',
  'פרטי הלקוח חסרים או שגויים — נא לעדכן.',
  'מספר סידורי חסר — נא לצרף/להשלים.',
  'הכלי הגיע ללא האביזרים הנדרשים לבדיקה.',
  'חסרה חשבונית/הוכחת רכישה לצורך בדיקת אחריות.',
];
async function setAlert(r,text){
  try{ await withRetry(()=>sb.from('service_requests').update({alert_text:text}).eq('id',r.id)); }
  catch(e){ toast('החיבור איטי — נסה שוב','err'); return; }
  invalidateReqCache();
  toast(text?'ההתראה נשלחה לחנות':'ההתראה הוסרה','ok');
  viewRequestDetail(r.id);
}
function alertModal(r){
  const body=el('<div></div>');
  body.appendChild(el('<div class="section-title" style="margin-top:0">בחר תבנית מוכנה</div>'));
  const tpl=el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  ALERT_TEMPLATES.forEach(t=>{
    const b=el(`<button class="btn" style="text-align:right;justify-content:flex-start">${esc(t)}</button>`);
    b.onclick=()=>{ body.querySelector('#alert-free').value=t; };
    tpl.appendChild(b);
  });
  body.appendChild(tpl);
  body.appendChild(el('<div class="section-title">או טקסט חופשי</div>'));
  body.appendChild(el('<textarea class="textarea" id="alert-free" placeholder="כתוב התראה מותאמת אישית לחנות...">'+(r.alert_text?esc(r.alert_text):'')+'</textarea>'));
  const foot=el('<div class="row"><button class="btn danger" id="al-save">שליחת התראה</button><button class="btn ghost" id="al-cancel">ביטול</button></div>');
  const m=openModal('התראה לחנות · '+r.request_no,body,foot,true);
  foot.querySelector('#al-cancel').onclick=m.close;
  foot.querySelector('#al-save').onclick=async()=>{
    const t=body.querySelector('#alert-free').value.trim();
    if(!t){toast('כתוב או בחר התראה','err');return;}
    const btn=foot.querySelector('#al-save');btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
    await setAlert(r,t); m.close();
  };
}

function editRequestModal(r){
  const c=r.customers||{}, t=r.tools||{};
  const body=el('<div></div>');
  body.appendChild(el('<div class="section-title" style="margin-top:0">פרטי הלקוח</div>'));
  body.appendChild(fieldset([
    {name:'full_name',label:'שם מלא',req:true,value:c.full_name},
    {name:'phone',label:'טלפון',type:'tel',req:true,value:c.phone},
    {name:'phone_alt',label:'טלפון נוסף',type:'tel',value:c.phone_alt},
    {name:'city',label:'יישוב',value:c.city},
    {name:'street',label:'רחוב',value:c.street},
    {name:'house_no',label:'מספר בית',value:c.house_no},
  ]));
  body.appendChild(el('<div class="section-title">פרטי הכלי</div>'));
  body.appendChild(fieldset([
    {name:'category',label:'סוג הכלי',req:true,value:t.category},
    {name:'brand',label:'מותג',req:true,value:t.brand},
    {name:'model',label:'דגם',req:true,value:t.model},
    {name:'serial_no',label:'מספר סידורי',value:t.serial_no},
    {name:'sku',label:'מק״ט',value:t.sku},
    {name:'warranty',label:'מצב אחריות',type:'select',value:t.warranty||'to_verify',options:Object.entries(WARRANTY)},
    {name:'accessories',label:'אביזרים',value:t.accessories,full:true},
    {name:'fault_description',label:'תיאור התקלה',type:'textarea',req:true,value:r.fault_description,full:true},
  ]));
  const foot=el('<div class="row"><button class="btn primary" id="er-save">שמירה</button><button class="btn ghost" id="er-cancel">ביטול</button></div>');
  const m=openModal('עריכת פרטי הקריאה',body,foot,true);
  foot.querySelector('#er-cancel').onclick=m.close;
  foot.querySelector('#er-save').onclick=async()=>{
    if(!validate(body,['full_name','phone','category','brand','model','fault_description']))return;
    const f=readForm(body);
    const btn=foot.querySelector('#er-save');btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
    try{
      await withRetry(()=>sb.from('customers').update({full_name:f.full_name,phone:f.phone,phone_alt:f.phone_alt||null,
        city:f.city||null,street:f.street||null,house_no:f.house_no||null}).eq('id',r.customer_id));
      await withRetry(()=>sb.from('tools').update({category:f.category,brand:f.brand,model:f.model,serial_no:f.serial_no||null,
        sku:f.sku||null,warranty:f.warranty,accessories:f.accessories||null}).eq('id',r.tool_id));
      await withRetry(()=>sb.from('service_requests').update({fault_description:f.fault_description}).eq('id',r.id));
      invalidateReqCache();
      sb.from('audit_log').insert({actor_id:State.profile.id,store_id:r.store_id,entity:'service_request',entity_id:r.id,action:'edit_details'}).then(()=>{});
      toast('הפרטים עודכנו','ok'); m.close(); viewRequestDetail(r.id);
    }catch(err){ toast('החיבור איטי — נסה שוב','err'); btn.disabled=false; btn.textContent='שמירה'; }
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
      warranty_decision:f.warranty_decision||null,rejection_reason:f.rejection_reason||null,replacement_tool_no:f.replacement_tool_no||null};
    const {error}=await sb.from('repair_details').upsert(payload,{onConflict:'request_id'});
    if(error){toast('שגיאה: '+error.message,'err');return;}
    sb.from('audit_log').insert({actor_id:State.profile.id,store_id:r.store_id,entity:'repair_details',entity_id:r.id,action:'update'}).then(()=>{});
    toast('פרטי הטיפול נשמרו','ok');m.close();viewRequestDetail(r.id);
  };
}

function commentsPanel(r,comments){
  const admin=isAdmin();
  const visible=comments.filter(c=>admin||!c.is_internal);
  const list=visible.map(c=>`<div class="comment-item">
    <div class="comment-head"><b>${esc(c.profiles?.full_name||'משתמש')}</b><span class="small muted">${fmtDate(c.created_at)}</span>${c.is_internal?'<span class="chip chip-internal">פנימי</span>':''}</div>
    <div class="comment-body">${esc(c.body)}</div></div>`).join('')
    || '<div class="small muted" style="padding:4px 0 8px">אין הערות עדיין</div>';
  const p=el(`<div class="card" style="min-width:0"><div class="card-h">הערות ותקשורת</div>
    <div class="pad"><div id="c-list">${list}</div>
      <div style="margin-top:14px">
        <textarea class="textarea" id="c-body" placeholder="כתיבת הערה..."></textarea>
        ${admin?'<label class="internal-check"><input type="checkbox" id="c-internal"><span>הערה פנימית (לספק בלבד)</span></label>':'<div style="height:12px"></div>'}
        <button class="btn primary block" id="c-send">שליחת הערה</button>
      </div></div></div>`);
  p.querySelector('#c-send').onclick=async()=>{
    const body=p.querySelector('#c-body').value.trim(); if(!body)return;
    const is_internal=admin&&p.querySelector('#c-internal')?.checked||false;
    let error;
    try{ ({error}=await withRetry(()=>sb.from('comments').insert({request_id:r.id,store_id:r.store_id,author_id:State.profile.id,body,is_internal}))); }
    catch(e){ error=e; }
    if(error){toast('החיבור איטי — נסה שוב','err');return;}
    toast('ההערה נשלחה','ok');viewRequestDetail(r.id);
  };
  return p;
}

function timelinePanel(hist){
  const items=hist.map(h=>`<div class="tl-item"><div>${h.from_stage?esc(stageLabel(h.from_stage))+' ← ':''}<b>${esc(stageLabel(h.to_stage))}</b></div>
    <div class="t">${fmtDate(h.created_at)} · ${esc(h.profiles?.full_name||'מערכת')}</div>
    ${h.note?`<div class="small">${esc(h.note)}</div>`:''}</div>`).join('')||'<div class="small muted" style="padding:6px 0 4px">אין היסטוריה</div>';
  return el(`<div class="card" style="min-width:0"><div class="card-h">ציר זמן</div><div class="pad"><div class="timeline">${items}</div></div></div>`);
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
      // שמירת אישור המסירה כתמונה (נפתחת נכון בכל מקום, לא כ-HTML גולמי)
      try{
        const png=await renderReceiptPNG(r,f,signedText,sig.dataURL());
        const receiptPath=`${r.store_id}/${r.id}/delivery_receipt_${Date.now()}.png`;
        const {error:eR}=await sb.storage.from(STORAGE_BUCKET).upload(receiptPath,png,{contentType:'image/png'});
        if(!eR) sb.from('attachments').insert({request_id:r.id,store_id:r.store_id,storage_path:receiptPath,file_name:`אישור מסירה ${r.request_no}.png`,mime_type:'image/png',uploaded_by:State.profile.id}).then(()=>{});
      }catch(e){ console.error('receipt png',e); }
      await sb.from('service_requests').update({stage:'delivered_closed'}).eq('id',r.id);
      invalidateReqCache();
      // יומן והיסטוריה — לא חוסמים; גם אם ייכשלו, המסירה כבר הושלמה
      sb.from('status_history').insert({request_id:r.id,store_id:r.store_id,from_stage:r.stage,to_stage:'delivered_closed',note:'נמסר ללקוח: '+f.collector_name,changed_by:State.profile.id}).then(()=>{});
      sb.from('audit_log').insert({actor_id:State.profile.id,store_id:r.store_id,entity:'delivery',entity_id:r.id,action:'delivery',details:{collector:f.collector_name}}).then(()=>{});
      m.close();
      printDeliveryReceipt(r,f,signedText,sig.dataURL());
      toast('המסירה נשמרה והאישור נשמר בקבצים','ok');viewRequestDetail(r.id);
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

/* אישור קליטת כלי — מסמך ללקוח, ניתן להפקה בכל שלב. עיצוב בהיר. */
function buildIntakeHTML(r){
  const addr=[r.customers?.city,r.customers?.street,r.customers?.house_no,r.customers?.apartment].filter(Boolean).join(' ');
  const row=(dt,dd)=>`<div class="r"><span class="dt">${dt}</span><span class="dd">${esc(dd||'—')}</span></div>`;
  return `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>אישור קליטה ${esc(r.request_no)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
  :root{--ink:#111726;--muted:#69728a;--line:#e6e9f2;--accent:#5b5ef2;--soft:#eef0fe;--head:#eef0fb}
  *{box-sizing:border-box}
  body{font-family:'Rubik',Arial,sans-serif;margin:0;background:#f5f6fb;color:var(--ink);line-height:1.6}
  .sheet{max-width:720px;margin:22px auto;background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:0 10px 34px rgba(17,23,38,.08)}
  .hd{background:linear-gradient(160deg,#f3f4fe,#eef0fb);padding:26px 34px;border-bottom:3px solid var(--accent)}
  .hd .store{font-size:22px;font-weight:800;letter-spacing:-.02em}
  .hd .doc{margin-top:4px;color:var(--muted);font-size:14px;font-weight:500}
  .status{display:flex;align-items:center;justify-content:space-between;padding:14px 34px;background:var(--soft);border-bottom:1px solid var(--line);font-size:14px}
  .status b{color:var(--accent)}
  .bd{padding:26px 34px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  @media(max-width:560px){.grid{grid-template-columns:1fr}}
  .box{border:1px solid var(--line);border-radius:14px;overflow:hidden}
  .box h3{margin:0;font-size:13px;font-weight:700;padding:11px 16px;background:#f7f8fd;color:#3a4257;border-bottom:1px solid var(--line);letter-spacing:-.01em}
  .box .in{padding:14px 16px}
  .r{display:flex;justify-content:space-between;gap:12px;padding:5px 0;font-size:14px}
  .r .dt{color:var(--muted)}.r .dd{font-weight:600;text-align:left}
  .full{grid-column:1/-1}
  .fault{background:#f7f8fd;border:1px solid var(--line);border-radius:14px;padding:16px;margin-top:18px}
  .fault h3{margin:0 0 6px;font-size:13px;color:var(--muted);font-weight:700}
  .foot{padding:16px 34px;border-top:1px solid var(--line);color:var(--muted);font-size:11.5px;display:flex;justify-content:space-between}
  @media print{body{background:#fff}.sheet{border:0;box-shadow:none;margin:0;max-width:none;border-radius:0}}
  </style></head><body>
  <div class="sheet">
    <div class="hd"><div class="store">${esc(r.stores?.name||'')}</div><div class="doc">אישור קליטת כלי · קריאה ${esc(r.request_no)}</div></div>
    <div class="status"><span>תאריך קליטה: <b>${fmtDay(r.created_at)}</b></span><span>סטטוס: <b>${esc(STAGE_LABEL[r.stage]||'')}</b></span></div>
    <div class="bd">
      <div class="grid">
        <div class="box"><h3>פרטי הלקוח</h3><div class="in">
          ${row('שם',r.customers?.full_name)}
          ${row('טלפון',r.customers?.phone)}
          ${row('כתובת',addr)}
        </div></div>
        <div class="box"><h3>פרטי הכלי</h3><div class="in">
          ${row('סוג',r.tools?.category)}
          ${row('מותג ודגם',(r.tools?.brand||'')+' '+(r.tools?.model||''))}
          ${row('מספר סידורי',r.tools?.serial_no)}
          ${row('אחריות',WARRANTY[r.tools?.warranty])}
        </div></div>
        <div class="box full"><h3>אביזרים ומצב</h3><div class="in">
          ${row('אביזרים שנמסרו',r.tools?.accessories)}
          ${row('מצב חיצוני בקבלה',r.tools?.external_condition)}
        </div></div>
      </div>
      <div class="fault"><h3>תיאור התקלה (לפי הלקוח)</h3><div>${esc(r.fault_description||'—')}</div></div>
    </div>
    <div class="foot"><span>נפתח ע״י: ${esc(r.opened_by_name||'')}</span><span>הופק: ${fmtDate(new Date())} · ${esc(r.request_no)}</span></div>
  </div>
  <script>setTimeout(()=>window.print(),500)<\/script></body></html>`;
}
function printIntakeReceipt(r){
  const w=window.open('','_blank');
  w.document.write(buildIntakeHTML(r));
  w.document.close();
}

/* שליחת אישור קליטה ללקוח בוואטסאפ — מייצר תמונת PNG (נפתחת נכון בכל מקום) */
async function sendIntakeWhatsapp(r,btn){
  const orig=btn.innerHTML; btn.disabled=true; btn.innerHTML='<span class="spinner"></span>';
  // פתיחת חלון מיד עם הלחיצה — אחרת Safari חוסם אחרי ה-await
  const win=window.open('','_blank');
  try{
    const blob=await renderIntakePNG(r);
    let url=null;
    // ניסיון 1: bucket ציבורי — קישור קצר
    try{
      const path=`${r.store_id}/${r.id}/intake_${Date.now()}.png`;
      const {error}=await sb.storage.from(RECEIPTS_BUCKET).upload(path,blob,{contentType:'image/png',upsert:true});
      if(!error){ url=sb.storage.from(RECEIPTS_BUCKET).getPublicUrl(path).data.publicUrl; }
    }catch(e){ /* נמשיך לגיבוי */ }
    // ניסיון 2 (גיבוי): bucket פרטי + קישור חתום — תמיד עובד
    if(!url){
      const path=`${r.store_id}/${r.id}/intake_${Date.now()}.png`;
      const {error}=await sb.storage.from(STORAGE_BUCKET).upload(path,blob,{contentType:'image/png',upsert:true});
      if(error) throw error;
      const {data}=await sb.storage.from(STORAGE_BUCKET).createSignedUrl(path,60*60*24*365);
      url=data?.signedUrl;
    }
    if(!url) throw new Error('no url');
    const msg=`שלום ${r.customers?.full_name||''}, קיבלנו את הכלי ${toolLabel(r)} (קריאה ${r.request_no}). מצורף אישור קליטה:\n${url}`;
    const wa=waLink(r,msg);
    if(win && !win.closed){ win.location.href=wa; } else { window.open(wa,'_blank'); }
    toast('אישור הקליטה נשלח לוואטסאפ','ok');
  }catch(err){ if(win && !win.closed)win.close(); toast('שגיאה בהכנת האישור — נסה שוב','err'); }
  btn.disabled=false; btn.innerHTML=orig;
}

/* רינדור אישור קליטה כתמונת PNG באמצעות canvas — עברית RTL, עיצוב נקי */
async function renderIntakePNG(r){
  const W=1000, pad=60, scale=2;
  const cv=document.createElement('canvas');
  const ctx=cv.getContext('2d');
  const lines=[]; // נאסוף שורות ואז נצייר
  const addr=[r.customers?.city,r.customers?.street,r.customers?.house_no].filter(Boolean).join(' ');
  const rows=[
    ['תאריך קליטה', fmtDay(r.created_at)],
    ['חנות', r.stores?.name||''],
    ['לקוח', (r.customers?.full_name||'')+'  ·  '+(r.customers?.phone||'')],
    ['כתובת', addr||'—'],
    ['כלי', ((r.tools?.brand||'')+' '+(r.tools?.model||'')).trim()+'  ('+(r.tools?.category||'')+')'],
    ['מספר סידורי', r.tools?.serial_no||'—'],
    ['אחריות', WARRANTY[r.tools?.warranty]||'—'],
    ['סטטוס', STAGE_LABEL[r.stage]||''],
  ];
  const fault=r.fault_description||'—';
  // חישוב גובה
  const lineH=52, headH=150, rowStart=headH+70;
  const faultLines=wrapText(ctx,fault,W-2*pad-30,'22px Rubik,Arial');
  const H=rowStart + rows.length*lineH + 40 + 40 + faultLines.length*32 + 90;
  cv.width=W*scale; cv.height=H*scale; ctx.scale(scale,scale);
  // רקע
  ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H);
  // כותרת
  ctx.fillStyle='#f1f2fb'; ctx.fillRect(0,0,W,headH);
  ctx.fillStyle='#5b5ef2'; ctx.fillRect(0,headH-4,W,4);
  ctx.textAlign='right'; ctx.direction='rtl';
  ctx.fillStyle='#191d33'; ctx.font='800 34px Rubik,Arial';
  ctx.fillText(r.stores?.name||'', W-pad, 62);
  ctx.fillStyle='#69728a'; ctx.font='500 22px Rubik,Arial';
  ctx.fillText('אישור קליטת כלי · קריאה '+r.request_no, W-pad, 104);
  // שורות פרטים
  let y=rowStart;
  ctx.font='600 24px Rubik,Arial';
  ctx.fillStyle='#191d33'; ctx.textAlign='right';
  ctx.fillText('פרטי הקליטה', W-pad, y-24);
  rows.forEach(([k,v])=>{
    ctx.textAlign='right'; ctx.fillStyle='#69728a'; ctx.font='500 22px Rubik,Arial';
    ctx.fillText(k, W-pad, y);
    ctx.textAlign='left'; ctx.fillStyle='#191d33'; ctx.font='600 23px Rubik,Arial';
    ctx.fillText(v, pad, y);
    ctx.strokeStyle='#eef0f7'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(pad,y+16); ctx.lineTo(W-pad,y+16); ctx.stroke();
    y+=lineH;
  });
  // תיאור תקלה
  y+=30;
  ctx.textAlign='right'; ctx.fillStyle='#69728a'; ctx.font='600 20px Rubik,Arial';
  ctx.fillText('תיאור התקלה (לפי הלקוח)', W-pad, y); y+=36;
  ctx.fillStyle='#3a4257'; ctx.font='22px Rubik,Arial';
  faultLines.forEach(ln=>{ ctx.fillText(ln, W-pad, y); y+=32; });
  // כותרת תחתונה
  ctx.strokeStyle='#e6e9f2'; ctx.beginPath(); ctx.moveTo(pad,H-56); ctx.lineTo(W-pad,H-56); ctx.stroke();
  ctx.textAlign='right'; ctx.fillStyle='#98a1b6'; ctx.font='500 18px Rubik,Arial';
  ctx.fillText('הופק: '+fmtDate(new Date())+' · פורטל שירות ותיקונים עץ האורן', W-pad, H-28);
  await (document.fonts?document.fonts.ready:Promise.resolve());
  return await new Promise(res=>cv.toBlob(res,'image/png'));
}
function wrapText(ctx,text,maxW,font){
  ctx.font=font; const words=(text||'').split(/\s+/); const lines=[]; let cur='';
  words.forEach(w=>{ const t=cur?cur+' '+w:w; if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w;}else cur=t; });
  if(cur)lines.push(cur); return lines.length?lines:['—'];
}

/* רינדור אישור מסירה כתמונת PNG (כולל חתימה) */
async function renderReceiptPNG(r,f,signedText,sigDataUrl){
  const W=1000, pad=60, scale=2;
  const cv=document.createElement('canvas'); const ctx=cv.getContext('2d');
  const rows=[
    ['תאריך מסירה', fmtDate(new Date())],
    ['חנות', r.stores?.name||''],
    ['לקוח', (r.customers?.full_name||'')+'  ·  '+(r.customers?.phone||'')],
    ['כלי', ((r.tools?.brand||'')+' '+(r.tools?.model||'')).trim()+'  ('+(r.tools?.category||'')+')'],
    ['מספר סידורי', r.tools?.serial_no||'—'],
    ['תוצאת טיפול', RESULT_LABEL[r.result]||'—'],
    ['שם האוסף', f.collector_name||''],
    ['עובד מוסר', f.delivered_by_name||''],
  ];
  const noteLines=wrapText(ctx,signedText||'',W-2*pad-30,'20px Rubik,Arial');
  const sigImg=await new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src=sigDataUrl;});
  const lineH=52, headH=150, rowStart=headH+70;
  const sigH=180;
  const H=rowStart + rows.length*lineH + 30 + noteLines.length*30 + 40 + 40 + sigH + 70;
  cv.width=W*scale; cv.height=H*scale; ctx.scale(scale,scale);
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#191d33'; ctx.fillRect(0,0,W,headH);
  ctx.fillStyle='#5b5ef2'; ctx.fillRect(0,headH-4,W,4);
  ctx.textAlign='right'; ctx.direction='rtl';
  ctx.fillStyle='#fff'; ctx.font='800 34px Rubik,Arial'; ctx.fillText('אישור מסירת כלי', W-pad, 62);
  ctx.fillStyle='#8b93b5'; ctx.font='500 22px Rubik,Arial'; ctx.fillText('קריאה '+r.request_no+'  ·  '+(r.stores?.name||''), W-pad, 104);
  let y=rowStart;
  rows.forEach(([k,v])=>{
    ctx.textAlign='right'; ctx.fillStyle='#69728a'; ctx.font='500 22px Rubik,Arial'; ctx.fillText(k, W-pad, y);
    ctx.textAlign='left'; ctx.fillStyle='#191d33'; ctx.font='600 23px Rubik,Arial'; ctx.fillText(v, pad, y);
    ctx.strokeStyle='#eef0f7'; ctx.beginPath(); ctx.moveTo(pad,y+16); ctx.lineTo(W-pad,y+16); ctx.stroke(); y+=lineH;
  });
  y+=26; ctx.textAlign='right'; ctx.fillStyle='#3a4257'; ctx.font='20px Rubik,Arial';
  noteLines.forEach(ln=>{ctx.fillText(ln,W-pad,y);y+=30;});
  y+=24; ctx.fillStyle='#69728a'; ctx.font='600 20px Rubik,Arial'; ctx.fillText('חתימת הלקוח', W-pad, y); y+=14;
  ctx.strokeStyle='#d4d9e8'; ctx.strokeRect(pad,y,320,sigH-30);
  if(sigImg) ctx.drawImage(sigImg,pad+6,y+6,308,sigH-42);
  y+=sigH;
  ctx.strokeStyle='#e6e9f2'; ctx.beginPath(); ctx.moveTo(pad,H-50); ctx.lineTo(W-pad,H-50); ctx.stroke();
  ctx.textAlign='right'; ctx.fillStyle='#98a1b6'; ctx.font='500 18px Rubik,Arial';
  ctx.fillText('הופק: '+fmtDate(new Date())+' · פורטל שירות ותיקונים עץ האורן', W-pad, H-24);
  await (document.fonts?document.fonts.ready:Promise.resolve());
  return await new Promise(res=>cv.toBlob(res,'image/png'));
}

function buildReceiptHTML(r,f,signedText,sigDataUrl,forPrint){
  return `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>אישור מסירה ${esc(r.request_no)}</title>
  <style>
  :root{--ink:#12161c;--muted:#69747f;--line:#e7ebf0;--accent:#ec7513}
  *{box-sizing:border-box}
  body{font-family:'Rubik',Arial,sans-serif;margin:0;background:#f4f6f8;color:var(--ink);line-height:1.6}
  .sheet{max-width:640px;margin:24px auto;background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(18,22,28,.08)}
  .hd{background:#171c23;color:#fff;padding:24px 30px;display:flex;align-items:center;justify-content:space-between}
  .hd h1{font-size:19px;margin:0;font-weight:700}
  .hd .no{font-size:13px;color:#8b96a3;font-variant-numeric:tabular-nums}
  .bd{padding:26px 30px}
  h2{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin:22px 0 10px}
  h2:first-child{margin-top:0}
  .kv{display:grid;grid-template-columns:130px 1fr;gap:8px 14px;font-size:14.5px}
  .kv dt{color:var(--muted)}.kv dd{margin:0;font-weight:500}
  .note{background:#f8fafc;border:1px solid var(--line);padding:15px;border-radius:10px;margin:14px 0;font-size:13.5px;color:#39424e}
  .sig{border:1px solid var(--line);border-radius:10px;max-width:300px;margin-top:8px;background:#fff}
  .foot{margin-top:26px;font-size:11.5px;color:#95a0ac;border-top:1px solid var(--line);padding-top:14px}
  @media print{body{background:#fff}.sheet{border:0;box-shadow:none;margin:0;max-width:none}}
  </style></head><body>
  <div class="sheet">
    <div class="hd"><h1>אישור מסירת כלי</h1><span class="no">${esc(r.request_no)}</span></div>
    <div class="bd">
      <h2>פרטי הכלי והמסירה</h2>
      <div class="kv">
        <dt>תאריך מסירה</dt><dd>${fmtDate(new Date())}</dd>
        <dt>חנות</dt><dd>${esc(r.stores?.name||'')}</dd>
        <dt>לקוח</dt><dd>${esc(r.customers.full_name)} · ${esc(r.customers.phone)}</dd>
        <dt>כלי</dt><dd>${esc(r.tools.brand)} ${esc(r.tools.model)} (${esc(r.tools.category)})</dd>
        <dt>מספר סידורי</dt><dd>${esc(r.tools.serial_no||'—')}</dd>
        <dt>תוצאת טיפול</dt><dd>${esc(RESULT_LABEL[r.result]||'—')}</dd>
        <dt>אביזרים מוחזרים</dt><dd>${esc(f.returned_accessories||'—')}</dd>
      </div>
      <h2>פרטי המקבל</h2>
      <div class="kv">
        <dt>שם האוסף</dt><dd>${esc(f.collector_name)}</dd>
        ${f.collector_id_no?`<dt>תעודת זהות</dt><dd>${esc(f.collector_id_no)}</dd>`:''}
        <dt>עובד מוסר</dt><dd>${esc(f.delivered_by_name)}</dd>
      </div>
      <div class="note">${esc(signedText)}</div>
      <h2>חתימת הלקוח</h2><img class="sig" src="${sigDataUrl}">
      <div class="foot">מסמך זה הופק אוטומטית ממערכת פורטל השירות והתיקונים · ${fmtDate(new Date())}</div>
    </div>
  </div>
  ${forPrint?'<script>setTimeout(()=>window.print(),500)<\/script>':''}</body></html>`;
}
function printDeliveryReceipt(r,f,signedText,sigDataUrl){
  const w=window.open('','_blank');
  w.document.write(buildReceiptHTML(r,f,signedText,sigDataUrl,true));
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
  c.innerHTML=pageHead('משתמשים','ניהול מנהלי החנויות והמחסנים. רק אתה יכול ליצור, לערוך, לאפס סיסמה או להשבית.',
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
      <td>${p.role==='super_admin'?'':'<button class="btn sm" data-edit>עריכה</button> <button class="btn sm" data-pass>איפוס סיסמה</button> <button class="btn sm" data-toggle>'+(p.is_active?'השבתה':'הפעלה')+'</button>'}</td>
    </tr>`);
    if(p.role!=='super_admin'){
      row.querySelector('[data-edit]').onclick=()=>editUserModal(p,stores||[]);
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
function editUserModal(p,stores){
  const body=el('<div></div>');
  body.appendChild(fieldset([
    {name:'full_name',label:'שם מלא',req:true,value:p.full_name},
    {name:'store_id',label:'חנות / מחסן',type:'select',req:true,value:p.store_id||'',options:[['','בחר...'],...stores.map(s=>[s.id,s.name])],full:true},
  ]));
  body.appendChild(el('<p class="small muted">לשינוי שם המשתמש או הסיסמה — השתמש ב"איפוס סיסמה". שינוי חנות ישפיע על הקריאות שהמשתמש רואה.</p>'));
  const foot=el('<div class="row"><button class="btn primary" id="eu-save">שמירה</button><button class="btn ghost" id="eu-cancel">ביטול</button></div>');
  const m=openModal('עריכת משתמש · '+esc(p.full_name),body,foot);
  foot.querySelector('#eu-cancel').onclick=m.close;
  foot.querySelector('#eu-save').onclick=async()=>{
    if(!validate(body,['full_name','store_id']))return;
    const f=readForm(body);const btn=foot.querySelector('#eu-save');btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
    const res=await callAdmin('update_user',{user_id:p.id,full_name:f.full_name,store_id:f.store_id});
    if(res.error){toast('שגיאה: '+res.error,'err');btn.disabled=false;btn.textContent='שמירה';return;}
    toast('פרטי המשתמש עודכנו','ok');m.close();usersView();
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
    const doCall=async()=>{
      const r=await fetch(ADMIN_FN_URL,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token},
        body:JSON.stringify({action,...payload})});
      const j=await r.json();
      if(!r.ok){ const err=new Error(j.error||'שגיאת שרת'); err._server=true; throw err; }
      return j;
    };
    return await withRetry(async()=>{ try{ return await doCall(); }catch(e){ if(e._server) return {error:e.message}; throw e; } });
  }catch(e){return {error:'החיבור איטי — נסה שוב בעוד רגע.'};}
}

/* ============================================================
   דוחות
   ============================================================ */
async function reportsView(){
  const c=$('#content');
  dataView(rows=>{
    const byStore={}; rows.forEach(r=>{const k=r.stores?.name||'—';byStore[k]=(byStore[k]||0)+1;});
    const closed=rows.filter(r=>r.stage==='delivered_closed');
    const avg=closed.length?Math.round(closed.reduce((a,r)=>a+daysBetween(r.created_at,r.updated_at),0)/closed.length):0;
    c.innerHTML=pageHead('דוחות וייצוא','ייצוא נתונים וסיכומים');
    c.appendChild(el(`<div class="stats stagger">
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
  });
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
  whatsapp:'<path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z"/><path d="M8.5 8.5c0 3.5 3.5 7 7 7 .8 0 1.3-.6 1.3-1.2 0-.3-.1-.5-.4-.7l-1.6-.8c-.3-.1-.6 0-.8.2l-.5.6c-1.2-.5-2.1-1.4-2.6-2.6l.6-.5c.2-.2.3-.5.2-.8l-.8-1.6c-.2-.3-.4-.4-.7-.4-.6 0-1.4.5-1.4 1.3z"/>',
  truck:'<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  trash:'<path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2 2-2.5 3.5M12 17h.01"/>',
  flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  print:'<path d="M6 9V3h12v6M6 18H4a1 1 0 01-1-1v-5a2 2 0 012-2h14a2 2 0 012 2v5a1 1 0 01-1 1h-2M7 14h10v7H7z"/>',
}[name]||'';
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;}

/* ---------- מיקרו-אינטראקציה: ריפל בלחיצה על כפתורים ופריטי ניווט ---------- */
document.addEventListener('pointerdown',e=>{
  const t=e.target.closest('.btn, .nav a, .rcard, .stat[data-go]');
  if(!t||t.disabled)return;
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const rect=t.getBoundingClientRect();
  const size=Math.max(rect.width,rect.height);
  const rip=document.createElement('span');
  rip.className='ripple';
  rip.style.width=rip.style.height=size+'px';
  rip.style.left=(e.clientX-rect.left-size/2)+'px';
  rip.style.top=(e.clientY-rect.top-size/2)+'px';
  const pos=getComputedStyle(t).position;
  if(pos==='static')t.style.position='relative';
  if(getComputedStyle(t).overflow!=='hidden')t.style.overflow='hidden';
  t.appendChild(rip);
  setTimeout(()=>rip.remove(),560);
},{passive:true});

/* ---------- מעבר חלק בין טבלה לכרטיסים בשינוי גודל מסך ---------- */
let _wasMobile=isMobile();
window.addEventListener('resize',debounce(()=>{
  const d=document.getElementById('drawer'); if(d)d.classList.remove('open','closing');
  if(State.profile && isMobile()!==_wasMobile){ _wasMobile=isMobile(); route(); }
},250));

/* ---------- הפעלה ---------- */
boot();
