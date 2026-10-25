function sensorController(servicio){
    /*dentro del return estara las funciones de la pantalla, osea todo lo que necesita para funcionar */
    return{
/* hay que partir con el estado de la pantalla base , como esta  */

        lista_sensores:[],
        showError:null,
        showLoading :false,
        formulario_sensor :{tipo:'', estado:'activo'},
        id_editado:null,
        async cargar_sensores(){
            this .showLoading =true;
            this.showError=null;

            try{    
            /* el try es para manejar errores en la solicitud, y el catch es pars pone el msj de error */

                this.lista_sensores = await servicio.listar();
            } catch(errorparametro){
                this.showError= 'no se pudo cargar la lista de sensores';
            } 
            {
                this.showLoading =false;
            }
        },

        async init(){
            await this.cargar_sensores();
        },
        
        async añadir_sensor(){
            this.showError=null;
            this.showLoading  = true ;
            try{
                await servicio.añadir(this.formulario_sensor);
                this.formulario_sensor= {tipo: '', estado: 'activo' };/* limpia el formulario */
                await this.cargar_sensores();/* trae la lista actualizada */
            }catch(errorparametro){
                this.showError= errorparametro.message;/* .message es una proíeda de error por eso esta escrito de de esa forma */
            }
            {
            this.showLoading =false;
        }
        },
        async eliminar_sensor(id){/* id es un parametro externo y por esa razon lo puse aqui y tambien abajo  */
            this.showError= null;
            this.showLoading =true;
            try{
                await servicio.eliminar(id);
                await this.cargar_sensores();
            }catch(errorparametro){
                this.showError= 'no se pudo eliminar';
            }
            {
                this.showLoading =false;
            }
        },

        async se_empieza_edicion(sensor){
            this.id_editado=sensor.id;
            this.formulario_sensor={tipo:sensor.tipo,estado:sensor.estado};
        },

    async se_guarda_edicion(){
            this.showLoading =true;
            this.showError=null;

            try{
    await servicio.editar({id:this.id_editado, tipo: this.formulario_sensor.tipo, estado:this.formulario_sensor.estado});

    this.formulario_sensor={tipo:'',estado:'activo'};
    this.id_editado=null;
    await this.cargar_sensores();

            }catch(errorparametro){
        this.showError=errorparametro.message;
    }
    {
        this.showLoading = false;
    }


            },

            async enviar_formulario(){                         
            if (this.id_editado === null) {                 
                
                await this.añadir_sensor();     
                
           } else {                                        
                await this.se_guarda_edicion();            
            }
        },

        cancelar_edicion(){                                 
            this.formulario_sensor = { tipo: '', estado: 'activo' };
            this.id_editado = null;
        },

        titulo_formulario(){                                
            if (this.id_editado === null) {
                return '¿Agregar sensor?';
            }
            return 'Editar sensor';
        },
        hay_sensores() {
    return !this.showLoading && this.lista_sensores.length > 0;
}
    }
}

