function lecturacontroller(servicio){
    return {
        showError:null,
        showLoading:false,
        showLoading_grafico:false,
        lista_lecturas:[],
        desde:'',
        hasta:'',
        tipo_elegido:'Temperatura',
        lista_graficos:[],

        async cargar_lectura(){
            this.showError=null;
            this.showLoading= true;
            try{
                this.lista_lecturas= await servicio.listar();
            }catch(errorparametro){
                this.showError= 'no se pudo cargar los datos de registro'

            }{
                this.showLoading= false;
            }
        },

        async cargar_graficos(){
             this.showError=null;
            this.showLoading_grafico= true;
            try{
                this.lista_graficos= await servicio.sensorportipo(this.tipo_elegido)
            }catch(errorparametro){
                this.showError= 'no se pudo cargar los datos del grafico'

            }{
                this.showLoading_grafico= false;
            }


        },

        async init(){
            await this.cargar_graficos();
            await this.cargar_lectura();
           
        },

        hay_lecturas(){
            return !this.showLoading && this.lista_lecturas.length>0;

        },
        hay_grafico(){
            return !this.showLoading_grafico && this.lista_graficos.length>0;
        },

        lista_vacia_lectura(){
            return !this.showLoading  && !this.showError && this.lista_lecturas.length=== 0;
       },

       lista_vacia_graficos(){
            return !this.showLoading_grafico  && !this.showError && this.lista_graficos.length=== 0;
       },

       async filtrar(){
        this.showError=null;
        this.showLoading=true;
        try{
            this.lista_lecturas= await servicio.sensorporfecha(this.desde, this.hasta);
            
        }catch(errorparametro){
            this.showError=errorparametro.message;

        }{
            this.showLoading=false;
        }
    },
    async limpiar_filtro(){
        this.desde='';
        this.hasta='';
        await this.cargar_lectura();
    },



       };

    
    }