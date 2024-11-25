const { UsuarioHabilidadesService } = require('../services')

class UsuarioHabilidadesController {
    async crearRelacion(req, res) {
        try {
            const relacion = await UsuarioHabilidadesService.agregarRelacion(req.body);
            res.status(201).send(relacion);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al crear la relación' });
        }
    }

    async listarRelaciones(req, res) {
        try {
            const relaciones = await UsuarioHabilidadesService.obtenerRelaciones();
            res.send(relaciones);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al listar las relaciones' });
        }
    }

    async eliminarRelacion(req, res) {
        try {
            const { idUsuario, idHabilidad } = req.params;
            await UsuarioHabilidadesService.eliminarRelacion(Number(idUsuario), Number(idHabilidad));
            res.send({ message: 'Relación eliminada correctamente' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al eliminar la relación' });
        }
    }
}

module.exports = new UsuarioHabilidadesController();
