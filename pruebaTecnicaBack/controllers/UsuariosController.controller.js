const { UsuarioService } = require('../services')
const multer = require('multer');
const {aws} = require('../helpers/index')

const upload = multer({
    storage: multer.memoryStorage(), // Utilizamos memoria para almacenar temporalmente
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de tamaño de archivo (por ejemplo, 10MB)
  });
class UsuariosController {
    
    async crear(req, res) {
        try {
            const usuario = await UsuarioService.crearUsuario(req.body);
            res.status(201).send(usuario);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al crear el usuario' });
        }
    }

    async listar(req, res) {
        try {
            const usuarios = await UsuarioService.obtenerUsuarios();
            res.send(usuarios);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al listar los usuarios' });
        }
    }
    async obtenerTodosUsuarios(req, res) {
        try {
            const usuarios = await UsuarioService.obtenerTodosUsuarios();
            res.send(usuarios);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al listar los usuarios' });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const usuario = await UsuarioService.obtenerUsuarioPorId(Number(req.params.id));
            if (!usuario) return res.status(404).send({ error: 'Usuario no encontrado' });
            res.send(usuario);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al obtener el usuario' });
        }
    }

    async actualizar(req, res) {
        try {
            const usuario = await UsuarioService.actualizarUsuario(Number(req.params.id), req.body);
            res.send(usuario);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al actualizar el usuario' });
        }
    }

    async eliminar(req, res) {
        try {
            await UsuarioService.eliminarUsuario(Number(req.params.id));
            res.send({ message: 'Usuario eliminado correctamente' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al eliminar el usuario' });
        }
    }

    async uploadImage (req, res) {
        try {
          const file = req.file; 
          if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }
      
          // Llamamos al servicio para subir la imagen al bucket
          const result = await aws.uploadImage(file);
          res.status(200).json({ message: 'Image uploaded successfully', url: result.Location });
        } catch (error) {
          res.status(500).json({ error: 'Failed to upload image', details: error.message });
        }
      };

      async iniciarSesion(req, res) {
        try {
            const result = await UsuarioService.iniciarSesion(req.body)
            return res.send({data: result})
        } catch (error) {
            console.log("ERROR", error)
            //enviarError(res,error)
        }
    }
    
}

module.exports = new UsuariosController();
