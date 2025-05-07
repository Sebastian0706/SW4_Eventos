const express = require('express');
const { body } = require('express-validator');
const rolesController = require('../Controller/rolesController');
const router = express.Router();

//middleware
const validateRoles = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),

];

//rutas

router.get('/', rolesController.index);
router.get('/create', rolesController.create);
router.post('/', validateRoles, rolesController.store);
router.get('/:id', rolesController.show);
router.get('/:id/edit', rolesController.edit);
router.put('/:id', validateRoles, rolesController.update);
router.delete('/:id', rolesController.delete);

module.exports = router;