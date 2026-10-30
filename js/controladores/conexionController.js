function conexionController() {
    return {
        en_linea: navigator.onLine,

        init() {
            window.addEventListener('online', () => {
                this.en_linea = true;
            });
            window.addEventListener('offline', () => {
                this.en_linea = false;
            });
        },

        sin_conexion() {
            return !this.en_linea;
        }
    };
}