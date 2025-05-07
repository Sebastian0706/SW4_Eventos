const express = require('express');
const ventaController = require('../Controller/ventaController');
const validateVenta = require('../middlewares/ventaValidate')
const router = express.Router();

//rutas

router.get('/', ventaController.index);
router.get('/create', ventaController.create);
router.post('/', validateVenta, ventaController.store);
router.get('/:id', ventaController.show);
router.get('/:id/edit', ventaController.edit);
router.put('/:id', validateVenta, ventaController.update);
router.delete('/:id', ventaController.delete);

module.exports = router;