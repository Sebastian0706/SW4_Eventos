const express = require('express');
const boletaController = require('../Controller/boletasController');
const validateBoleta = require('../middlewares/boletaValidate');
const router = express.Router();

// Rutas para boletas
router.get('/', boletaController.listarBoletas);
router.post('/', validateBoleta, boletaController.agregarBoleta);
router.get('/:id_boleta', boletaController.editarBoleta);
router.put('/:id_boleta', validateBoleta, boletaController.actualizarBoleta);
router.delete('/:id_boleta', boletaController.eliminarBoleta);

module.exports = router;