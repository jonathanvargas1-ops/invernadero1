class LocalStorageUsuarioRepository extends UsuarioRepository {
    constructor() {
        super();
        this.clave = 'usuarios';
    }
    async listar() {
        const guardado = localStorage.getItem(this.clave);
        let usuarios = guardado ? JSON.parse(guardado) : [];
        if (usuarios.length === 0) {
            const usuarioPrueba = {
                id: Date.now(),
                nombre: 'Admin Prueba',
                correo: 'admin@admin.com',
                clave: '1234',
                rol: 'admin'
            };
            usuarios.push(usuarioPrueba);
            localStorage.setItem(this.clave, JSON.stringify(usuarios));
        }
        
        return usuarios;
    }
    async crear(usuario) {
        const usuarios = await this.listar();
        usuario.id = Date.now();
        usuarios.push(usuario);
        localStorage.setItem(this.clave, JSON.stringify(usuarios));
        return true;
    }
}