const { Router } = require('express');
const { EscolaridadController } = require('../controllers')

const router = Router();

router.post('/escolaridad', EscolaridadController.crear);
router.get('/escolaridad', EscolaridadController.listar);
router.get('/escolaridad/:id', EscolaridadController.obtenerPorId);
router.put('/escolaridad/:id', EscolaridadController.actualizar);
router.delete('/escolaridad/:id', EscolaridadController.eliminar);

module.exports = router;
