const CACHE_NAME = 'invernadero-cache-v1';
const urlsToCache = [
  'admin_usuarios.html',
  'admin_estadistica.html',
  'admin_usuarios.css',
  'admin_estadistica.css',
  'js/app.js',
  'js/repositorios/UsuarioRepository.js',
  'js/repositorios/LocalStorageUsuarioRepository.js',
  'js/servicios/UsuarioService.js',
  'js/servicios/EstadisticaService.js',
  'js/controladores/adminUsuariosController.js',
  'js/controladores/adminEstadisticaController.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});