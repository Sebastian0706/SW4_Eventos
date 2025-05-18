const { validationResult } = require('express-validator');
const Organizador = require('../models/organizadoresModels');

// Listar todos los organizadores
exports.index = async (req, res) => {
  try {
    const organizadores = await Organizador.getAll();
    res.render('organizadores/index', { title: 'Listado de Organizadores', organizadores });
  } catch (error) {
    console.error('Error al obtener organizadores:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron cargar los organizadores.' });
  }
};

// Mostrar formulario para crear organizador
exports.create = (req, res) => {
  res.render('organizadores/form', { title: 'Crear Organizador', organizador: {}, errors: [], isEditing: false });
};

// Guardar nuevo organizador
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('organizadores/form', { title: 'Crear Organizador', organizador: req.body, errors: errors.array(), isEditing: false });
  }

  try {
    await Organizador.create(req.body);
    res.redirect('/organizadores');
  } catch (error) {
    console.error('Error al guardar organizador:', error);
    res.render('organizadores/form', { title: 'Crear Organizador', organizador: req.body, errors: [{ msg: 'Error al guardar el organizador.' }], isEditing: false });
  }
};

// Mostrar formulario para editar organizador
exports.edit = async (req, res) => {
  try {
    const organizador = await Organizador.getById(req.params.id_organizador);
    if (!organizador) {
      return res.status(404).render('error', { title: 'Organizador no encontrado', message: 'El organizador solicitado no existe.' });
    }
    res.render('organizadores/form', { title: 'Editar Organizador', organizador, errors: [], isEditing: true });
  } catch (error) {
    console.error('Error al obtener organizador:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudo cargar el organizador.' });
  }
};

// Actualizar organizador
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_organizador = req.params.id_organizador;

  if (!errors.isEmpty()) {
    return res.render('organizadores/form', { title: 'Editar Organizador', organizador: { ...req.body, id_organizador }, errors: errors.array(), isEditing: true });
  }

  try {
    const success = await Organizador.update(id_organizador, req.body);
    if (!success) {
      return res.status(404).render('error', { title: 'Organizador no encontrado', message: 'El organizador que intentas actualizar no existe.' });
    }
    res.redirect('/organizadores');
  } catch (error) {
    console.error('Error al actualizar organizador:', error);
    res.render('organizadores/form', { title: 'Editar Organizador', organizador: { ...req.body, id_organizador }, errors: [{ msg: 'Error al actualizar el organizador.' }], isEditing: true });
  }
};

// Eliminar organizador
exports.delete = async (req, res) => {
  try {
    const success = await Organizador.delete(req.params.id_organizador);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Organizador no encontrado' });
    }
    res.redirect('/organizadores');
  } catch (error) {
    console.error('Error al eliminar organizador:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el organizador' });
  }
};