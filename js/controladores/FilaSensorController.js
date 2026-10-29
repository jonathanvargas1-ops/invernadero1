function sensorcontroller(servicio){
    return{
confirmado:false,

preguntar_eliminar(){
    this.confirmado=true;
},
cancelar_eliminar(){
    this.confirmado=false; 
},
    };
}