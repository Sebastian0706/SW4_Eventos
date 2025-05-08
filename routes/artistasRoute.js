const express = require('express');
const artistaController = require('../Controller/artistasController');
const validateArtista = require('../middlewares/artistaValidate');
const router = express.Router();
// Rutas para artistas
router.get('/', artistaController.listarArtistas);
router.post('/', validateArtista, artistaController.agregarArtista);
router.get('/:id_artista', artistaController.editarArtista);
router.put('/:id_artista', validateArtista, artistaController.actualizarArtista);
router.delete('/:id_artista', artistaController.eliminarArtista);

module.exports = router;