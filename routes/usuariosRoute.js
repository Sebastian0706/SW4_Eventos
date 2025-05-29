const express = require('express');
const router = express.Router();
const usuariosController = require('../Controller/usuarioController');
const validateUsuario = require('../middlewares/usuariosValidate');

router.get('/', usuariosController.index);
router.get('/create', usuariosController.create);
router.post('/', validateUsuario, usuariosController.store);
router.get('/:id_usuario/edit', usuariosController.edit);
router.put('/:id_usuario', validateUsuario, usuariosController.update);
router.delete('/:id_usuario', usuariosController.delete);
router.get('/:id_usuario', usuariosController.show);  

module.exports = router;
