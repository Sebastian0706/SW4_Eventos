const express = require('express');
const organizadoresController = require('../Controller/organizadoresController');
const validateOrganizadores = require('../middlewares/organizadoresValidate');
const router = express.Router();

//rutas

router.get('/', organizadoresController.index);
router.get('/create', organizadoresController.create);
router.post('/', validateOrganizadores, organizadoresController.store);
router.get('/:id', organizadoresController.show);
router.get('/:id/edit', organizadoresController.edit);
router.put('/:id', validateOrganizadores, organizadoresController.update);
router.delete('/:id', organizadoresController.delete);

module.exports = router;