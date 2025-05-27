const express = require('express');
const router = express.Router();
const ventasController = require('../Controller/ventaController');
const validateVenta = require('../middlewares/ventaValidate');

router.get('/', ventasController.index);
router.get('/create', ventasController.create);
router.post('/', validateVenta, ventasController.store);
router.get('/:id_venta/edit', ventasController.edit);
router.put('/:id_venta', validateVenta, ventasController.update);
router.delete('/:id_venta', ventasController.delete);

module.exports = router;