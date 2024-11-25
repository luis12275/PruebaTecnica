const prisma = require('../prisma/db.prisma')

class HabilidadesService {
    async crearHabilidad(data) {
        return await prisma.habilidades.create({ data });
    }

    async obtenerHabilidades() {
        return await prisma.habilidades.findMany();
    }

    async obtenerHabilidadPorId(id) {
        return await prisma.habilidades.findUnique({ where: { id } });
    }

    async actualizarHabilidad(id, data) {
        return await prisma.habilidades.update({ where: { id }, data });
    }

    async eliminarHabilidad(id) {
        return await prisma.habilidades.delete({ where: { id } });
    }
}

module.exports = new HabilidadesService();
