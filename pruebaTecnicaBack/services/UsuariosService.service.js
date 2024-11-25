const prisma = require('../prisma/db.prisma')

class UsuariosService {
    async crearUsuario(data) {
        return await prisma.usuarios.create({ data });
    }

    async obtenerUsuarios() {
        return await prisma.usuarios.findMany();
    }

    async obtenerUsuarioPorId(id) {
        return await prisma.usuarios.findUnique({ where: { id } });
    }

    async actualizarUsuario(id, data) {
        return await prisma.usuarios.update({ where: { id }, data });
    }

    async eliminarUsuario(id) {
        return await prisma.usuarios.delete({ where: { id } });
    }
}

module.exports = new UsuariosService();