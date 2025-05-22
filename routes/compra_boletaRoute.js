const express = require('express');
const router = express.Router();
const compraBoletaController = require('../Controller/compra_boletaController');
const validateCompraBoleta = require('../middlewares/compra_boletaValidate');

router.get('/', compraBoletaController.index);
router.get('/crear', compraBoletaController.create);
router.post('/', validateCompraBoleta, compraBoletaController.store);
router.get('/:id_compro_boleta/editar', compraBoletaController.edit);
router.put('/:id_compro_boleta', validateCompraBoleta, compraBoletaController.update);
router.delete('/:id_compro_boleta', compraBoletaController.delete);

module.exports = router;