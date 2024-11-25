const prisma = require('../prisma/db.prisma')

class EscolaridadService {
    async crearEscolaridad(data) {
        return await prisma.escolaridad.create({ data });
    }

    async obtenerEscolaridades() {
        return await prisma.escolaridad.findMany();
    }

    async obtenerEscolaridadPorId(id) {
        return await prisma.escolaridad.findUnique({ where: { id } });
    }

    async actualizarEscolaridad(id, data) {
        return await prisma.escolaridad.update({ where: { id }, data });
    }

    async eliminarEscolaridad(id) {
        return await prisma.escolaridad.delete({ where: { id } });
    }
}

module.exports = new EscolaridadService();
