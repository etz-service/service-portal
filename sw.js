/* Service Worker — פורטל שירות ותיקונים עץ האורן
   נותן: טעינה מיידית (app shell במטמון) + עבודה ברשת חלשה/אופליין.
   עדכן את המספר כדי לאלץ רענון מטמון בכל גרסה חדשה. */
const CACHE = 'etz-service-v3';
const SHELL = [
  './',
  './index.html',
  './app.js',
  './madrich-oren.pdf',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
];

// התקנה — שמירת קבצי הליבה במטמון
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting())
  );
});

// הפעלה — ניקוי מטמונים ישנים
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return; // רק GET נשמר

  const url = new URL(req.url);

  // פניות ל-Supabase (נתונים חיים) — תמיד מהרשת, בלי מטמון
  if (url.hostname.endsWith('supabase.co')) {
    e.respondWith(fetch(req).catch(() => new Response('{"error":"offline"}', { headers: { 'Content-Type': 'application/json' } })));
    return;
  }

  // קבצי הליבה (HTML/JS) — רשת-תחילה: עדכונים מופיעים מיד; המטמון הוא גיבוי לאופליין בלבד
  const isShell = url.origin === self.location.origin && (
    req.mode === 'navigate' ||
    url.pathname === '/' || url.pathname.endsWith('/') ||
    /\/(index\.html|app\.js|sw\.js)(\?|$)/.test(url.pathname)
  );
  if (isShell) {
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match(req).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  // שאר הקבצים (PDF, ספריות CDN) — stale-while-revalidate: מגיש מיד, מרענן ברקע
  e.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

/* מטפל התראות דחיפה — מציג הודעה גם כשהאפליקציה סגורה */
self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) { data = { body: e.data && e.data.text() }; }
  const title = data.title || 'פורטל שירות ותיקונים';
  const options = {
    body: data.body || '',
    icon: data.icon || './apple-touch-icon.png',
    badge: data.badge || './apple-touch-icon.png',
    tag: data.tag || undefined,            // התראות על אותה קריאה מתאחדות
    renotify: !!data.tag,
    data: { url: data.url || './' },
    dir: 'rtl', lang: 'he'
  };
  e.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) {
      if ('focus' in c) {
        if ('navigate' in c && target && target !== './') { try { c.navigate(target); } catch (_) {} }
        return c.focus();
      }
    }
    if (clients.openWindow) return clients.openWindow(target);
  }));
});
