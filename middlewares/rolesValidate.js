const { body } = require('express-validator');
const Rol = require('../models/rolesModels');

const validateRoles = [
    body('nombre_rol')
        .notEmpty().withMessage('El nombre del rol es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres')
        .custom(async (value, { req }) => {
            const rolExistente = await Rol.getByNombre(value);

            if (req.method === 'POST') {
                if (rolExistente) {
                    throw new Error('El rol ya está registrado');
                }
            } else if (req.method === 'PUT') {
                const id_rol = parseInt(req.params.id_rol, 10);
                if (rolExistente && rolExistente.id_rol !== id_rol) {
                    throw new Error('Otro rol con ese nombre ya existe');
                }
            }
            return true;
        }),
    body('acciones_rol')
        .optional()
        .isLength({ max: 500 }).withMessage('Las acciones no deben superar los 500 caracteres')
];

module.exports = validateRoles;
