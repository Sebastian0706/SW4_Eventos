const express = require('express');
const { body } = require('express-validator');
const organizadoresController = require('../Controller/organizadoresController');
const router = express.Router();

//middleware
const validateOrganizadores = [
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

router.get('/', organizadoresController.index);
router.get('/create', organizadoresController.create);
router.post('/', validateOrganizadores, organizadoresController.store);
router.get('/:id', organizadoresController.show);
router.get('/:id/edit', organizadoresController.edit);
router.put('/:id', validateOrganizadores, organizadoresController.update);
router.delete('/:id', organizadoresController.delete);

module.exports = router;