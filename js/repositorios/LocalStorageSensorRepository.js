/* nombre clase___extend__y el contrato  */
/* el Json es formato para escribir listas , objetos como texto
.parse pasa de texto a lsita  
stringify pasa de lista a texto */

/* leer y escribir es sacar y guardar de localStorage , el cual sesores es la lsita de texto de sensores*/

class LocalStorageSensorRepository extends SensorRepository {
    constructor() {
        super();
        this.key = 'sensores';
    }
     async escribir(sensores_lista){
        localStorage.setItem(this.key, JSON.stringify(sensores_lista));
    }

 async leer(){
        const texto = localStorage.getItem(this.key);
        if (texto) {
            return JSON.parse(texto);
        }
        return [];
    }

    /* aqui pondre lso metodos de cada contrato, como funcionara y esas cosas */
    async listar (){
        return await this.leer();
    }//saca la lista de local estorage oor e metodo leer y asi mostrar la lsta //

    async añadir (sensor_nuevo){ 
        const sensores_lista = await this.leer();
        sensor_nuevo.id= Date.now(); //date now lo q hace es un numero de fecha y hoar al id para que no se repita //
        sensores_lista.push(sensor_nuevo);//aqui se guarda en la lsita //
        await this.escribir(sensores_lista);//aqui se rempalza el local estorage con el actualizado // 
        return sensor_nuevo;
    }
    
    async eliminar(id_eliminar){
        const sensores_lista = await this.leer();
        const sensores_que_quedan  =sensores_lista.filter(sensor => sensor.id !== id_eliminar);
        /* filter lo que hace es que toma la lsita y crea una nueva agregando todo los que cumoplan con la condicion y asi el ide que se 
        se queria eliminar no se agrega y queda como eliminado */
        await this.escribir(sensores_que_quedan);
    }

    /* para sacar fulter , para modificar find , cada uno para el caso que corresponda  */
    async editar(sensor_editar){
        const sensores_lista = await this.leer();
        const sensor_a_editar =sensores_lista.find(sensor =>sensor.id === sensor_editar.id);
        sensor_a_editar.tipo= sensor_editar.tipo;
        sensor_a_editar.estado=sensor_editar.estado;
        await this.escribir(sensores_lista);
        return sensor_a_editar;


    }
}