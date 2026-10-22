class LecturaService{
   contructor(lecturaRepository){
     this.lecturaRepository = lecturaRepository;
   } 
   async sensorportipo(sensor){
    const lecturas = await this.lecturaRepository.listar();
    return lecturas.filter(lectura => lectura.sensor === sensor);
   }

   
   async sensorporfecha(fecha){
    
   }

}