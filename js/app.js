const repo_sensores= new LocalStorageSensorRepository();
const service_sensores= new SensorService(repo_sensores);
document.addEventListener('alpine:init', () => {
    Alpine.data('sensores', () => sensorController(service_sensores));
});