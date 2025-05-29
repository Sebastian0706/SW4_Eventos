const { body } = require('express-validator');

const validateVenta = [
    body('valor_total')
        .notEmpty().withMessage('El valor total es obligatorio')
        .isInt({ min: 1 }).withMessage('El valor total debe ser un número entero mayor o igual a 1'),

    body('metodo_pago')
        .notEmpty().withMessage('El método de pago es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El método de pago debe tener entre 2 y 100 caracteres'),

    body('fecha_venta')
        .notEmpty().withMessage('La fecha de venta es obligatoria')
        .isISO8601().withMessage('La fecha de venta debe ser una fecha válida'),

    body('id_compra_PK')
        .notEmpty().withMessage('El ID de compra es obligatorio')
        .isInt({ min: 1 }).withMessage('El ID de compra debe ser un número entero positivo'),
];

module.exports = validateVenta;
