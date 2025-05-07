const { body } = require('express-validator');

const validateVenta= [
    body('total')
        .notEmpty().withMessage('El total es obligatorio')
        .isInt({ min: 1}).withMessage('El total un número mayor o igual a 1'),
    body('forma_pago')
        .notEmpty().withMessage('La forma de pago es obligatoria')
        .isLength({ min: 2, max: 200 }).withMessage('La forma de pago debe tener entre 2 y 200 caracteres'),

];

module.exports = validateVenta;