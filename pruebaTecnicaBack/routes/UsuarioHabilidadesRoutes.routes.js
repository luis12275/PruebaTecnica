const { Router } = require('express');
const { UsuarioHabilidadesController } = require('../controllers')

const router = Router();

router.post('/usuario-habilidades', UsuarioHabilidadesController.crearRelacion);
router.get('/usuario-habilidades', UsuarioHabilidadesController.listarRelaciones);
router.delete('/usuario-habilidades/:idUsuario/:idHabilidad', UsuarioHabilidadesController.eliminarRelacion);

module.exports = router;