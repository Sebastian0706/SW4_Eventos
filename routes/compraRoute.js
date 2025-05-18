const express = require('express');
const router = express.Router();
const comprasController = require('../Controller/compraController');
const validateCompra = require('../middlewares/compraValidate');


router.get('/', comprasController.index);
router.get('/create', comprasController.create);
router.post('/', validateCompra, comprasController.store);
router.get('/:id_compra/edit', comprasController.edit);
router.put('/:id_compra', validateCompra, comprasController.update);
router.delete('/:id_compra', comprasController.delete);

module.exports = router;