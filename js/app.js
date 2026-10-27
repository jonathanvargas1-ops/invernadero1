document.addEventListener('alpine:init', () => {
    const cultivoRepository = new LocalStorageCultivoRepository();
    const cultivoService = new CultivoService(cultivoRepository);
    Alpine.data('cultivosController', () => cultivosController(cultivoService));
});