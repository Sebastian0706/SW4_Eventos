const { validationResult } = require('express-validator');
const Artista = require('../models/artistasModels');

// Mostrar todos los artistas
exports.index = async (req, res) => {
  try {
    const artistas = await Artista.getAll();
    res.render('artistas/index', {
      title: 'Listado de Artistas',
      artistas
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Hubo un error al cargar los artistas'
    });
  }
};

// Mostrar formulario para crear nuevo artista
exports.create = async (req, res) => {
  res.render('artistas/form', {
    title: 'Registrar Artista',
    artista: {},
    errors: [],
    isEditing: false
  });
};

// Guardar nuevo artista
exports.store = async (req, res) => {
  // Validar datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('artistas/form', {
      title: 'Registrar Artista',
      artista: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    await Artista.create(req.body);
    res.redirect('/artistas');
  } catch (error) {
    console.error(error);
    res.render('artistas/form', {
      title: 'Registrar Artista',
      artista: req.body,
      errors: [{ msg: 'Error al guardar el artista. El email podría estar duplicado.' }],
      isEditing: false
    });
  }
};

// Mostrar formulario para editar artista
exports.edit = async (req, res) => {
  try {
    const artista = await Artista.getById(req.params.id);
    if (!artista) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Artista no encontrado'
      });
    }
    res.render('artistas/form', {
      title: 'Editar Artista',
      artista,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al cargar los datos del artista'
    });
  }
};

// Actualizar artista
exports.update = async (req, res) => {
  // Validar datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('artistas/form', {
      title: 'Editar Artista',
      artista: { ...req.body, id: req.params.id },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Artista.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Artista no encontrado'
      });
    }
    res.redirect('/artistas');
  } catch (error) {
    console.error(error);
    res.render('artistas/form', {
      title: 'Editar Artista',
      artista: { ...req.body, id: req.params.id },
      errors: [{ msg: 'Error al actualizar el artista. El email podría estar duplicado.' }],
      isEditing: true
    });
  }
};

// Eliminar artista
exports.delete = async (req, res) => {
  try {
    const success = await Artista.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Artista no encontrado' });
    }
    res.redirect('/artistas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar el artista' });
  }
};

// Mostrar detalle de artista
exports.show = async (req, res) => {
  try {
    const artista = await Artista.getById(req.params.id);
    if (!artista) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Artista no encontrado'
      });
    }



    res.render('estudiantes/show', {
      title: 'Detalle del Artista',
      artista
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al cargar los datos del artista'
    });
  }
};
