function adminUsuariosController(usuarioService) {
    return {
        usuarios: [],
        showLoading: false,  
        showError: null,     
        nuevoUsuario: {
            nombre: '',
            correo: '',
            clave: '',
            rol: 'usuario'
        },

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

        async editar(usuario) {
            try {
                this.showError = null;
                await usuarioService.editarUsuario(usuario);
                await this.cargarUsuarios();
            } catch (err) {
                this.showError = 'No se pudo editar el usuario.';
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
        }
    };
}