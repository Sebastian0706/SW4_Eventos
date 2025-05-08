const { validationResult } = require('express-validator');
const eventoModel = require('../models/eventosModels');

exports.listarEventos = async (req, res) => {
  try {
    const usuarios = await eventoModel.getAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cargar los eventos' });
  }
};



exports.agregarEvento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error en la validación',
      errors: errors.array()
    });
  }

  try {
    await eventoModel.create(req.body);
    res.status(201).json({ message: 'Evento creado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el evento' });
  }
};



exports.editarEvento = async (req, res) => {
  try {
    const evento = await eventoModel.getById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cargar los datos del Evento' });
  }
};




exports.actualizarEvento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error en la validación',
      errors: errors.array()
    });
  }

  try {
    const success = await eventoModel.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json({ message: 'Evento actualizado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el Evento' });
  }
};
exports.eliminarEvento = async (req, res) => {
  try {
    const success = await eventoModel.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    }
    res.status(200).json({ message: 'Evento eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
  }
};