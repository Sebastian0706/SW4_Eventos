const express = require('express');
const router = express.Router();
const eventosController = require('../Controller/eventosController');
const validateEvento = require('../middlewares/eventoValidate');


router.get('/', eventosController.index);
router.get('/filter', eventosController.filter);
router.get('/create', eventosController.create);
router.post('/', validateEvento, eventosController.store);
router.get('/:id_evento/edit', eventosController.edit);
router.put('/:id_evento', validateEvento, eventosController.update);
router.delete('/:id_evento', eventosController.delete);
router.get('/:id_evento/entradas', eventosController.entradasVendidas);

module.exports = router;