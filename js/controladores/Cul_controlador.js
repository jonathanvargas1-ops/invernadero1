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
        editandoNombre: '',
        editandoTipo: '',
        editandoEstado: '',
        
        async init() {
            await this.listarCultivos();
        },
       async cargarCultivos() {
        this.cargando = true;
        this.error = null;
        try {
            if (this.filtro.trim() === '') {
                this.cultivos = await cultivoService.filrar(this.filtro);
             }
             else {
                this.cultivos = await cultivoService.obtenerTodos();
            }
        } 
        catch (error) {
            this.error = 'Error al cargar los cultivos: ' + error.message;
        } finally {
            this.cargando = false;
        }
    },
    async agregarCultivo() {
        this.error = null;
        try {
            await cultivoservice.agregarCultivo({
                nombre: this.nuevoNombre,
                tipo: this.nuevoTipo,
                estado: this.nuevoEstado
            });
            this.nuevoNombre = '';
            this.nuevoTipo = '';
            this.nuevoEstado = '';
            await this.cargarCultivos();
        },
        cancelar() {
            this.editandoCultivo = null;
        },
        async guardarEdicion() {
            this.error = null;
            try {
                await cutlvivoservice.actualizarcutvico({
                    id: this.editandoCultivo.id,
                    nombre: this.editandoCultivo.nombre,
                    tipo: this.editandoCultivo.tipo,
                    estado: this.editandoCultivo.estado
                });
                this.editandoCultivo = null;
                await this.cargarCultivos();
            } catch (error) {
                this.error = 'Error al guardar la edición: ' + error.message;
            }
        },
        async eliminarCultivo(id) {
            this.error = null;
            try {
                await cultivoservice.eliminarCultivo(id);
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
