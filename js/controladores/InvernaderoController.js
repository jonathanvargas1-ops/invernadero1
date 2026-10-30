function invernaderoController(invernaderoService, cultivoService = null, sensorService = null, lecturaService = null) {
    return {
        invernadero: null,
        cargando: false,
        error: null,
        errorGuardar: null,
        errorAccion: null,
        editando: false,
        totalCultivos: 0,
        totalSensoresActivos: 0,
        totalLecturas: 0,
        ultimaLectura: null,

        async init() {
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
            try {
                this.invernadero = await invernaderoService.obtenerInvernaderoPrincipal();
            } catch (err) {
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
            } catch (err) {
                console.error('Error al cargar cultivos:', err);
                this.totalCultivos = 0;
            }
        },

        async cargarSensores() {
            if (!sensorService) return;
            try {
                this.totalSensoresActivos = await sensorService.contar_activos();
            } catch (err) {
                console.error('Error al cargar sensores activos:', err);
                this.totalSensoresActivos = 0;
            }
        },

        async cargarLecturas() {
            if (!lecturaService) return;
            try {
                this.totalLecturas = await lecturaService.total_registro();
            } catch (err) {
                console.error('Error al cargar total de registros:', err);
                this.totalLecturas = 0;
            }
            try {
                this.ultimaLectura = await lecturaService.ultima_lectura();
            } catch (err) {
                console.error('Error al cargar última lectura:', err);
                this.ultimaLectura = null;
            }
        },

        iniciarEdicion() {
            this.errorGuardar = null;
            this.editando = true;
        },

        cancelarEdicion() {
            this.editando = false;
            this.errorGuardar = null;
        },

        async guardarEdicion(datosBorrador) {
            this.errorGuardar = null;
            try {
                const datosAEnviar = { ...this.invernadero, ...datosBorrador };
                await invernaderoService.editarInvernadero(datosAEnviar);
                this.editando = false;
                await this.cargarDatos();
            } catch (err) {
                this.errorGuardar = 'Error al guardar los cambios: ' + err.message;
            }
        },

        async crearInvernadero(nuevoInvernadero) {
            this.errorAccion = null;
            try {
                await invernaderoService.crearInvernadero(nuevoInvernadero);
                await this.cargarDatos();
            } catch (err) {
                this.errorAccion = 'Error al crear el invernadero: ' + err.message;
            }
        },

        async eliminarInvernadero() {
            if (!confirm('¿Estás seguro de que deseas eliminar la información del invernadero?')) return;
            this.errorAccion = null;
            try {
                await invernaderoService.eliminarInvernadero(this.invernadero ? this.invernadero.id : null);
                await this.cargarDatos();
            } catch (err) {
                this.errorAccion = 'Error al eliminar el invernadero: ' + err.message;
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
        },

        textoCultivos() {
            return this.hayCultivos() ? 'Hay cultivos disponibles (' + this.totalCultivos + ')' : 'Sin cultivos registrados';
        },

        textoSensores() {
            return this.haySensores() ? 'Sensores activos: ' + this.totalSensoresActivos : 'Sin sensores activos';
        },

        textoFechaUltimaLectura() {
            if (!this.ultimaLectura) return 'Sin lecturas registradas';
            return 'Fecha: ' + (this.ultimaLectura.fecha || this.ultimaLectura.fechaHora || 'N/A');
        },

        textoSensorUltimaLectura() {
            if (!this.ultimaLectura) return '';
            return 'Sensor: ' + (this.ultimaLectura.sensor || 'N/A');
        },

        textoValorUltimaLectura() {
            if (!this.ultimaLectura) return '';
            return 'Valor: ' + (this.ultimaLectura.valor !== undefined ? this.ultimaLectura.valor : 'N/A');
        },

        tarjetasResumen() {
            return [
                { id: 'cultivos', titulo: 'Cantidad de cultivos', valor: this.totalCultivos, esLectura: false },
                { id: 'sensores', titulo: 'Sensores activos', valor: this.totalSensoresActivos, esLectura: false },
                { id: 'registros', titulo: 'Total de registros', valor: this.totalLecturas, esLectura: false },
                { id: 'lectura', titulo: 'Última lectura registrada', valor: null, esLectura: true }
            ];
        }
    };
}

function formularioInvernadero(datosIniciales = {}) {
    return {
        borrador: {
            nombre: datosIniciales.nombre || '',
            zona: datosIniciales.zona || '',
            direccion: datosIniciales.direccion || '',
            estado: datosIniciales.estado || 'Operativo'
        }
    };
}