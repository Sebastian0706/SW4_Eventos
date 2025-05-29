const { body } = require('express-validator');

const validateEvento = [
    body('nombre_evento')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),

    body('lugar_evento')
        .notEmpty().withMessage('El lugar es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El lugar debe tener entre 2 y 200 caracteres'),

    body('aforo_evento')
        .notEmpty().withMessage('El aforo es obligatorio')
        .isInt({ min: 1 }).withMessage('El aforo debe ser un número entero positivo'),

    body('fecha_inicio_evento')
        .notEmpty().withMessage('La fecha de inicio es obligatoria')
        .isISO8601().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),

    body('hora_apertura')
        .notEmpty().withMessage('La hora de apertura es obligatoria')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('La hora debe estar en formato HH:MM'),

    body('categoria_evento')
        .notEmpty().withMessage('La categoría es obligatoria')
        .isLength({ min: 2, max: 100 }).withMessage('La categoría debe tener entre 2 y 100 caracteres'),

    body('genero_evento')
        .notEmpty().withMessage('El género es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El género debe tener entre 2 y 200 caracteres'),

];

module.exports = validateEvento;
