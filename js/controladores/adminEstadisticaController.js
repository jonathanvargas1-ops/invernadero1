function adminEstadisticaController(estadisticaService) {
    return {
        estadisticas: {
            totalUsuarios: 0,
            totalSensores: 0,
            totalCultivos: 0
        },
        showLoading: false,
        showError: null,

        async init() {
            this.showLoading = true;
            this.showError = null;
            try {
                this.estadisticas = await estadisticaService.obtenerEstadisticasGlobales();
            } catch (err) {
                this.showError = 'No se pudieron calcular las estadísticas globales.';
            } 
            this.showLoading = false;
        }
    };
}