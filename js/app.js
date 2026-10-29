const repo_sensores = new LocalStorageSensorRepository();
const service_sensores = new SensorService(repo_sensores);

const repo_lectura = new LocalStorageLecturaRepository();
const service_lectura = new LecturaService(repo_lectura);

document.addEventListener('alpine:init', () => {
    const cultivoRepository = new LocalStorageCultivoRepository();
    const cultivoService = new CultivoService(cultivoRepository);
    Alpine.data('cultivosController', () => cultivosController(cultivoService));

    const invernaderoRepository = new LocalStorageInvernaderoRepository();
    const invernaderoService = new InvernaderoService(invernaderoRepository);
    Alpine.data('invernaderoController', () => invernaderoController(invernaderoService, cultivoService)); 
});