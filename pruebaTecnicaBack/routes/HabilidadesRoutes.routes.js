const { Router } = require('express');
const { HabilidadesController } = require('../controllers')

const router = Router();

router.post('/habilidades', HabilidadesController.crear); 
router.get('/habilidades', HabilidadesController.listar); 
router.get('/habilidades/:id', HabilidadesController.obtenerPorId);
router.put('/habilidades/:id', HabilidadesController.actualizar);
router.delete('/habilidades/:id', HabilidadesController.eliminar);

module.exports = router;