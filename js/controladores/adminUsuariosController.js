document.addEventListener('alpine:init', () => {
    Alpine.data('adminUsuarios', () => ({
        usuarios: [],
        cargando: false,
        error: null,
        nuevoUsuario: {
            nombre: '',
            correo: '',
            clave: '',
            rol: 'usuario'
        },
        async init() {
            await this.cargarUsuarios();
        },

        async cargarUsuarios() {
            this.cargando = true;
            this.error = null;
            try {
                this.usuarios = await window.usuarioService.listarUsuarios();
            } catch (err) {
                this.error = 'No se pudieron cargar los usuarios.';
            } finally {
                this.cargando = false;
            }
        },

        async agregar() {
            try {
                this.error = null;
                await window.usuarioService.crearUsuario(this.nuevoUsuario);
              
                this.nuevoUsuario = { nombre: '', correo: '', clave: '', rol: 'usuario' };
               
                await this.cargarUsuarios();
            } catch (err) {
                this.error = err.message;
            }
        },

        async eliminar(id) {
            try {
                this.error = null;
                await window.usuarioService.eliminarUsuario(id);
                await this.cargarUsuarios();
            } catch (err) {
                this.error = 'No se pudo eliminar el usuario.';
            }
        }
    }));
});