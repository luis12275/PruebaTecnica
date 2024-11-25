const { EscolaridadService } = require('../services')

class EscolaridadController {
    async crear(req, res) {
        try {
            const escolaridad = await EscolaridadService.crearEscolaridad(req.body);
            res.send(escolaridad);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async listar(req, res) {
        try {
            const escolaridades = await EscolaridadService.obtenerEscolaridades();
            res.send(escolaridades);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async obtenerPorId(req, res) {
        try {
            const escolaridad = await EscolaridadService.obtenerEscolaridadPorId(Number(req.params.id));
            res.send(escolaridad);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async actualizar(req, res) {
        try {
            const escolaridad = await EscolaridadService.actualizarEscolaridad(Number(req.params.id), req.body);
            res.send(escolaridad);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async eliminar(req, res) {
        try {
            await EscolaridadService.eliminarEscolaridad(Number(req.params.id));
            res.send({ message: 'Eliminado correctamente' });
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
}

module.exports = new EscolaridadController();
