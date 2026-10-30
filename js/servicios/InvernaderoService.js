class InvernaderoService {
    constructor(invernaderoRepository) {
        this.repository = invernaderoRepository;
    }

    async obtenerInvernaderoPrincipal() {
        const lista = await this.repository.listar();
        if (!lista || lista.length === 0) {
            return null;
        }
        return lista[0];
    }

    async crearInvernadero(datos) {
        if (!datos) {
            throw new Error('Los datos del invernadero no son válidos.');
        }
        if (!datos.nombre || !datos.nombre.trim()) {
            throw new Error('El nombre del invernadero es obligatorio.');
        }
        if (!datos.zona || !datos.zona.trim()) {
            throw new Error('La zona del invernadero es obligatoria.');
        }
        if (!datos.direccion || !datos.direccion.trim()) {
            throw new Error('La dirección del invernadero es obligatoria.');
        }
        return await this.repository.crear({
            nombre: datos.nombre.trim(),
            zona: datos.zona.trim(),
            direccion: datos.direccion.trim(),
            estado: datos.estado ? datos.estado.trim() : 'Operativo'
        });
    }

    async editarInvernadero(datos) {
        if (!datos || !datos.id) {
            throw new Error('Identificador de invernadero no válido.');
        }
        if (!datos.nombre || !datos.nombre.trim()) {
            throw new Error('El nombre del invernadero es obligatorio.');
        }
        if (!datos.zona || !datos.zona.trim()) {
            throw new Error('La zona del invernadero es obligatoria.');
        }
        if (!datos.direccion || !datos.direccion.trim()) {
            throw new Error('La dirección del invernadero es obligatoria.');
        }
        return await this.repository.editar({
            id: Number(datos.id),
            nombre: datos.nombre.trim(),
            zona: datos.zona.trim(),
            direccion: datos.direccion.trim(),
            estado: datos.estado ? datos.estado.trim() : 'Operativo'
        });
    }

    async eliminarInvernadero(id) {
        if (!id) {
            throw new Error('Identificador de invernadero no válido.');
        }
        return await this.repository.eliminar(id);
    }
}






