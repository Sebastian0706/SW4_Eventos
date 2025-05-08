const { body } = require('express-validator');

const validateCompra_boleta = [
  body('cantidad_boletas')
    .notEmpty().withMessage('La cantidad de boletas es obligatoria')
    .isInt({ min: 1 }).withMessage('La cantidad de boletas debe ser un número mayor o igual a 1'),

  body('valor_entrada')
    .notEmpty().withMessage('El valor de la entrada es obligatorio')
    .isInt({ min: 1 }).withMessage('El valor de la entrada debe ser un número mayor o igual a 1'),

  body('fecha_compra')
    .notEmpty().withMessage('La fecha de la compra es obligatoria')
    .isISO8601().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),

  body('id_usuario')
    .notEmpty().withMessage('El usuario es obligatorio')
    .isInt().withMessage('El ID del usuario debe ser un número'),

  body('id_evento')
    .notEmpty().withMessage('El evento es obligatorio')
    .isInt().withMessage('El ID del evento debe ser un número')
];

module.exports = validateCompra_boleta;