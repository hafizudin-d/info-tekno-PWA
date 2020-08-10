const CACHE_NAME = "firstpwa-v13";
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/harga-pasar.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/images/icon-it-512.png",
  "/images/icon-it-192.png",
  "/images/profil.jpg",
  "/images/bg.png",
  "/images/bg2.png",
  "/images/call-center.png",
  "/images/dyna-laptop.jpeg",
  "/images/flight-simulator.jpg",
  "/images/icon-fb.png",
  "/images/icon-ig.png",
  "/images/icon-tw.png",
  "/images/lenovo.jpg",
  "/images/peduli-lindungi.jpg",
  "/images/pict-gadget/samsung_m30s.jpg",
  "/images/pict-gadget/samsung_galaxya10s.jpg",
  "/images/pict-gadget/oppo_reno2f.jpg",
  "/images/pict-gadget/Oppo-A9_4.jpg",
  "/images/pict-gadget/realme-5s-1.jpg",
  "/images/pict-gadget/realme-xt-ok.jpg",
  "/images/pict-gadget/realme-5.jpg",
  "/manifest.json",
  "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];
 
self.addEventListener("install", (event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
})

self.addEventListener("fetch", (event)=>{
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then((response) => {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

  self.addEventListener("activate", event=>{
    event.waitUntil(

      caches.keys().then((cacheNames) => {
          return Promise.all(
              cacheNames.map((cacheName) => {
                  if(cacheName != CACHE_NAME){
                      console.log("ServiceWorker: cache " + cacheName + " dihapus");
                      return caches.delete(cacheName);
                  }
              })
          )
      })

    )
  });