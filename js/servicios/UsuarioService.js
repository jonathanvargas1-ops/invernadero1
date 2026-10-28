class UsuarioService {
    constructor(repositorio) {
        this.repo = repositorio;
    }

    async listarUsuarios() {
        return await this.repo.listar();
    }

    async crearUsuario(nuevoUsuario) {
        const usuarios = await this.repo.listar();
        
        const existe = usuarios.find(u => u.correo === nuevoUsuario.correo);
        if (existe) {
            throw new Error('El correo ya está registrado.');
        }
        return await this.repo.crear(nuevoUsuario);
    }

    async eliminarUsuario(id) {
        return await this.repo.eliminar(id);
    }

   async login(correo, clave) {
        const usuarios = await this.repo.listar();
        const usuario = usuarios.find(u => u.correo === correo && u.clave === clave);
        if (!usuario) {
            throw new Error('Correo o contraseña incorrectos.');
        }
        return usuario;
    }
}