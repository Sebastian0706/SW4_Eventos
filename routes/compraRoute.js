const express = require('express');
const compraController = require('../Controller/compraController');
const validateCompra = require('../middlewares/compraValidate');
const router = express.Router();

// Rutas para compras
router.get('/', compraController.listarCompras);
router.post('/', validateCompra, compraController.agregarCompra);
router.get('/:id_compra', compraController.editarCompra);
router.put('/:id_compra', validateCompra, compraController.actualizarCompra);
router.delete('/:id_compra', compraController.eliminarCompra);

module.exports = router;