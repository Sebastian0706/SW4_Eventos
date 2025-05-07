const express = require('express');
const usuarioController = require('../Controller/usuarioController');
const validateUsuario = require('../middlewares/usuariosValidate');
const router = express.Router();


//rutas

router.get('/', usuarioController.index);
router.get('/create', usuarioController.create);
router.post('/', validateUsuario, usuarioController.store);
router.get('/:id', usuarioController.show);
router.get('/:id/edit', usuarioController.edit);
router.put('/:id', validateUsuario, usuarioController.update);
router.delete('/:id', usuarioController.delete);

module.exports = router;