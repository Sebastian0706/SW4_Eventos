const { validationResult } = require('express-validator');
const Boleta = require('../models/boletasModels');

// Mostrar todas las boletas
exports.index = async (req, res) => {
  try {
    const boletas = await Boleta.getAll();
    res.render('admin/boletas/index', {
      title: 'Listado de Boletas',
      boletas,
    });
  } catch (error) {
    console.error('Error al obtener boletas:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar las boletas.',
    });
  }
};

// Mostrar formulario para crear una nueva boleta
exports.create = (req, res) => {
  res.render('admin/boletas/form', {
    title: 'Crear Boleta',
    boleta: {},
    errors: [],
    isEditing: false,
  });
};

// Guardar una nueva boleta
exports.store = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('admin/boletas/form', {
      title: 'Crear Boleta',
      boleta: req.body,
      errors: errors.array(),
      isEditing: false,
    });
  }

  try {
    await Boleta.create(req.body);
    res.redirect('/admin/boletas');
  } catch (error) {
    console.error('Error al guardar boleta:', error);
    res.render('admin/boletas/form', {
      title: 'Crear Boleta',
      boleta: req.body,
      errors: [{ msg: 'Error al guardar la boleta.' }],
      isEditing: false,
    });
  }
};

// Mostrar formulario para editar una boleta existente
exports.edit = async (req, res) => {
  try {
    const boleta = await Boleta.getById(req.params.id_boleta);

    if (!boleta) {
      return res.status(404).render('error', {
        title: 'Boleta no encontrada',
        message: 'La boleta que buscas no existe.',
      });
    }

    res.render('admin/boletas/form', {
      title: 'Editar Boleta',
      boleta,
      errors: [],
      isEditing: true,
    });
  } catch (error) {
    console.error('Error al cargar boleta:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar la boleta.',
    });
  }
};

// Actualizar una boleta existente
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_boleta = req.params.id_boleta;

  if (!errors.isEmpty()) {
    return res.render('admin/boletas/form', {
      title: 'Editar Boleta',
      boleta: { ...req.body, id_boleta },
      errors: errors.array(),
      isEditing: true,
    });
  }

  try {
    const success = await Boleta.update(id_boleta, req.body);

    if (!success) {
      return res.status(404).render('error', {
        title: 'Boleta no encontrada',
        message: 'La boleta que estás intentando actualizar no existe.',
      });
    }

    res.redirect('/admin/boletas');
  } catch (error) {
    console.error('Error al actualizar boleta:', error);
    res.render('admin/boletas/form', {
      title: 'Editar Boleta',
      boleta: { ...req.body, id_boleta },
      errors: [{ msg: 'Error al actualizar la boleta.' }],
      isEditing: true,
    });
  }
};

// Eliminar una boleta existente
exports.delete = async (req, res) => {
  const id_boleta = req.params.id_boleta;

  try {
    const success = await Boleta.delete(id_boleta);

    if (!success) {
      return res.status(404).json({ success: false, message: 'Boleta no encontrada' });
    }

    res.redirect('/admin/boletas');
  } catch (error) {
    console.error('Error al eliminar boleta:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar la boleta' });
  }
};
