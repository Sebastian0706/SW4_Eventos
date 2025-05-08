const { validationResult } = require('express-validator');
const compraBoletaModel = require('../models/compra_boletaModels');

// Listar todas las compras de boletas
exports.listarComprasBoleta = async (req, res) => {
    try {
        const compras = await compraBoletaModel.getAll();
        res.status(200).json(compras);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar las compras de boletas' });
    }
};

// Agregar una nueva compra de boleta
exports.agregarCompraBoleta = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        await compraBoletaModel.create(req.body);
        res.status(201).json({ message: 'Compra de boleta registrada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la compra de boleta' });
    }
};

// Obtener una compra de boleta por ID
exports.editarCompraBoleta = async (req, res) => {
    try {
        const compra = await compraBoletaModel.getById(req.params.id_compro_boleta);
        if (!compra) {
            return res.status(404).json({ message: 'Compra de boleta no encontrada' });
        }
        res.status(200).json(compra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos de la compra de boleta' });
    }
};

exports.actualizarCompraBoleta = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        const success = await compraBoletaModel.update(req.params.id_compro_boleta, req.body);
        if (!success) {
            return res.status(404).json({ message: 'Compra de boleta no encontrada' });
        }
        res.status(200).json({ message: 'Compra de boleta actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la compra de boleta' });
    }
};

exports.eliminarCompraBoleta = async (req, res) => {
    try {
        const success = await compraBoletaModel.delete(req.params.id_compro_boleta);
        if (!success) {
            return res.status(404).json({ message: 'Compra de boleta no encontrada' });
        }
        res.status(200).json({ message: 'Compra de boleta eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la compra de boleta' });
    }
};