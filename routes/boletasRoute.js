const express = require('express');
const router = express.Router();
const boletasController = require('../Controller/boletasController');
const validateBoleta = require('../middlewares/boletaValidate');


router.get('/', boletasController.index);
router.get('/create', boletasController.create);
router.post('/', validateBoleta, boletasController.store);
router.get('/:id_boleta', boletasController.show);
router.get('/:id_boleta/edit', boletasController.edit);
router.put('/:id_boleta', validateBoleta, boletasController.update);
router.delete('/:id_boleta', boletasController.delete);

module.exports = router;
