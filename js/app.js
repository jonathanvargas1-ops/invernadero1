document.addEventListener('alpine:init', () => {
    const usuarioRepo = new LocalStorageUsuarioRepository();
 
    const sensorRepo = typeof LocalStorageSensorRepository !== 'undefined' ? new LocalStorageSensorRepository() : null;
    const cultivoRepo = typeof LocalStorageCultivoRepository !== 'undefined' ? new LocalStorageCultivoRepository() : null;

    const usuarioService = new UsuarioService(usuarioRepo);
    const estadisticaService = new EstadisticaService(usuarioRepo, sensorRepo, cultivoRepo);

    Alpine.data('adminUsuarios', () => adminUsuariosController(usuarioService));
    Alpine.data('adminEstadistica', () => adminEstadisticaController(estadisticaService));
});