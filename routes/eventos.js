const express = require('express');
const { body } = require('express-validator');
const eventosController = require('../Controller/eventosController');
const router = express.Router();

//middleware
const validateEvento = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),

    body('lugar')
        .notEmpty().withMessage('El lugar es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El lugar debe tener entre 2 y 200 caracteres'),

    body('aforo')
        .notEmpty().withMessage('El aforo es obligatorio')
        .isInt({ min: 1, max: 10 }).withMessage('El aforo debe ser ma'),

    body('fecha')
        .notEmpty().withMessage('La fecha es obligatoria')
        .isLength({ min: 2, max: 200 }).withMessage('La fecha debe tener entre 2 y 200 caracteres'),

    body('hora')
        .notEmpty().withMessage('La hora es obligatoria')
        .isDatetime().withMessage('Ingrese bien la hora'),
        //.isLength({ min: 2, max: 200 }).withMessage('El lugar debe tener entre 2 y 200 caracteres'),

    body('tipo')
        .notEmpty().withMessage('El tipo del evento es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El tipo del evento debe tener entre 2 y 200 caracteres'),

];

//rutas

router.get('/', eventosController.index);
router.get('/create', eventosController.create);
router.post('/', validateEvento, eventosController.store);
router.get('/:id', eventosController.show);
router.get('/:id/edit', eventosController.edit);
router.put('/:id', validateEvento, eventosController.update);
router.delete('/:id', eventosController.delete);

module.exports = router;