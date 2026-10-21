/* nombre clase___extend__y el contrato  */
/* el Json es formato para escribir listas , objetos como texto
.parse pasa de texto a lsita  
stringify pasa de lista a texto */

/* leer y escribir es sacar y guardar  */

class LocalStorageSensorRepository extends SensorRepository {
    constructor() {
        super();
        this.key = 'sensores';
    }
     async escribir(sensores){
        localStorage.setItem(this.key, JSON.stringify(sensores));
    }
    
 async leer(){
        const texto = localStorage.getItem(this.key);
        if (texto) {
            return JSON.parse(texto);
        }
        return [];
    }
   
}