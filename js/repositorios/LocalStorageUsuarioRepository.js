class LocalStorageUsuarioRepository extends UsuarioRepository {
    constructor() {
        super();
        this.clave = 'usuarios';
    }
}