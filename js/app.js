document.addEventListener('alpine:init', () => {
    const cultivoRepository = new LocalStorageCultivoRepository();
    const cultivoService = new CultivoService(cultivoRepository);
    Alpine.data('cultivosController', () => cultivosController(cultivoService));

    const invernaderoRepository = new LocalStorageInvernaderoRepository();
    const invernaderoService = new InvernaderoService(invernaderoRepository);
    Alpine.data('invernaderoController', () => invernaderoController(invernaderoService, cultivoService)); 
});