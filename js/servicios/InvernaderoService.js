class InvernaderoService {
    constructor(invernaderoRepository) {
        this.invernaderoRepository = invernaderoRepository;
    }
    async obtenerInvernaderos(){
        return await this.invernaderoRepository.listar();
    }
    async obtenerInvernaderoPrincipal() {
        const lista = await this.invernaderoRepository.listar();
        if (!lista || lista.length === 0) {
            throw new Error('No hay datos del invernadero registrados.');
        }
        return lista;
    }
    async crearInvernadero(datos) {
        if (!datos || !datos.nombre || !datos.nombre.trim()) {
            throw new Error('El nombre del invernadero es obligatorio.');
    }
        if (!datos.zona || !datos.zona.trim()) {
            throw new Error('La zona del invernadero es obligatoria.');
    }
        if (!datos.direccion || !datos.direccion.trim()) {
            throw new Error('La dirección del invernadero es obligatoria.');
    }
        return await this.invernaderoRepository.crear({
            nombre: datos.nombre.trim(),
            zona: datos.zona.trim(),
            direccion: datos.direccion.trim(),
            estado: datos.estado ? datos.estado.trim() : 'Operativo'
        });
    }
    async editarInvernadero(datos){
        if (!datos || !datos.id) {
            throw new Error('Identificador de invernadero no válido.');
        }
        if (!datos.nombre || !datos.nombre.trim()) {
            throw new Error('El nombre del invernadero no puede estar vacío.');
    }
        return await this.invernaderoRepository.editar({
            id: Number(datos.id),
            nombre: datos.nombre.trim(),
            zona: datos.zona ? datos.zona.trim() : '',
            direccion: datos.direccion ? datos.direccion.trim() : '',
            estado: datos.estado ? datos.estado.trim() : 'Operativo'
        });
    }    
    async eliminarInvernadero(id){
        if(!id) {
            throw new Error('Identificador de invernadero no válido.');
        }
        return await this.invernaderoRepository.eliminar(id);
    }
}






