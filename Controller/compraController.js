const { validationResult } = require('express-validator');
const Compra = require('../models/compraModels');

// Mostrar todas las compras
exports.index = async (req, res) => {
  try {
    const compras = await Compra.getAll();
    res.render('compras/index', { title: 'Listado de Compras', compras });
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron cargar las compras.' });
  }
};

// Mostrar formulario para crear compra
exports.create = (req, res) => {
  res.render('compras/form', { title: 'Crear Compra', compra: {}, errors: [], isEditing: false });
};

// Guardar nueva compra
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('compras/form', { title: 'Crear Compra', compra: req.body, errors: errors.array(), isEditing: false });
  }

  try {
    await Compra.create(req.body);
    res.redirect('/compras');
  } catch (error) {
    console.error('Error al guardar compra:', error);
    res.render('compras/form', { title: 'Crear Compra', compra: req.body, errors: [{ msg: 'Error al guardar la compra.' }], isEditing: false });
  }
};

// Mostrar formulario para editar compra
exports.edit = async (req, res) => {
  try {
    const compra = await Compra.getById(req.params.id_compra);
    if (!compra) {
      return res.status(404).render('error', { title: 'Compra no encontrada', message: 'La compra solicitada no existe.' });
    }
    res.render('compras/form', { title: 'Editar Compra', compra, errors: [], isEditing: true });
  } catch (error) {
    console.error('Error al obtener compra:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudo cargar la compra.' });
  }
};

// Actualizar compra
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_compra = req.params.id_compra;

  if (!errors.isEmpty()) {
    return res.render('compras/form', { title: 'Editar Compra', compra: { ...req.body, id_compra }, errors: errors.array(), isEditing: true });
  }

  try {
    const success = await Compra.update(id_compra, req.body);
    if (!success) {
      return res.status(404).render('error', { title: 'Compra no encontrada', message: 'La compra que intentas actualizar no existe.' });
    }
    res.redirect('/compras');
  } catch (error) {
    console.error('Error al actualizar compra:', error);
    res.render('compras/form', { title: 'Editar Compra', compra: { ...req.body, id_compra }, errors: [{ msg: 'Error al actualizar la compra.' }], isEditing: true });
  }
};

// Eliminar compra
exports.delete = async (req, res) => {
  try {
    const success = await Compra.delete(req.params.id_compra);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Compra no encontrada' });
    }
    res.redirect('/compras');
  } catch (error) {
    console.error('Error al eliminar compra:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar la compra' });
  }
};