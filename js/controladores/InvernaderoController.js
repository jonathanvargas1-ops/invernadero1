function invernaderoController(invernaderoService, cultivoService = null, sensorService = null, lecturaService = null) {
    return {
        invernadero: null,
        cargando: false,
        error: null,
        errorGuardar: null,
        editando: false,
        borrador: {},
        totalCultivos: 0,
        totalSensoresActivos: 0,
        totalLecturas: 0,
        ultimaLectura: null,

        async init(){
            await this.cargarDatos();
        },

        showLoading(estado) {
            this.cargando = estado;
        },
        showError(mensaje) {
            this.error = mensaje;
        },

        async cargarDatos() {
            this.showLoading(true);
            this.showError(null);
            try{
                this.invernadero = await invernaderoService.obtenerInvernaderoPrincipal();  
            }
            catch (err) {
                this.showError(err.message || 'Error al cargar la información del invernadero.');
                this.showLoading(false);
                return;
            }
         await this.cargarCultivos();
         await this.cargarSensores();
         await this.cargarLecturas();
         this.showLoading(false);
        },
        async cargarCultivos() {
         if (!cultivoService) return;
         try {
            const lista = await cultivoService.obtenerCultivos();
            this.totalCultivos = lista ? lista.length : 0;
            }
         catch(err) {
            console.error('Error al cargar cultivos en el resumen:', err);
            this.totalCultivos = 0;
            }
        },
        async cargarSensores() {
            if (!sensorService) return;
            try {
                this.totalSensoresActivos = await sensorService.contar_activos();
            }
            catch (err) {
                console.error('Error al cargar sensores activos:', err);
                this.totalSensoresActivos = 0;
            }
        },

        async cargarLecturas() {
            if (!lecturaService) return;
            try {
                this.totalLecturas = await lecturaService.total_registro();
            }
            catch (err) {
                console.error('Error al cargar total de registros:', err);
                this.totalLecturas = 0;
            }
            try {
                this.ultimaLectura = await lecturaService.ultima_lectura();
            }
            catch (err) {
                console.error('Error al cargar ultima lectura:',err);
                this.ultimaLectura = null;
            }
        },


        iniciarEdicion(){
            if (!this.invernadero) return;
            this.borrador = { ...this.invernadero };
            this.errorGuardar = null;
            this.editando = true;
        },

        cancelarEdicion() {
            this.editando = false;
            this.borrador = {};
            this.errorGuardar = null;
        },

        async guardarEdicion() {
            this.errorGuardar = null;
            try {
                const actualizado = await invernaderoService.editarInvernadero(this.borrador);
                this.invernadero = actualizado ? { ...actualizado } : { ...this.borrador };
                this.editando = false;
            }
            catch (err) {
                this.errorGuardar = 'Error al guardar los cambios: ' + err.message;
            }
        },
        tieneInvernadero() {
            return !this.cargando && !this.error && this.invernadero !== null;
        },
        estaVacio() {
            return !this.cargando && !this.error && this.invernadero === null;
        },
        hayCultivos() {
            return this.totalCultivos > 0;
        },
        haySensores() {
            return this.totalSensoresActivos > 0;
        }
    };
}
     
            