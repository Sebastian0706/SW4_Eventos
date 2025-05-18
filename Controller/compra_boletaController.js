
const { validationResult } = require('express-validator');
const CompraBoleta = require('../models/compra_boletaModels');

// Mostrar todas las compras de boletas
exports.index = async (req, res) => {
  try {
    const comprasBoletas = await CompraBoleta.getAll();
    res.render('compra_boleta/index', {
      title: 'Listado de Compras de Boletas',
      comprasBoletas
    });
  } catch (error) {
    console.error('Error al obtener compras de boletas:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar las compras de boletas.'
    });
  }
};

// Mostrar formulario para crear una nueva compra de boleta
exports.create = (req, res) => {
  res.render('compra_boleta/form', {
    title: 'Crear Compra de Boleta',
    compraBoleta: {},
    errors: [],
    isEditing: false
  });
};

// Guardar una nueva compra de boleta
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('compra_boleta/form', {
      title: 'Crear Compra de Boleta',
      compraBoleta: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    await CompraBoleta.create(req.body);
    res.redirect('/compra_boleta');
  } catch (error) {
    console.error('Error al guardar compra de boleta:', error);
    res.render('compra_boleta/form', {
      title: 'Crear Compra de Boleta',
      compraBoleta: req.body,
      errors: [{ msg: 'Error al guardar la compra de boleta.' }],
      isEditing: false
    });
  }
};

// Mostrar formulario para editar una compra de boleta existente
exports.edit = async (req, res) => {
  try {
    const compraBoleta = await CompraBoleta.getById(req.params.id_compro_boleta);
    if (!compraBoleta) {
      return res.status(404).render('error', {
        title: 'Compra de Boleta no encontrada',
        message: 'La compra de boleta que buscas no existe.'
      });
    }

    res.render('compra_boleta/form', {
      title: 'Editar Compra de Boleta',
      compraBoleta,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error('Error al cargar compra de boleta:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar la compra de boleta.'
    });
  }
};

// Actualizar una compra de boleta existente
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_compro_boleta = req.params.id_compro_boleta;

  if (!errors.isEmpty()) {
    return res.render('compra_boleta/form', {
      title: 'Editar Compra de Boleta',
      compraBoleta: { ...req.body, id_compro_boleta },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await CompraBoleta.update(id_compro_boleta, req.body);
    if (!success) {
      return res.status(404).render('error', {
        title: 'Compra de Boleta no encontrada',
        message: 'La compra de boleta que estás intentando actualizar no existe.'
      });
    }

    res.redirect('/compra_boleta');
  } catch (error) {
    console.error('Error al actualizar compra de boleta:', error);
    res.render('compra_boleta/form', {
      title: 'Editar Compra de Boleta',
      compraBoleta: { ...req.body, id_compro_boleta },
      errors: [{ msg: 'Error al actualizar la compra de boleta.' }],
      isEditing: true
    });
  }
};

// Eliminar una compra de boleta
exports.delete = async (req, res) => {
  try {
    const success = await CompraBoleta.delete(req.params.id_compro_boleta);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Compra de Boleta no encontrada' });
    }

    res.redirect('/compra_boleta');
  } catch (error) {
    console.error('Error al eliminar compra de boleta:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar la compra de boleta' });
  }
};