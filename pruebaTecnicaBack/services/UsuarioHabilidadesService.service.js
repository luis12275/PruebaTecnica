const prisma = require('../prisma/db.prisma')

class UsuarioHabilidadesService {
    async agregarRelacion(data) {
        return await prisma.usuario_habilidades.create({ data });
    }

    async obtenerRelaciones() {
        return await prisma.usuario_habilidades.findMany();
    }

    async eliminarRelacion(idUsuario, idHabilidad) {
        return await prisma.usuario_habilidades.delete({
            where: {
                id_Usuario_id_Habilidad: {
                    id_Usuario: idUsuario,
                    id_Habilidad: idHabilidad
                }
            }
        });
    }
}

module.exports = new UsuarioHabilidadesService();