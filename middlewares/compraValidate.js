const { body } = require('express-validator');

const validateCompra = [
    body('cantidad_boletas')
        .notEmpty().withMessage('La cantidad de boletas es obligatoria')
        .isInt({ min: 1 }).withMessage('La cantidad de boletas debe ser un número mayor o igual a 1'),
    body('valor_entrada')
        .notEmpty().withMessage('El valor de la entrada es obligatorio')
        .isInt({ min: 1 }).withMessage('El valor de la entrada debe ser un número mayor o igual a 1'),
];

module.exports = validateCompra;