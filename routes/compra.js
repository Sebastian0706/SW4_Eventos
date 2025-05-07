const express = require('express');
const { body } = require('express-validator');
const compraController = require('../Controller/compraController');
const router = express.Router();

//middleware
const validateCompra = [
    body('cantidad_boletas')
        .notEmpty().withMessage('La cantidad de boletas es obligatoria')
        .isInt({ min: 1 }).withMessage('La cantidad de boletas debe ser un número mayor o igual a 1'),
    body('valor_entrada')
        .notEmpty().withMessage('El valor de la entrada es obligatorio')
        .isInt({ min: 1 }).withMessage('El valor de la entrada debe ser un número mayor o igual a 1'),
];

//rutas

router.get('/', compraController.index);
router.get('/create', compraController.create);
router.post('/', validateCompra, compraController.store);
router.get('/:id', compraController.show);
router.get('/:id/edit', compraController.edit);
router.put('/:id', validateCompra, compraController.update);
router.delete('/:id', compraController.delete);

module.exports = router;