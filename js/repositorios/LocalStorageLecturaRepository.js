class LocalStorageLecturaRepository extends LecturaRepository {
    constructor() {
        super();
        this.key = 'lecturas';

        /* no se si colocar esto, preguntar a profe , ejemplo a manos ya q los datos
        deberian de llegar de snsor , pero como no hay reales , se deberia de hacer a mano y 
        con botn de añadir y agregar formulario y esas cosas  */
        this.ejemplos = [
            { id: 1,  fecha: '2026-10-19', sensor: 'Temperatura', valor: 22 },
            { id: 2,  fecha: '2026-10-20', sensor: 'Temperatura', valor: 26 },
            { id: 3,  fecha: '2026-10-21', sensor: 'Temperatura', valor: 28 },
            { id: 4,  fecha: '2026-10-22', sensor: 'Temperatura', valor: 25 },
            { id: 5,  fecha: '2026-10-23', sensor: 'Temperatura', valor: 30 },
            { id: 6,  fecha: '2026-10-24', sensor: 'Temperatura', valor: 27 },
            { id: 7,  fecha: '2026-10-25', sensor: 'Temperatura', valor: 23 },
            { id: 8,  fecha: '2026-10-19', sensor: 'Humedad', valor: 65 },
            { id: 9,  fecha: '2026-10-19', sensor: 'Luz', valor: 820 },
            { id: 10, fecha: '2026-10-19', sensor: 'CO2', valor: 410 }
        ];

    }

    async escribir(lecturas_lista){
        localStorage.setItem(this.key, JSON.stringify(lecturas_lista));
    }
    async leer(){
        const texto = localStorage.getItem(this.key); 
        if(texto){
    return JSON.parse(texto);
        }
        return [];      
    
    }

    async listar(){
        const lecturas_lista = await this.leer();
        if(lecturas_lista.length === 0){
            await this.escribir(this.ejemplos);
        }
        return await this.leer();
    }   


}