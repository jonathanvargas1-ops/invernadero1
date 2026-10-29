function invernaderoController(invernaderoService, cultivoService = null, sensorService = null) {
    return {
        invernadero: null,
        cargando: false,
        error: null,
        editando: false,
        borrador: {},
        totalCultivos: 0,
        totalSensores: 0,
        async init(){
            await this.cargarDatos();
        },
        async cargarDatos() {
            this.cargando = true;
            this.error = null;
            try {
                const datos = await invernaderoService.obtenerInvernaderoPrincipal();
                this.invernadero = Array.isArray(datos) ? datos[0] : datos;
                if (cultivoService && typeof cultivoService.obtenerCultivos === 'function') {
                    const listaCultivos = await cultivoService.obtenerCultivos();
                    this.totalCultivos = listaCultivos ? listaCultivos.length : 0;
            }
            if (sensorService && typeof sensorService.obtenerSensores === 'function') {
                const listaSensores = await sensorService.obtenerSensores();
                this.totalSensores = listaSensores ? listaSensores.length : 0;
            }
        }
        catch (err) {
            this.error = err.message || 'Error al cargar la información del invernadero.';
        }
        finally {
            this.cargando = false;
        }
    },
    iniciarEdicion() {
        if (!this.invernadero) return;
        this.borrador = { ...this.invernadero };
        this.editando = true;
        },
        cancelarEdicion() {
            this.editando = false;
            this.borrador = {};
        },
    async guardarEdicion() {
        this.error = null;
        try {
            await invernaderoService.editarInvernadero(this.borrador);
            this.editando = false;
            await this.cargarDatos();
        }
        catch (err){
            this.error = 'Error al guardar los cambios: ' + err.message;
        }
    }
 };
}
