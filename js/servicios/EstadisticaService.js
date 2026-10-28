class EstadisticaService {
    constructor(usuarioRepo, sensorRepo, cultivoRepo) {
        this.usuarioRepo = usuarioRepo;
        this.sensorRepo = sensorRepo;
        this.cultivoRepo = cultivoRepo;
    }

    async obtenerEstadisticasGlobales() {
        const usuarios = await this.usuarioRepo.listar().catch(() => []);
        const sensores = await this.sensorRepo ? await this.sensorRepo.listar().catch(() => []) : [];
        const cultivos = await this.cultivoRepo ? await this.cultivoRepo.listar().catch(() => []) : [];

        return {
            totalUsuarios: usuarios.length,
            totalSensores: sensores.length,
            totalCultivos: cultivos.length
        };
    }
}