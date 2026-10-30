function filaUsuarioController(){
    return{
        confirmando:false,

        preguntar_eliminar() {
            this.confirmando = true;
        },

        cancelar_eliminar() {
            this.confirmando = false;
        },

        avisar_eliminar(id) {
            this.confirmando = false;
            this.$dispatch('eliminar-usuario', id);
        },

        avisar_editar(usuario) {
            this.$dispatch('editar-usuario', usuario);
        },
    }
}