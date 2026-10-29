const repo_sensores = new LocalStorageSensorRepository();
const service_sensores = new SensorService(repo_sensores);

const repo_lectura = new LocalStorageLecturaRepository();
const service_lectura = new LecturaService(repo_lectura);

document.addEventListener('alpine:init', () => {
    Alpine.data('sensores', () => sensorController(service_sensores));
    Alpine.data('lecturas', () => lecturacontroller(service_lectura));

    const cultivoRepository = new LocalStorageCultivoRepository();
    const cultivoService = new CultivoService(cultivoRepository);
    Alpine.data('cultivosController', () => cultivosController(cultivoService));

    const invernaderoRepository = new LocalStorageInvernaderoRepository();
    const invernaderoService = new InvernaderoService(invernaderoRepository);
    Alpine.data('invernaderoController', () => invernaderoController(invernaderoService, cultivoService));

    const usuarioRepo = new LocalStorageUsuarioRepository();
    const usuarioService = new UsuarioService(usuarioRepo);
    const estadisticaService = new EstadisticaService(usuarioRepo, repo_sensores, cultivoRepository);
    Alpine.data('adminUsuarios', () => adminUsuariosController(usuarioService));
    Alpine.data('adminEstadistica', () => adminEstadisticaController(estadisticaService));
});