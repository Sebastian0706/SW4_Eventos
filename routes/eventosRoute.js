const express = require('express');
const eventosController = require('../Controller/eventosController');
const validateEvento = require('../middlewares/eventoValidate')
const router = express.Router();

//rutas

router.get('/', eventosController.listarEventos);
router.post('/', validateEvento, eventosController.agregarEvento);
router.get('/:id/edit', eventosController.agregarEvento);
router.put('/:id', validateEvento, eventosController.actualizarEvento);
router.delete('/:id', eventosController.eliminarEvento);

module.exports = router;