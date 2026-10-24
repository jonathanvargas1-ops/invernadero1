function sensorController(servicio){
    /*dentro del return estara las funciones de la pantalla, osea todo lo que necesita para funcionar */
    return{
/* hay que partir con el estado de la pantalla base , como esta  */

        lista_sensores:[],
        error:null,
        cargando:false,
        formulario_sensor :{tipo:'', estado:'activo'},
        async cargar_sensores(){
            this .cargando=true;
            this.error=null;

            try{    
            /* el try es para manejar errores en la solicitud, y el catch es pars pone el msj de error */

                this.lista_sensores = await servicio.listar();
            } catch(errorparametro){
                this.error= 'no se pudo cargar la lista de sensores';
            } finally{
                this.cargando=false;
            }
        },

        async init(){
            await this.cargar_sensores();
        },
        
        async añadir_sensor(){
            this.error=null;
            this.cargando = true ;
            try{
                await servicio.añadir(this.formulario_sensor);
                this.formulario_sensor= {tipo: '', estado: 'activo' };/* limpia el formulario */
                await this.cargar_sensores();/* trae la lista actualizada */
            }catch(errorparametro){
                this.error= errorparametro.message;
            }finally {
            this.cargando=false;
        }
        },
        async aliminar_sensor(id){
            this.error= null;
            this.cargando=false;
            try{
                await servicio.eliminar(id);
            }catch(errorparametro){
                this.error= 'no se pudo eliminar';
            }finally{
                this.cargando=false;
            }
        }
        };
}