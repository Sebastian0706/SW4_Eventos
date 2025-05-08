const express = require('express');
const usuarioController = require('../Controller/usuarioController');
const validateUsuario = require('../middlewares/usuariosValidate');
const router = express.Router();


//rutas

router.get('/', usuarioController.listarUsuarios); 
router.post('/', validateUsuario, usuarioController.agregarUsuario); 
router.get('/:id', usuarioController.editarUsuario);
router.put('/:id', validateUsuario, usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario); 

module.exports = router;