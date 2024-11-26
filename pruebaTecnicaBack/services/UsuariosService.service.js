const prisma = require('../prisma/db.prisma')
const bcrypt = require('bcryptjs')
const { generateToken, generateRefreshToken } = require('../helpers/JwtHelper.helper')

class UsuariosService {
    async crearUsuario(data) {
        const salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(data.contrasena, salt);
        data.contrasena = hashed
        console.log('la data es ', data)
        return await prisma.usuarios.create({ data });
    }

    async obtenerUsuarios() {
        return await prisma.usuarios.findMany();
    }

    async obtenerTodosUsuarios() {
        const usuarios = await prisma.usuarios.findMany({
            orderBy: {
                id: 'asc',
            },
            include: {
                usuario_habilidades: {
                    include: {
                        habilidades: true,
                    },
                },
                escolaridad: true,
            },
        });
        return usuarios
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




    async iniciarSesion(data) {

        const { contrasena, correoelectronico } = data
        
        const usuarioExistente = await prisma.usuarios.findFirst({
            where: {
                correoelectronico: correoelectronico
            }
        })
        console.log('los datos de usaurios ', usuarioExistente)
        if (!usuarioExistente) {
            const error = new Error();
            error.status = 400;
            error.meta = `El correo ${correoelectronico} no existe!`
            throw error;
        }
        const validPassword = await bcrypt.compare(contrasena, usuarioExistente.contrasena);
        console.log('validar ', validPassword)
        if (validPassword) {
            const userToEnconde = {
                username: usuarioExistente.correoelectronico,
                id: usuarioExistente.id
            };
            
           
            const token = generateToken(userToEnconde);
            //refreshToken
            const refreshToken = generateRefreshToken(userToEnconde);


            return { token, refreshToken, login: usuarioExistente }
        } else {
            const error = new Error();
            error.status = 400;
            error.meta = "Password invalida!"
            throw error;
        }
    }
}

module.exports = new UsuariosService();