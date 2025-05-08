const { validationResult } = require('express-validator');
const Artista = require('../models/artistasModels');

exports.index = async (req, res) => {
  try {
    const artistas = await Artista.getAll();
    res.render('artistas/index', {
      title: 'Listado de Artistas',
      artistas
    });
  } catch (error) {
    console.error('Error al cargar artistas:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Hubo un error al cargar los artistas'
    });
  }
};

exports.create = (req, res) => {
  res.render('artistas/form', {
    title: 'Registrar Artista',
    artista: {},
    errors: [],
    isEditing: false
  });
};

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
    console.error('Error al crear artista:', error);
    res.render('artistas/form', {
      title: 'Registrar Artista',
      artista: req.body,
      errors: [{ msg: 'Error al registrar el artista.' }],
      isEditing: false
    });
  }
};

exports.edit = async (req, res) => {
  const { id_artista } = req.params;

  try {
    const artista = await Artista.getById(id_artista);
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
    console.error('Error al cargar artista:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al cargar los datos del artista'
    });
  }
};

exports.update = async (req, res) => {
  const { id_artista } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('artistas/form', {
      title: 'Editar Artista',
      artista: { ...req.body, id_artista },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Artista.update(id_artista, req.body);
    if (!success) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Artista no encontrado'
      });
    }
    res.redirect('/artistas');
  } catch (error) {
    console.error('Error al actualizar artista:', error);
    res.render('artistas/form', {
      title: 'Editar Artista',
      artista: { ...req.body, id_artista },
      errors: [{ msg: 'Error al actualizar el artista.' }],
      isEditing: true
    });
  }
};

exports.delete = async (req, res) => {
  const { id_artista } = req.params;

  try {
    const success = await Artista.delete(id_artista);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Artista no encontrado' });
    }
    res.redirect('/artistas');
  } catch (error) {
    console.error('Error al eliminar artista:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el artista' });
  }
};