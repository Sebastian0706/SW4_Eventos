const { validationResult } = require('express-validator');
const Organizador = require('../models/organizadoresModels');

exports.index = async (req, res) => {
  try {
    const organizadores = await Organizador.getAll();
    res.render('organizadores/index', {
      title: 'Listado de Organizadores',
      organizadores
    });
  } catch (error) {
    console.error('Error al obtener organizadores:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar los organizadores.'
    });
  }
};

exports.create = (req, res) => {
  res.render('organizadores/form', {
    title: 'Crear Organizador',
    organizador: {},
    errors: [],
    isEditing: false
  });
};

exports.store = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('organizadores/form', {
      title: 'Crear Organizador',
      organizador: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    await Organizador.create(req.body);
    res.redirect('/organizadores');
  } catch (error) {
    console.error('Error al guardar organizador:', error);
    res.render('organizadores/form', {
      title: 'Crear Organizador',
      organizador: req.body,
      errors: [{ msg: 'Error al guardar el organizador.' }],
      isEditing: false
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const organizador = await Organizador.getById(req.params.id);

    if (!organizador) {
      return res.status(404).render('error', {
        title: 'No encontrado',
        message: 'El organizador que buscas no existe.'
      });
    }

    res.render('organizadores/form', {
      title: 'Editar Organizador',
      organizador,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error('Error al cargar organizador:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar el organizador.'
    });
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('organizadores/form', {
      title: 'Editar Organizador',
      organizador: { ...req.body, id_organizador: req.params.id },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Organizador.update(req.params.id, req.body);

    if (!success) {
      return res.status(404).render('error', {
        title: 'No encontrado',
        message: 'El organizador que intentas actualizar no existe.'
      });
    }

    res.redirect('/organizadores');
  } catch (error) {
    console.error('Error al actualizar organizador:', error);
    res.render('organizadores/form', {
      title: 'Editar Organizador',
      organizador: { ...req.body, id_organizador: req.params.id },
      errors: [{ msg: 'Error al actualizar el organizador.' }],
      isEditing: true
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const success = await Organizador.delete(req.params.id);

    if (!success) {
      return res.status(404).json({ success: false, message: 'Organizador no encontrado' });
    }

    res.redirect('/organizadores');
  } catch (error) {
    console.error('Error al eliminar organizador:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el organizador' });
  }
};