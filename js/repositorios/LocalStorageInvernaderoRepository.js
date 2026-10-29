class LocalStorageInvernaderoRepository extends InvernaderoRepository {
    constructor () {
        super();
        this.clave = 'invernaderos';
    }
    async _asegurarInicializacion() {
        const guardado = localStorage.getItem(this.clave);
        if (!guardado) {
            const ejemplos = [{
                id: 1,
                nombre: 'Invernadero',
                zona: 'Zona Central',
                direccion: 'Av. Las Palmas 123',
                estado: 'Operativo'
            }
          ];
          localStorage.setItem(this.clave, JSON.stringify(ejemplos));
    }
}

async listar() {
    await this._asegurarInicializacion();
    const guardado = localStorage.getItem(this.clave);
    return guardado ? JSON.parse(guardado) : [];
}
async crear(invernadero) {
    const todos = await this.listar();
    const nuevo = {
        id: Date.now(),
        nombre: invernadero.nombre,
        zona: invernadero.zona,
        direccion: invernadero.direccion,
        estado: invernadero.estado || 'Operativo'
    };
    todos.push(nuevo);
    localStorage.setItem(this.clave, JSON.stringify(todos));
    return nuevo;
}
async editar(invernadero) {
    const todos = await this.listar();
    const index = todos.findIndex(i => i.id === Number(invernadero.id));
    if (index===-1){
        throw new Error('El invernadero a editar no existe.');
    }
    todos[index] = { ...todos[index], ...invernadero };
    localStorage.setItem(this.clave, JSON.stringify(todos));
    return todos[index];
}
async eliminar(id) {
    const todos = await this.listar();
    const filtrados = todos.filter(i => i.id !== Number(id));
    localStorage.setItem(this.clave, JSON.stringify(filtrados));
    return true;
}

}