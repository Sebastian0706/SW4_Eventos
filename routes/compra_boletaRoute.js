const express = require('express');
const compra_boletaController = require('../Controller/compra_boletaController');
const validateCompra_boleta = require('../middlewares/compra_boletaValidate')
const router = express.Router();

//rutas

router.get('/', compra_boletaController.index);
router.get('/create', compra_boletaController.create);
router.post('/', validateCompra_boleta, compra_boletaController.store);
router.get('/:id/edit', compra_boletaController.edit);
router.put('/:id', validateCompra_boleta, compra_boletaController.update);
router.delete('/:id', compra_boletaController.delete);

module.exports = router;