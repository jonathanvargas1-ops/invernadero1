class EstadisticaService {
    constructor(usuarioRepo, sensorRepo, cultivoRepo) {
        this.usuarioRepo = usuarioRepo;
        this.sensorRepo = sensorRepo;
        this.cultivoRepo = cultivoRepo;
    }

    async obtenerEstadisticasGlobales() {
        const usuarios = await this.usuarioRepo.listar().catch(() => []);
        const sensores = this.sensorRepo ? await this.sensorRepo.listar().catch(() => []) : [];

        let cultivos = [];
        if (this.cultivoRepo) {
            try {
                if (typeof this.cultivoRepo.obtenerTodos === 'function') {
                    cultivos = await this.cultivoRepo.obtenerTodos();
                } else if (typeof this.cultivoRepo.listar === 'function') {
                    cultivos = await this.cultivoRepo.listar();
                }
            } catch (err) {
                cultivos = [];
            }
        }

        return {
            totalUsuarios: usuarios.length,
            totalSensores: sensores.length,
            totalCultivos: cultivos.length
        };
    }
}