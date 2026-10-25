function lecturacontroller(servicio){
    return {
        showError:null,
        showLoading:false,
        lista_lecturas:[],
        desde:'',
        hasta:'',
        tipo:elegido,
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
            this.showLoading= true;
            try{
                this.lista_graficos= await servicio.sensorportipo(this.tipo_elegido)
            }catch(errorparametro){
                this.showError= 'no se pudo cargar los datos del grafico'

            }{
                this.showLoading= false;
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
            return !this.showLoading && this.lista_graficos.length>0;
        },

        lista_vacia_lectura(){
            return !this.showLoading  && !this.showError && this.lista_lecturas.length=== 0;
       },

       lista_vacia_graficos(){
            return !this.showLoading  && !this.showError && this.lista_graficos.length=== 0;
       },

    





    };

}