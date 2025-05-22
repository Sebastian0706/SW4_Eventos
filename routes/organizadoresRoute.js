const express = require('express');
const router = express.Router();
const organizadoresController = require('../Controller/organizadoresController');
const validateOrganizador = require('../middlewares/organizadoresValidate');


router.get('/', organizadoresController.index);
router.get('/create', organizadoresController.create);
router.post('/', validateOrganizador, organizadoresController.store);
router.get('/:id_organizador/edit', organizadoresController.edit);
router.put('/:id_organizador', validateOrganizador, organizadoresController.update);
router.delete('/:id_organizador', organizadoresController.delete);

module.exports = router;