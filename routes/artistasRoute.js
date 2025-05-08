const express = require('express');
const { body } = require('express-validator');
const artistasController = require('../Controller/artistasController');
const validateArtistas = require('../middlewares/artistaValidate')
const router = express.Router();

//rutas

router.get('/', artistasController.index);
router.get('/create', artistasController.create);
router.post('/', validateArtistas, artistasController.store);
router.get('/:id/edit', artistasController.edit);
router.put('/:id', validateArtistas, artistasController.update);
router.delete('/:id', artistasController.delete);

module.exports = router;