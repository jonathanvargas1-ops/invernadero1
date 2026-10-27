class CultivoService {
    constructor(cultivoRepository) {
        this.cultivoRepository = cultivoRepository;
    }
    
    async obtenerTodos() {
        return await this.cultivoRepository.obtenerTodos();
    }

    async obtenerCultivoPorId(id) {
        if (!id) {
            throw new Error('El ID del cultivo  no es valido');
        }
        return await this.cultivoRepository.obtenerPorId(id);
    }
    async obtenerCultivos(filtro ='') {
        const todos = await this.cultivoRepository.obtenerTodos();
        if (!filtro || filtro.trim() === '') {
            return todos;
        }
        const termino = filtro.trim().toLowerCase();
        return todos.filter(cultivo => cultivo.nombre.toLowerCase().includes(termino) || cultivo.tipo && cultivo.tipo.toLowerCase().includes(termino) || cultivo.estado && cultivo.estado.toLowerCase().includes(termino));
    }

    async crearCultivo(datosCultivo) {
        if (!datosCultivo || !datosCultivo.nombre || !datosCultivo.tipo || !datosCultivo.estado || datosCultivo.nombre.trim() === '' || datosCultivo.tipo.trim() === '' || datosCultivo.estado.trim() === '') {
            throw new Error('Los datos del cultivo no son validos');
        }
        return await this.cultivoRepository.crear({
            nombre: datosCultivo.nombre.trim(),
            tipo: datosCultivo.tipo.trim(),
            estado: datosCultivo.estado.trim()
        });
    }
    async actualizarCultivo(datosCultivo) {
        if (!datosCultivo || !datosCultivo.id) {
            throw new Error('El ID del cultivo no es valido');
        }
        if (!datosCultivo.nombre || !datosCultivo.tipo || !datosCultivo.estado || datosCultivo.nombre.trim() === '' || datosCultivo.tipo.trim() === '' || datosCultivo.estado.trim() === '') {
            throw new Error('Los datos del cultivo no son validos');
        }
        return await this.cultivoRepository.actualizar({
            id: Number(datosCultivo.id),
            nombre: datosCultivo.nombre.trim(),
            tipo: datosCultivo.tipo.trim(),
            estado: datosCultivo.estado.trim()
        });
    }
    async eliminarCultivo(id) {
        if (!id) {
            throw new Error('El ID del cultivo no es valido');
        }
        return await this.cultivoRepository.eliminar(id);
    }
}