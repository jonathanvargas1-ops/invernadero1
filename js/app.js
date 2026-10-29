const repo_sensores= new LocalStorageSensorRepository();
const service_sensores= new SensorService(repo_sensores);

document.addEventListener('alpine:init', () => {
    Alpine.data('sensores', () => sensorController(service_sensores));
Alpine.data('lecturas',() => lecturacontroller(service_lectura));
}
);



const repo_lectura= new LocalStorageLecturaRepository();
const service_lectura= new LecturaService(repo_lectura);