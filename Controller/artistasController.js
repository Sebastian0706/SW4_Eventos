const { validationResult } = require('express-validator');
const Artista = require('../models/artistasModels');

// Listar todos los artistas
exports.index = async (req, res) => {
  try {
    const artistas = await Artista.getAll();
    res.render('artistas/index', {
      title: 'Listado de Artistas',
      artistas
    });
  } catch (error) {
    console.error('Error al listar artistas:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Hubo un error al cargar los artistas.'
    });
  }
};

// Mostrar formulario para crear un nuevo artista
exports.create = (req, res) => {
  res.render('artistas/form', {
    title: 'Registrar Artista',
    artista: {},
    errors: [],
    isEditing: false
  });
};

// Guardar un nuevo artista
exports.store = async (req, res) => {
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
    console.error('Error al guardar artista:', error);
    res.render('artistas/form', {
      title: 'Registrar Artista',
      artista: req.body,
      errors: [{ msg: 'Error al guardar el artista. Verifique los datos ingresados.' }],
      isEditing: false
    });
  }
};

// Mostrar formulario para editar un artista existente
exports.edit = async (req, res) => {
  try {
    const artista = await Artista.getById(req.params.id_artista);
    if (!artista) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Artista no encontrado.'
      });
    }
    res.render('artistas/form', {
      title: 'Editar Artista',
      artista,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error('Error al obtener artista:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al cargar los datos del artista.'
    });
  }
};

// Actualizar un artista existente
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const artistaData = { ...req.body, id_artista: req.params.id_artista };

  if (!errors.isEmpty()) {
    return res.render('artistas/form', {
      title: 'Editar Artista',
      artista: artistaData,
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Artista.update(req.params.id_artista, req.body);
    if (!success) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Artista no encontrado.'
      });
    }
    res.redirect('/artistas');
  } catch (error) {
    console.error('Error al actualizar artista:', error);
    res.render('artistas/form', {
      title: 'Editar Artista',
      artista: artistaData,
      errors: [{ msg: 'Error al actualizar el artista. Verifique los datos ingresados.' }],
      isEditing: true
    });
  }
};

// Eliminar un artista
exports.delete = async (req, res) => {
  try {
    const success = await Artista.delete(req.params.id_artista);
    if (!success) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Artista no encontrado.'
      });
    }
    res.redirect('/artistas');
  } catch (error) {
    console.error('Error al eliminar artista:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al eliminar el artista.'
    });
  }
};

// Mostrar detalles de un artista
exports.show = async (req, res) => {
  try {
    const artista = await Artista.getById(req.params.id_artista);
    if (!artista) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Artista no encontrado.'
      });
    }
    res.render('artistas/show', {
      title: 'Detalle del Artista',
      artista
    });
  } catch (error) {
    console.error('Error al mostrar detalles del artista:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al cargar los detalles del artista.'
    });
  }
};