const { body } = require('express-validator');

const validateBoletas = [
    body('precio_boleta')
        .notEmpty().withMessage('El precio es obligatorio')
        .isInt({ min: 18 }).withMessage('El precio debe ser un número mayor o igual a 18'),

    body('tipo_boleta')
        .notEmpty().withMessage('El tipo es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El tipo debe tener entre 2 y 100 caracteres'),

    body('localidad_boleta')
        .notEmpty().withMessage('La localidad es obligatoria')
        .isLength({ min: 2, max: 100 }).withMessage('La localidad debe tener entre 2 y 100 caracteres'),

    body('num_personas')
        .notEmpty().withMessage('El número de personas es obligatorio')
        .isInt({ min: 1 }).withMessage('El número de personas debe ser un número entero positivo'),

    body('id_evento_PK')
        .notEmpty().withMessage('El ID del evento es obligatorio')
        .isInt().withMessage('El ID del evento debe ser un número entero'),
];

module.exports = validateBoletas;
