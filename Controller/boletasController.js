const { validationResult } = require('express-validator');
const boletaModel = require('../models/boletasModels');

exports.listarBoletas = async (req, res) => {
    try {
        const boletas = await boletaModel.getAll();
        res.status(200).json(boletas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar las boletas' });
    }
};

exports.agregarBoleta = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        await boletaModel.create(req.body);
        res.status(201).json({ message: 'Boleta creada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la boleta' });
    }
};

exports.editarBoleta = async (req, res) => {
    try {
        const boleta = await boletaModel.getById(req.params.id_boleta);
        if (!boleta) {
            return res.status(404).json({ message: 'Boleta no encontrada' });
        }
        res.status(200).json(boleta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos de la boleta' });
    }
};

exports.actualizarBoleta = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        const success = await boletaModel.update(req.params.id_boleta, req.body);
        if (!success) {
            return res.status(404).json({ message: 'Boleta no encontrada' });
        }
        res.status(200).json({ message: 'Boleta actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la boleta' });
    }
};

exports.eliminarBoleta = async (req, res) => {
    try {
        const success = await boletaModel.delete(req.params.id_boleta);
        if (!success) {
            return res.status(404).json({ message: 'Boleta no encontrada' });
        }
        res.status(200).json({ message: 'Boleta eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la boleta' });
    }
};