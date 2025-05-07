const { body } = require('express-validator');

const validateBoletas = [
    body('precio')
        .notEmpty().withMessage('El precio es obligatorio')
        .isInt({ min: 18 }).withMessage('El precio debe ser un número mayor o igual a 18'),
    body('tipo')
        .notEmpty().withMessage('El tipo es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El tipo debe tener entre 2 y 100 caracteres'),
    body('localidad')
        .notEmpty().withMessage('La localidad es obligatoria')
        .isLength({ min: 2, max: 100 }).withMessage('El apellido debe tener entre 2 y 100 caracteres'),
];

module.exports = validateBoletas;