function cultivosController(cultivoService) {
    return {
        cultivos: [],
        cargando: false,
        error: null,
        filtro: '',

        nuevoNombre: '',
        nuevoTipo: '',
        nuevoEstado: '',

        editandoCultivo: null,
        
        async init() {
            await this.cargarCultivos();
        },
       async cargarCultivos() {
        this.cargando = true;
        this.error = null;
        try {
                this.cultivos = await cultivoService.obtenerCultivos(this.filtro);
             }
              catch (err) {
                this.error = err.message || 'Error al cargar los cultivos.';
              }
              finally {
                this.cargando = false;
            }
    },
    async agregarCultivo() {
        this.error = null;
        try {
            await cultivoService.crearCultivo({
                nombre: this.nuevoNombre,
                tipo: this.nuevoTipo,
                estado: this.nuevoEstado
            });
            this.nuevoNombre = '';
            this.nuevoTipo = '';
            this.nuevoEstado = '';
            await this.cargarCultivos();
        }
        catch (error) {
            this.error = 'Error al agregar el cultivo: ' + error.message;
        }
    },
    iniciarEdicion(cultivo) {
        this.editandoCultivo = { ...cultivo };
    },
    cancelar() {
        this.editandoCultivo = null;
    },
        async guardarEdicion() {
            if (!this.editandoCultivo) return;
            this.error = null;
            try {
                await cultivoService.actualizarCultivo(this.editandoCultivo);
                    this.editandoCultivo= null;
                    await this.cargarCultivos();
            } catch (error) {
                this.error = 'Error al guardar la edición: ' + error.message;
            }
        },
        async eliminarCultivo(id) {
            this.error = null;
            try {
                await cultivoService.eliminarCultivo(id);
                await this.cargarCultivos();
            } 
            catch (error) {
                this.error = 'Error al eliminar el cultivo: ' + error.message;
                }
        },
        async filtrarCultivos() {
            await this.cargarCultivos();
                }
            };
}
