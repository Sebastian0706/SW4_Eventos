const { validationResult } = require('express-validator');
const compraModel = require('../models/compraModels');

exports.listarCompras = async (req, res) => {
    try {
        const compras = await compraModel.getAll();
        res.status(200).json(compras);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar las compras' });
    }
};

exports.agregarCompra = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        await compraModel.create(req.body);
        res.status(201).json({ message: 'Compra registrada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la compra' });
    }
};

exports.editarCompra = async (req, res) => {
    try {
        const compra = await compraModel.getById(req.params.id_compra);
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json(compra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos de la compra' });
    }
};

exports.actualizarCompra = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        const success = await compraModel.update(req.params.id_compra, req.body);
        if (!success) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la compra' });
    }
};

exports.eliminarCompra = async (req, res) => {
    try {
        const success = await compraModel.delete(req.params.id_compra);
        if (!success) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la compra' });
    }
};