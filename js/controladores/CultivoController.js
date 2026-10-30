function cultivosController(cultivoService) {
    return {
        cultivos: [],
        cargando: false,
        error: null,
        filtro: '',
        cultivoEnEdicion: null,

        async init() {
            await this.cargarCultivos();
        },

        showLoading(estado) {
            this.cargando = estado;
        },

        showError(mensaje) {
            this.error = mensaje;
        },

        async cargarCultivos() {
            this.showLoading(true);
            this.showError(null);
            try {
                this.cultivos = await cultivoService.obtenerCultivos(this.filtro);
            } catch (err) {
                this.cultivos = [];
                this.showError(err.message || 'Error al cargar los cultivos.');
            } finally {
                this.showLoading(false);
            }
        },

        async crearCultivo(nuevoCultivo) {
            this.showError(null);
            try {
                await cultivoService.crearCultivo(nuevoCultivo);
                await this.cargarCultivos();
                this.$dispatch('cultivo-guardado');
            } catch (err) {
                this.showError('Error al agregar el cultivo: ' + err.message);
            }
        },

        iniciarEdicion(detalle) {
            this.showError(null);
            this.cultivoEnEdicion = detalle.cultivo;
        },

        cancelarEdicion() {
            this.cultivoEnEdicion = null;
            this.showError(null);
        },

        async guardarEdicion(datosBorrador) {
            this.showError(null);
            try {
                await cultivoService.actualizarCultivo(datosBorrador);
                this.cultivoEnEdicion = null;
                await this.cargarCultivos();
            } catch (err) {
                this.showError('Error al guardar los cambios: ' + err.message);
            }
        },

        async eliminarCultivo(detalle) {
            if (!confirm('¿Estás seguro de que deseas eliminar este cultivo?')) return;
            this.showError(null);
            try {
                await cultivoService.eliminarCultivo(detalle.id);
                await this.cargarCultivos();
            } catch (err) {
                this.showError('Error al eliminar el cultivo: ' + err.message);
            }
        },

        mostrarVacio() {
            return !this.cargando && this.cultivos.length === 0;
        },

        mostrarTabla() {
            return !this.cargando && this.cultivos.length > 0;
        },

        estaEditando() {
            return this.cultivoEnEdicion !== null;
        },

        mostrarFormAgregar() {
            return this.cultivoEnEdicion === null;
        }
    };
}

function filaCultivoController() {
    return {
        avisarEditar(cultivo) {
            this.$dispatch('pedir-editar', { cultivo: cultivo });
        },
        avisarEliminar(id) {
            this.$dispatch('pedir-eliminar', { id: id });
        }
    };
}

function formularioCultivo(datosIniciales = {}) {
    return {
        borrador: {
            id: datosIniciales.id,
            nombre: datosIniciales.nombre || '',
            tipo: datosIniciales.tipo || '',
            estado: datosIniciales.estado || ''
        },

        crear() {
            this.$dispatch('crear-cultivo', { ...this.borrador });
        },

        guardar() {
            this.$dispatch('guardar-cultivo', { ...this.borrador });
        },

        cancelar() {
            this.$dispatch('cancelar-edicion');
        },

        limpiar() {
            this.borrador = { id: undefined, nombre: '', tipo: '', estado: '' };
        }
    };
}