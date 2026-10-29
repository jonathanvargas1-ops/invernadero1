class SensorService {
    constructor(sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

validar(sensor) {
    if(!sensor.tipo){
        throw new Error('El tipo de sensor es obligatorio');
    }if(!sensor.estado){
        throw new Error('El estado de sensor es obligatorio');
     }
}   

 async añadir(sensor) {
    this.validar(sensor);
    return await this.sensorRepository.añadir(sensor); 
    /* async porque adentro hay un await */ 
 }

 async listar() {
    return await this.sensorRepository.listar();
 }

 async editar (sensor) {
    this.validar(sensor);
    return await this.sensorRepository.editar(sensor);
 }

 async eliminar(id) {
    return await this.sensorRepository.eliminar(id);
 }
/* para pestaña de invernadero seccion resumen */
 async contar_activos(){
   const lista_sensores = await this.sensorRepository.listar();
   const sensores_activos= lista_sensores.filter(sensor => sensor.estado==='activo');
   return sensores_activos.length;
 }
}
