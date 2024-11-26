const { Router } = require('express');
const { UsuarioController  } = require('../controllers')
const upload = require('../middleware/multerConfig');
const router = Router();

router.post('/usuarios', UsuarioController.crear);
router.get('/usuarios', UsuarioController.listar);
router.get('/usuarios/:id', UsuarioController.obtenerPorId)
router.put('/usuarios/:id', UsuarioController.actualizar);
router.delete('/usuarios/:id', UsuarioController.eliminar);

router.get('/ObtenerTodosUsuarios', UsuarioController.obtenerTodosUsuarios);


router.post('/upload', upload.single('image'), UsuarioController.uploadImage);
router.post("/iniciarSesion", UsuarioController.iniciarSesion)

module.exports = router;