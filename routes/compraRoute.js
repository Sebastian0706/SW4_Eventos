const express = require('express');
const compraController = require('../Controller/compraController');
const validateCompra = require('../middlewares/compraValidate')
const router = express.Router();

//rutas

router.get('/', compraController.index);
router.get('/create', compraController.create);
router.post('/', validateCompra, compraController.store);
router.get('/:id/edit', compraController.edit);
router.put('/:id', validateCompra, compraController.update);
router.delete('/:id', compraController.delete);

module.exports = router;