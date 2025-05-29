const { body } = require('express-validator');

const validateUsuario = [
    body('primer_nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
    body('primer_apellido')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El apellido debe tener entre 2 y 200 caracteres'),
    body('tipo_documento')
        .notEmpty().withMessage('El tipo de documento es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El tipo de documento debe tener entre 2 y 100 caracteres'),
    body('numero_documento')
        .notEmpty().withMessage('El número de documento es obligatorio')
        .isLength({ min: 5, max: 20 }).withMessage('El número de documento debe tener entre 5 y 20 caracteres'),
    body('correo')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo válido'),
    body('nombre_usuario')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres'),
];

module.exports = validateUsuario;
