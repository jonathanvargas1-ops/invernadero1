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

        
        showLoading(estado) {
            this.cargando = estado;
        },
        showError(mensaje) {
            this.error = mensaje;
        },
        hideError() {
            this.error = null;
        },

        
        async cargarCultivos() {
            this.showLoading(true);
            this.hideError();
            try {
                this.cultivos = await cultivoService.obtenerCultivos(this.filtro);
            } catch (err) {
                this.cultivos = [];
                this.showError(err.message || 'Error al cargar los cultivos.');
            } finally {
                this.showLoading(false);
            }
        },

        async agregarCultivo() {
            this.hideError();
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
            } catch (error) {
                this.showError('Error al agregar el cultivo: ' + error.message);
            }
        },

        iniciarEdicion(cultivo) {
            this.hideError();
            this.editandoCultivo = { ...cultivo };
        },

        cancelar() {
            this.editandoCultivo = null;
            this.hideError();
        },

        async guardarEdicion() {
            if (!this.editandoCultivo) return;
            this.hideError();
            try {
                await cultivoService.actualizarCultivo(this.editandoCultivo);
                this.editandoCultivo = null;
                await this.cargarCultivos();
            } catch (error) {
                this.showError('Error al guardar la edición: ' + error.message);
            }
        },

        async eliminarCultivo(id) {
            if (!confirm('¿Estás seguro de que deseas eliminar este cultivo?')) return;
            this.hideError();
            try {
                await cultivoService.eliminarCultivo(id);
                await this.cargarCultivos();
            } catch (error) {
                this.showError('Error al eliminar el cultivo: ' + error.message);
            }
        },

        
        mostrarVacio() {
            return !this.cargando && this.cultivos.length === 0;
        },
        mostrarTabla() {
            return !this.cargando && this.cultivos.length > 0;
        },
        estaEditando() {
            return this.editandoCultivo !== null;
        },
        mostrarFormAgregar() {
            return this.editandoCultivo === null;
        }
    };
}