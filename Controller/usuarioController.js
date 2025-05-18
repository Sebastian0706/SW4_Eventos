const { validationResult } = require('express-validator');
const Usuario = require('../models/usuarioModels');

// Listar todos los usuarios
exports.index = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.render('usuarios/index', { title: 'Listado de Usuarios', usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron cargar los usuarios.' });
  }
};

// Mostrar formulario para crear usuario
exports.create = (req, res) => {
  res.render('usuarios/form', { title: 'Crear Usuario', usuario: {}, errors: [], isEditing: false });
};

// Guardar nuevo usuario
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('usuarios/form', { title: 'Crear Usuario', usuario: req.body, errors: errors.array(), isEditing: false });
  }

  try {
    await Usuario.create(req.body);
    res.redirect('/usuarios');
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    res.render('usuarios/form', { title: 'Crear Usuario', usuario: req.body, errors: [{ msg: 'Error al guardar el usuario.' }], isEditing: false });
  }
};

// Mostrar formulario para editar usuario
exports.edit = async (req, res) => {
  try {
    const usuario = await Usuario.getById(req.params.id_usuario);
    if (!usuario) {
      return res.status(404).render('error', { title: 'Usuario no encontrado', message: 'El usuario solicitado no existe.' });
    }
    res.render('usuarios/form', { title: 'Editar Usuario', usuario, errors: [], isEditing: true });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudo cargar el usuario.' });
  }
};

// Actualizar usuario
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_usuario = req.params.id_usuario;

  if (!errors.isEmpty()) {
    return res.render('usuarios/form', { title: 'Editar Usuario', usuario: { ...req.body, id_usuario }, errors: errors.array(), isEditing: true });
  }

  try {
    const success = await Usuario.update(id_usuario, req.body);
    if (!success) {
      return res.status(404).render('error', { title: 'Usuario no encontrado', message: 'El usuario que intentas actualizar no existe.' });
    }
    res.redirect('/usuarios');
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.render('usuarios/form', { title: 'Editar Usuario', usuario: { ...req.body, id_usuario }, errors: [{ msg: 'Error al actualizar el usuario.' }], isEditing: true });
  }
};

// Eliminar usuario
exports.delete = async (req, res) => {
  try {
    const success = await Usuario.delete(req.params.id_usuario);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.redirect('/usuarios');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
  }
};