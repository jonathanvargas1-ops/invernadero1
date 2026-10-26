class LocalStorageCultivoRepository {
    constructor() {
        super();
        this.clave = 'cultivos';
        this._inicializar();
    }

    _inicializar() {
        const guardado = localStorage.getItem(this.clave);
        if (!guardado) {
            const ejemplos = [
                { id: 1, nombre: 'Tomate', tipo: 'Vegetal', estado: 'Activo' },
                { id: 2, nombre: 'Papa', tipo: 'Tuberculo', estado: 'Inactivo' }
            ];
            localStorage.setItem(this.clave, JSON.stringify(ejemplos));
        }
    }
    async obtenerTodos() {
        const guardado = localStorage.getItem(this.clave);
        return guardado ? JSON.parse(guardado) : [];
    }

    async obtenerPorId(id) {
        const todos = await this.obtenerTodos();
        return todos.find(cultivo => cultivo.id === id);
    }

    async crear(cultivo) {
        const todos = await this.obtenerTodos();
        const nuevo = {
            id: date.now(),
            nombre: cultivo.nombre,
            tipo: cultivo.tipo,
            estado: cultivo.estado
        };
        todos.push(nuevo);
        localStorage.setItem(this.clave, JSON.stringify(todos));
        return nuevo;
    }
    
}
