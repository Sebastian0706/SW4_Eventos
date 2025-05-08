const { validationResult } = require('express-validator');
const Compra = require('../models/compraModels');

exports.index = async (req, res) => {
  try {
    const compras = await Compra.getAll();
    res.render('compras/index', {
      title: 'Listado de Compras',
      compras
    });
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar las compras.'
    });
  }
};

exports.create = (req, res) => {
  res.render('compras/form', {
    title: 'Crear Compra',
    compra: {},
    errors: [],
    isEditing: false
  });
};

exports.store = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('compras/form', {
      title: 'Crear Compra',
      compra: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    await Compra.create(req.body);
    res.redirect('/compras');
  } catch (error) {
    console.error('Error al guardar compra:', error);
    res.render('compras/form', {
      title: 'Crear Compra',
      compra: req.body,
      errors: [{ msg: 'Error al guardar la compra.' }],
      isEditing: false
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const compra = await Compra.getById(req.params.id_compra);

    if (!compra) {
      return res.status(404).render('error', {
        title: 'Compra no encontrada',
        message: 'La compra que buscas no existe.'
      });
    }

    res.render('compras/form', {
      title: 'Editar Compra',
      compra,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error('Error al cargar compra:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar la compra.'
    });
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('compras/form', {
      title: 'Editar Compra',
      compra: { ...req.body, id_compra: req.params.id_compra },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Compra.update(req.params.id_compra, req.body);

    if (!success) {
      return res.status(404).render('error', {
        title: 'Compra no encontrada',
        message: 'La compra que estás intentando actualizar no existe.'
      });
    }

    res.redirect('/compras');
  } catch (error) {
    console.error('Error al actualizar compra:', error);
    res.render('compras/form', {
      title: 'Editar Compra',
      compra: { ...req.body, id_compra: req.params.id_compra },
      errors: [{ msg: 'Error al actualizar la compra.' }],
      isEditing: true
    });
  }
};

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