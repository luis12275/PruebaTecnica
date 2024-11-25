const { HabilidadesService } = require('../services')

class HabilidadesController {
    async crear(req, res) {
        try {
            const habilidad = await HabilidadesService.crearHabilidad(req.body);
            res.status(201).send(habilidad);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al crear la habilidad' });
        }
    }

    async listar(req, res) {
        try {
            const habilidades = await HabilidadesService.obtenerHabilidades();
            res.send(habilidades);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al listar las habilidades' });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const habilidad = await HabilidadesService.obtenerHabilidadPorId(Number(req.params.id));
            if (!habilidad) return res.status(404).send({ error: 'Habilidad no encontrada' });
            res.send(habilidad);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al obtener la habilidad' });
        }
    }

    async actualizar(req, res) {
        try {
            const habilidad = await HabilidadesService.actualizarHabilidad(Number(req.params.id), req.body);
            res.send(habilidad);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al actualizar la habilidad' });
        }
    }

    async eliminar(req, res) {
        try {
            await HabilidadesService.eliminarHabilidad(Number(req.params.id));
            res.send({ message: 'Habilidad eliminada correctamente' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al eliminar la habilidad' });
        }
    }
}

module.exports = new HabilidadesController();
