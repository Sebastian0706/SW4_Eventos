const express = require('express');
const compraBoletaController = require('../Controller/compra_boletaController');
const validateCompraBoleta = require('../middlewares/compra_boletaValidate');
const router = express.Router();

// Rutas para compra_boleta
router.get('/', compraBoletaController.listarCompraBoletas);
router.post('/', validateCompraBoleta, compraBoletaController.agregarCompraBoleta);
router.get('/:id_compro_boleta', compraBoletaController.editarCompraBoleta);
router.put('/:id_compro_boleta', validateCompraBoleta, compraBoletaController.actualizarCompraBoleta);
router.delete('/:id_compro_boleta', compraBoletaController.eliminarCompraBoleta);

module.exports = router;