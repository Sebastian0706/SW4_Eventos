const express = require('express');
const { body } = require('express-validator');
const ventaController = require('../Controller/ventaController');
const router = express.Router();


//middleware
const validateVenta= [
    body('total')
        .notEmpty().withMessage('El total es obligatorio')
        .isInt({ min: 1}).withMessage('El total un número mayor o igual a 1'),
    body('forma_pago')
        .notEmpty().withMessage('La forma de pago es obligatoria')
        .isLength({ min: 2, max: 200 }).withMessage('La forma de pago debe tener entre 2 y 200 caracteres'),

];

//rutas

router.get('/', ventaController.index);
router.get('/create', ventaController.create);
router.post('/', validateVenta, ventaController.store);
router.get('/:id', ventaController.show);
router.get('/:id/edit', ventaController.edit);
router.put('/:id', validateVenta, ventaController.update);
router.delete('/:id', ventaController.delete);

module.exports = router;