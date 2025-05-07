const express = require('express');
const { body } = require('express-validator');
const boletasController = require('../Controller/boletasController');
const validateBoletas = require('../middlewares/boletaValidate')
const router = express.Router();


//rutas

router.get('/', boletasController.index);
router.get('/create', boletasController.create);
router.post('/', validateBoletas, boletasController.store);
router.get('/:id', boletasController.show);
router.get('/:id/edit', boletasController.edit);
router.put('/:id', validateBoletas, boletasController.update);
router.delete('/:id', boletasController.delete);

module.exports = router;