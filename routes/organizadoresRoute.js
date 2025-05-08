const express = require('express');
const organizadoresController = require('../Controller/organizadoresController');
const validateOrganizadores = require('../middlewares/organizadoresValidate');
const router = express.Router();

//rutas

router.get('/', organizadoresController.listarOrganizadores);
router.post('/', validateOrganizadores, organizadoresController.agregarOrganizador);
router.get('/:id/edit', organizadoresController.editarOrganizador);
router.put('/:id', validateOrganizadores, organizadoresController.actualizarOrganizador);
router.delete('/:id', organizadoresController.eliminarOrganizador);

module.exports = router;