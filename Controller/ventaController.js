const { validationResult } = require('express-validator');
const Venta = require('../models/ventaModels');

// Listar todas las ventas
exports.index = async (req, res) => {
  try {
    const ventas = await Venta.getAll();
    res.render('admin/ventas/index', { title: 'Listado de Ventas', ventas, user: req.user });
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron cargar las ventas.' });
  }
};

// Mostrar formulario para crear venta
exports.create = (req, res) => {
  res.render('admin/ventas/form', {
    title: 'Crear Venta',
    venta: {},
    errors: [],
    isEditing: false,
    ventas: [],
    user: req.user
  });
};

// Guardar nueva venta
exports.store = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('admin/ventas/form', {
      title: 'Crear Venta',
      venta: req.body,
      errors: errors.array(),
      isEditing: false,
      ventas: [],
      user: req.user
    });
  }

  try {
    await Venta.create(req.body);
    res.redirect('/admin/ventas');
  } catch (error) {
    console.error('Error al guardar venta:', error);
    res.render('admin/ventas/form', {
      title: 'Crear Venta',
      venta: req.body,
      errors: [{ msg: 'Error al guardar la venta.' }],
      isEditing: false,
      ventas: [],
      user: req.user
    });
  }
};

// Mostrar formulario para editar venta
exports.edit = async (req, res) => {
  try {
    const venta = await Venta.getById(req.params.id_venta);
    if (!venta) {
      return res.status(404).render('error', { title: 'Venta no encontrada', message: 'La venta solicitada no existe.' });
    }
    res.render('admin/ventas/form', {
      title: 'Editar Venta',
      venta,
      errors: [],
      isEditing: true,
      ventas: [],
      user: req.user
    });
  } catch (error) {
    console.error('Error al obtener venta:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudo cargar la venta.' });
  }
};

// Actualizar venta
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_venta = req.params.id_venta;

  if (!errors.isEmpty()) {
    return res.render('admin/ventas/form', {
      title: 'Editar Venta',
      venta: { ...req.body, id_venta },
      errors: errors.array(),
      isEditing: true,
      ventas: [],
      user: req.user
    });
  }

  try {
    const success = await Venta.update(id_venta, req.body);
    if (!success) {
      return res.status(404).render('error', { title: 'Venta no encontrada', message: 'La venta que intentas actualizar no existe.' });
    }
    res.redirect('/admin/ventas');
  } catch (error) {
    console.error('Error al actualizar venta:', error);
    res.render('admin/ventas/form', {
      title: 'Editar Venta',
      venta: { ...req.body, id_venta },
      errors: [{ msg: 'Error al actualizar la venta.' }],
      isEditing: true,
      ventas: [],
      user: req.user
    });
  }
};

// Mostrar detalle de venta
exports.show = async (req, res) => {
  try {
    const venta = await Venta.getById(req.params.id_venta);
    if (!venta) {
      return res.status(404).render('error', { title: 'Venta no encontrada', message: 'No existe la venta solicitada.' });
    }
    res.render('admin/ventas/show', { title: `Venta #${venta.id_venta}`, venta, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error', message: 'Error al cargar la venta.' });
  }
};

// Eliminar venta
exports.delete = async (req, res) => {
  try {
    const success = await Venta.delete(req.params.id_venta);
    if (!success) {
      return res.status(404).render('error', { title: 'Venta no encontrada', message: 'La venta no existe.' });
    }
    res.redirect('/admin/ventas');
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    res.status(500).render('error', { title: 'Error', message: 'Error al eliminar la venta.' });
  }
};
