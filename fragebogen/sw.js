// Offline-Cache für den iPad-Fragebogen (Demo)
const CACHE = "tft-fragebogen-v1";
const FILES = [
  "./", "./index.html", "./manifest.webmanifest",
  "../assets/css/base.css",
  "../assets/img/logo-white.svg", "../assets/img/logo-pink.svg",
  "../assets/fonts/Franie-Regular.woff2", "../assets/fonts/Franie-SemiBold.woff2",
  "../assets/fonts/Franie-Black.woff2", "../assets/fonts/Thefirstfont-Regular.woff2"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});
