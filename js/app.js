const usuarioRepo = new LocalStorageUsuarioRepository();
const sensorRepo = null; 
const cultivoRepo = null;

const usuarioService = new UsuarioService(usuarioRepo);
const estadisticaService = new EstadisticaService(usuarioRepo, sensorRepo, cultivoRepo);
window.usuarioService = usuarioService;
window.estadisticaService = estadisticaService;