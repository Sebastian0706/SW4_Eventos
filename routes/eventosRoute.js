const express = require('express');
const eventosController = require('../Controller/eventosController');
const validateEvento = require('../middlewares/eventoValidate')
const router = express.Router();

//rutas

router.get('/', eventosController.index);
router.get('/create', eventosController.create);
router.post('/', validateEvento, eventosController.store);
router.get('/:id', eventosController.show);
router.get('/:id/edit', eventosController.edit);
router.put('/:id', validateEvento, eventosController.update);
router.delete('/:id', eventosController.delete);

module.exports = router;