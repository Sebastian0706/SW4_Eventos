const express = require('express');
const router = express.Router();
const artistaController = require('../Controller/artistasController');
const validateArtista = require('../middlewares/artistaValidate');
// Rutas para artistas
router.get('/', artistaController.index);
router.get('/create', artistaController.create);
router.post('/', validateArtista, artistaController.store);
router.get('/:id', artistaController.edit);
router.put('/:id/edit', validateArtista, artistaController.update);
router.delete('/:id', artistaController.delete);



module.exports = router;