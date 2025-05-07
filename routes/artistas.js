const express = require('express');
const { body } = require('express-validator');
const artistasController = require('../Controller/artistasController');
const router = express.Router();

//middleware
const validateArtistas = [
    body('primer_nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
    body('primer_apellido')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El apellido debe tener entre 2 y 200 caracteres'),
    body('tipo_documento')
        .notEmpty().withMessage('El tipo de documento es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El tipo de documento debe tener entre 2 y 100 caracteres de documento válido'),
   ];

//rutas

router.get('/', artistasController.index);
router.get('/create', artistasController.create);
router.post('/', validateArtistas, artistasController.store);
router.get('/:id', artistasController.show);
router.get('/:id/edit', artistasController.edit);
router.put('/:id', validateArtistas, artistasController.update);
router.delete('/:id', artistasController.delete);

module.exports = router;