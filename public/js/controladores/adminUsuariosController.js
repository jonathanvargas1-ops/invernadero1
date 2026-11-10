function adminUsuariosController(usuarioService) {
    return {
        usuarios: [],
        showLoading: false,  
        showError: null,     
        nuevoUsuario: {
            nombre: '',
            correo: '',
            clave: '',
            rol: 'usuario',
           
        },
         id_editado: null,

       lista_vacia() {
    return !this.showLoading && this.usuarios.length === 0;
},
hay_usuarios() {
    return !this.showLoading && this.usuarios.length > 0;
},
        async init() {
            await this.cargarUsuarios();
        },

        async cargarUsuarios() {
            this.showLoading = true;
            this.showError = null;
            try {
                this.usuarios = await usuarioService.listarUsuarios();
            } catch (err) {
                this.showError = 'No se pudieron cargar los usuarios.';
            } 
            this.showLoading = false;
        },

        async agregar() {
            try {
                this.showError = null;
                await usuarioService.crearUsuario(this.nuevoUsuario);
                this.nuevoUsuario = { nombre: '', correo: '', clave: '', rol: 'usuario' };
                await this.cargarUsuarios();
            } catch (err) {
                this.showError = err.message;
            }
        },


        async eliminar(id) {
            try {
                this.showError = null;
                await usuarioService.eliminarUsuario(id);
                await this.cargarUsuarios();
            } catch (err) {
                this.showError = 'No se pudo eliminar el usuario.';
            }
        },





se_empieza_edicion(usuario) {
            this.id_editado = usuario.id;
            this.nuevoUsuario = {
                nombre: usuario.nombre,
                correo: usuario.correo,
                clave: usuario.clave,
                rol: usuario.rol
            };
        },

        async se_guarda_edicion() {
            this.showLoading = true;
            this.showError = null;
            try {
                await usuarioService.editarUsuario({
                    id: this.id_editado,
                    nombre: this.nuevoUsuario.nombre,
                    correo: this.nuevoUsuario.correo,
                    clave: this.nuevoUsuario.clave,
                    rol: this.nuevoUsuario.rol
                });
               this.nuevoUsuario = { nombre: '', correo: '', clave: '', rol: 'usuario' };     
                this.id_editado = null;
                await this.cargarUsuarios();
            } catch (err) {
                this.showError = err.message;
            }
            this.showLoading = false;
        },

        async enviar_formulario() {
            if (this.id_editado === null) {
                await this.agregar();
            } else {
                await this.se_guarda_edicion();
            }
        },

        cancelar_edicion() {
            this.nuevoUsuario = { nombre: '', correo: '', clave: '', rol: 'usuario' };
            this.id_editado = null;
        },

        esta_editando() {
            return this.id_editado !== null;
        },

        titulo_formulario() {
            if (this.id_editado === null) {
                return 'Agregar usuario';
            }
            return 'Editar cambios ';
        },

      texto_boton() {
    if (this.id_editado === null) {
        return 'Agregar usuario';
    }
    return 'Guardar cambios';
},

};
}