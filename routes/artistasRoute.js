const express = require('express');
const router = express.Router();
const artistasController = require('../Controller/artistasController');
const validateArtistas = require('../middlewares/artistaValidate');

router.get('/', artistasController.index);
router.get('/create', artistasController.create);
router.post('/', validateArtistas, artistasController.store);
router.get('/:id_artista/editar', artistasController.edit);
router.put('/:id_artista', validateArtistas, artistasController.update);
router.delete('/:id_artista', artistasController.delete);
router.get('/:id_artista', artistasController.show);

module.exports = router;