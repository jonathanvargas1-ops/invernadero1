function cultivosController(cultivoService) {
    return {
        cultivos: [],
        cargando: false,
        error: null,
        filtro: '',
        nuevoNombre: '',
        nuevoTipo: '',
        nuevoEstado: '',
        

        async init() {
            await this.listarCultivos();
        },

    }
}