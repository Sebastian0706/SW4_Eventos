const express = require('express');
const ventaController = require('../Controller/ventaController');
const validateVenta = require('../middlewares/ventaValidate')
const router = express.Router();

//rutas

router.get('/', ventaController.listarVentas);
router.post('/', validateVenta, ventaController.agregarVenta);
router.get('/:id', ventaController.editarVenta);
router.put('/:id', validateVenta, ventaController.editarVenta);
router.delete('/:id', ventaController.eliminarVenta);

module.exports = router;