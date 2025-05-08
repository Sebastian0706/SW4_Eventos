const express = require('express');
const rolesController = require('../Controller/rolesController');
const validateRoles = require('../middlewares/rolesValidate');
const router = express.Router();

//rutas

router.get('/', rolesController.listarRoles);
router.post('/', validateRoles, rolesController.agregarRol);
router.get('/:id', rolesController.editarRol);
router.put('/:id', validateRoles, rolesController.actualizarRol);
router.delete('/:id', rolesController.eliminarRol);

module.exports = router;