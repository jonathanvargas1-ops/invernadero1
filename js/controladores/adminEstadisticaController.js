document.addEventListener('alpine:init', () => {
    Alpine.data('adminEstadistica', () => ({
        estadisticas: {
            totalUsuarios: 0,
            totalSensores: 0,
            totalCultivos: 0
        },
        cargando: false,
        error: null,

        async init() {
            this.cargando = true;
            this.error = null;
            try {
                this.estadisticas = await window.estadisticaService.obtenerEstadisticasGlobales();
            } catch (err) {
                this.error = 'No se pudieron calcular las estadísticas globales.';
            } finally {
                this.cargando = false;
            }
        }
    }));
});