const express = require('express');
const usuarioController = require('../Controller/usuarioController');
const validateUsuario = require('../middlewares/usuariosValidate');
const router = express.Router();


//rutas

router.get('/', usuarioController.index);
router.get('/create', usuarioController.create);
router.post('/', validateUsuario, usuarioController.store);
router.post('/login', usuarioController.login);
router.get('/:id_usuario/edit', usuarioController.edit);
router.put('/:id_usuario', validateUsuario, usuarioController.update);
router.delete('/:id_usuario', usuarioController.delete);


module.exports = router;