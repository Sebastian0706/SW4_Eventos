const { validationResult } = require('express-validator');
const Venta = require('../models/ventaModels');

// Mostrar todas las ventas
exports.index = async (req, res) => {
  try {
    const ventas = await Venta.getAll();
    res.render('ventas/index', {
      title: 'Listado de Ventas',
      ventas
    });
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar las ventas.'
    });
  }
};

// Mostrar formulario para crear nueva venta
exports.create = (req, res) => {
  res.render('ventas/form', {
    title: 'Registrar Venta',
    venta: {},
    errors: [],
    isEditing: false
  });
};

// Guardar nueva venta
exports.store = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('ventas/form', {
      title: 'Registrar Venta',
      venta: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    await Venta.create(req.body);
    res.redirect('/ventas');
  } catch (error) {
    console.error('Error al guardar la venta:', error);
    res.render('ventas/form', {
      title: 'Registrar Venta',
      venta: req.body,
      errors: [{ msg: 'Error al guardar la venta.' }],
      isEditing: false
    });
  }
};

// Mostrar formulario para editar venta existente
exports.edit = async (req, res) => {
  try {
    const venta = await Venta.getById(req.params.id_venta);

    if (!venta) {
      return res.status(404).render('error', {
        title: 'Venta no encontrada',
        message: 'La venta que buscas no existe.'
      });
    }

    res.render('ventas/form', {
      title: 'Editar Venta',
      venta,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error('Error al cargar la venta:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar la venta.'
    });
  }
};

// Actualizar venta existente
exports.update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('ventas/form', {
      title: 'Editar Venta',
      venta: { ...req.body, id_venta: req.params.id_venta },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Venta.update(req.params.id_venta, req.body);

    if (!success) {
      return res.status(404).render('error', {
        title: 'Venta no encontrada',
        message: 'La venta que estás intentando actualizar no existe.'
      });
    }

    res.redirect('/ventas');
  } catch (error) {
    console.error('Error al actualizar la venta:', error);
    res.render('ventas/form', {
      title: 'Editar Venta',
      venta: { ...req.body, id_venta: req.params.id_venta },
      errors: [{ msg: 'Error al actualizar la venta.' }],
      isEditing: true
    });
  }
};

// Eliminar venta
exports.delete = async (req, res) => {
  try {
    const success = await Venta.delete(req.params.id_venta);

    if (!success) {
      return res.status(404).json({ success: false, message: 'Venta no encontrada' });
    }

    res.redirect('/ventas');
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar la venta' });
  }
};
