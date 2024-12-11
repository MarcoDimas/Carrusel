const cacheName = 'v1';
const cacheAssets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css', // Corrige el nombre del archivo CSS si es styles.css
  '/main.js',
  '/assets/icon-128.png',
  '/assets/icon-512.png',
  '/assets/m1.jpg',
  '/assets/m2.jpg',
  '/assets/m3.jpg',
  '/assets/m4.jpg',
  '/views/home.html',        

  


];

// Instalación del Service Worker
self.addEventListener('install', (e) => {
  console.log('Service Worker: Instalado');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Cacheando Archivos');
      return cache.addAll(cacheAssets);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activado');
  // Limpiar cachés antiguos
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Limpiando caché', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


// Fetch (recuperar recursos desde cache o red)
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching', e.request.url);
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).then((response) => {
        // Agregar recursos al caché si no están presentes
        return caches.open(cacheName).then((cache) => {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});


// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('Service Worker registrado con éxito:', reg))
      .catch((err) => console.log('Error al registrar el Service Worker:', err));
  });
}

