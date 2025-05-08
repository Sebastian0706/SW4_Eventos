const { body } = require('express-validator');

const validateEvento = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),

    body('lugar')
        .notEmpty().withMessage('El lugar es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El lugar debe tener entre 2 y 200 caracteres'),

    body('aforo')
        .notEmpty().withMessage('El aforo es obligatorio')
        .isInt({ min: 1 }).withMessage('El aforo debe ser un número entero positivo'),

    body('fecha')
        .notEmpty().withMessage('La fecha es obligatoria')
        .isISO8601().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),

    body('hora')
        .notEmpty().withMessage('La hora es obligatoria')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('La hora debe estar en formato HH:MM (24h)'),

    body('tipo')
        .notEmpty().withMessage('El tipo del evento es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El tipo del evento debe tener entre 2 y 200 caracteres'),
];

module.exports = validateEvento;
