const CACHE_NAME = 'invernadero-cache-v2';
const urlsToCache = [
  'admin_usuarios.html',
  'admin_estadistica.html',
  'admin_usuarios.css',
  'admin_estadistica.css',
  'login.html',
  'sensores.html',
  'cultivos.html',
  'invernadero.html',
  'login.css',
  'sensores.css',
  'cultivos.css',
  'invernadero.css',
  'js/app.js',
  'js/repositorios/UsuarioRepository.js',
  'js/repositorios/LocalStorageUsuarioRepository.js',
  'js/servicios/UsuarioService.js',
  'js/servicios/EstadisticaService.js',
  'js/controladores/adminUsuariosController.js',
  'js/controladores/adminEstadisticaController.js',
    'js/repositorios/SensorRepository.js',
  'js/repositorios/LocalStorageSensorRepository.js',
  'js/repositorios/LecturaRepository.js',
  'js/repositorios/LocalStorageLecturaRepository.js',
  'js/repositorios/CultivoRepository.js',
  'js/repositorios/LocalStorageCultivoRepository.js',
  'js/repositorios/invernaderoRepository.js',
  'js/repositorios/LocalStorageInvernaderoRepository.js',
    'js/servicios/SensorService.js',
  'js/servicios/LecturaService.js',
  'js/servicios/CultivoService.js',
  'js/servicios/InvernaderoService.js',
  'js/controladores/SensorController.js',
  'js/controladores/FilaSensorController.js',
  'js/controladores/LecturaController.js',
  'js/controladores/CultivoController.js',
  'js/controladores/InvernaderoController.js',
  'js/controladores/LoginController.js',
  'imagenes/login22.png',
  'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js'

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

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(nombres =>
      Promise.all(
        nombres
          .filter(nombre => nombre !== CACHE_NAME)
                    .map(nombre => caches.delete(nombre))
                        
    )          
  )
)          
}
);             

