const { validationResult } = require('express-validator');
const Usuario = require('../models/usuarioModels');
const Rol = require('../models/rolesModels'); // Importar modelo roles

// Listar todos los usuarios
exports.index = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.render('admin/usuarios/index', { title: 'Listado de Usuarios', usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar los usuarios.'
    });
  }
};

// Mostrar formulario para crear usuario
exports.create = async (req, res) => {
  try {
    const roles = await Rol.getAll(); // Obtener lista de roles
    res.render('admin/usuarios/form', {
      title: 'Crear Usuario',
      usuario: {},
      errors: [],
      isEditing: false,
      roles // Enviar roles a la vista
    });
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron cargar los roles.' });
  }
};

// Guardar nuevo usuario
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Al mostrar error, también enviamos roles para el formulario
    const roles = await Rol.getAll();
    return res.render('admin/usuarios/form', {
      title: 'Crear Usuario',
      usuario: req.body,
      errors: errors.array(),
      isEditing: false,
      roles
    });
  }

  try {
    await Usuario.create(req.body);
    res.redirect('/admin/usuarios');
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    const roles = await Rol.getAll();
    res.render('admin/usuarios/form', {
      title: 'Crear Usuario',
      usuario: req.body,
      errors: [{ msg: 'Error al guardar el usuario.' }],
      isEditing: false,
      roles
    });
  }
};

// Mostrar formulario para editar usuario
exports.edit = async (req, res) => {
  try {
    const usuario = await Usuario.getById(req.params.id_usuario);
    if (!usuario) {
      return res.status(404).render('error', {
        title: 'Usuario no encontrado',
        message: 'El usuario solicitado no existe.'
      });
    }

    const roles = await Rol.getAll(); // Obtener roles también
    res.render('admin/usuarios/form', {
      title: 'Editar Usuario',
      usuario,
      errors: [],
      isEditing: true,
      roles, // enviar roles
      action: `/admin/usuarios/${usuario.id_usuario}?_method=PUT`,
      method: 'PUT'
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar el usuario.'
    });
  }
};

// Actualizar usuario
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_usuario = req.params.id_usuario;

  if (!errors.isEmpty()) {
    const roles = await Rol.getAll();
    return res.render('admin/usuarios/form', {
      title: 'Editar Usuario',
      usuario: { ...req.body, id_usuario },
      errors: errors.array(),
      isEditing: true,
      roles,
      action: `/admin/usuarios/${id_usuario}?_method=PUT`,
      method: 'PUT'
    });
  }

  try {
    const success = await Usuario.update(id_usuario, req.body);
    if (!success) {
      return res.status(404).render('error', {
        title: 'Usuario no encontrado',
        message: 'El usuario que intentas actualizar no existe.'
      });
    }
    res.redirect('/admin/usuarios');
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    const roles = await Rol.getAll();
    res.render('admin/usuarios/form', {
      title: 'Editar Usuario',
      usuario: { ...req.body, id_usuario },
      errors: [{ msg: 'Error al actualizar el usuario.' }],
      isEditing: true,
      roles,
      action: `/admin/usuarios/${id_usuario}?_method=PUT`,
      method: 'PUT'
    });
  }
};

// Eliminar usuario
exports.delete = async (req, res) => {
  try {
    const success = await Usuario.delete(req.params.id_usuario);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.redirect('/admin/usuarios');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
  }
};

// Mostrar detalle del usuario
exports.show = async (req, res) => {
  try {
    const usuario = await Usuario.getById(req.params.id_usuario);
    if (!usuario) {
      return res.status(404).render('error', {
        title: 'Usuario no encontrado',
        message: 'El usuario solicitado no existe.'
      });
    }
    res.render('admin/usuarios/show', {
      title: 'Detalle del Usuario',
      usuario
    });
  } catch (error) {
    console.error('Error al mostrar detalles del usuario:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al cargar los detalles del usuario.'
    });
  }
};  
