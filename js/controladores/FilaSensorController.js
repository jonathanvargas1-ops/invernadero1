function filaSensorController(){
    return{
confirmando:false,

preguntar_eliminar(){
    this.confirmando=true;
},
cancelar_eliminar(){
    this.confirmando=false; 
},
avisar_eliminar(id){
    this.confirmando=false;
    this.$dispatch('pedir-eliminar',{id:id});

},
avisar_editar(sensor){
    this.$dispatch('pedir-editar', { sensor: sensor });

},
    };
}