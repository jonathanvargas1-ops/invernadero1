class LecturaService{
   constructor(lecturaRepository_app){
     this.lecturaRepository = lecturaRepository_app;/* se guarda el repositorio que manda la app.js */
   } 
   async sensorportipo(tipo){
    const lecturas = await this.lecturaRepository.listar();/*  */
    return lecturas.filter(lectura => lectura.sensor === tipo);
   }


   async sensorporfecha(desde , hasta ){
    if(!desde || !hasta){
        throw new Error('Debe ingresar una fecha de inicio y una fecha de fin');
    }
    if(desde<= hasta){
        const lecturas = await this.lecturaRepository.listar();
        return lecturas.filter(lectura =>lectura.fecha >= desde && lectura.fecha <= hasta);
    } else {
        throw new Error('la fecha de inicio debe ser menor a la fecha de fin');
    }
  } 
  async listar (){
    return await this.lecturaRepository.listar();
  }
  /* para seccion e invernadero resumen  */
  async ultima_lectura(){
    const lista_lecturas= await this.lecturaRepository.listar();
    if(lista_lecturas.length=== 0){
      return null;
    }
    let ultimo = lista_lecturas[0];
    for(const lectura of lista_lecturas){
      if(lectura.fecha  > ultimo.fecha){
        ultimo = lectura;
      }
    }return ultimo;

  }
  async total_registro(){
    const lista_lecturas= await this.lecturaRepository.listar();
    return lista_lecturas.length;
  }

   }   

