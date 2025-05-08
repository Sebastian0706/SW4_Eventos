const { validationResult } = require('express-validator');
const Usuario = require('../models/usuarioModels');

// Mostrar el listado de usuarios
exports.index = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.render('usuarios/index', {
      title: 'Listado de Usuarios',
      usuarios
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Hubo un error al cargar los usuarios'
    });
  }
};

// Mostrar formulario para registrar nuevo usuario
exports.create = (req, res) => {
  res.render('usuarios/form', {
    title: 'Registrar Usuario',
    usuario: {},
    errors: [],
    isEditing: false
  });
};

// Guardar nuevo usuario en la base de datos
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('usuarios/form', {
      title: 'Registrar Usuario',
      usuario: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    await Usuario.create(req.body);
    res.redirect('/usuarios');
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    res.render('usuarios/form', {
      title: 'Registrar Usuario',
      usuario: req.body,
      errors: [{ msg: 'Error al guardar el usuario. Verifique que el correo o nombre de usuario no estén duplicados.' }],
      isEditing: false
    });
  }
};

// Mostrar formulario para editar un usuario existente
exports.edit = async (req, res) => {
  try {
    const usuario = await Usuario.getById(req.params.id);
    if (!usuario) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Usuario no encontrado'
      });
    }
    res.render('usuarios/form', {
      title: 'Editar Usuario',
      usuario,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error('Error al obtener usuario para edición:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al cargar los datos del usuario'
    });
  }
};

// Actualizar usuario existente
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('usuarios/form', {
      title: 'Editar Usuario',
      usuario: { ...req.body, id_usuario: req.params.id },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Usuario.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Usuario no encontrado'
      });
    }

    res.redirect('/usuarios');
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.render('usuarios/form', {
      title: 'Editar Usuario',
      usuario: { ...req.body, id_usuario: req.params.id },
      errors: [{ msg: 'Error al actualizar el usuario. El correo o nombre de usuario podría estar duplicado.' }],
      isEditing: true
    });
  }
};

// Eliminar usuario
exports.delete = async (req, res) => {
  try {
    const success = await Usuario.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.redirect('/usuarios');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
  }
};

exports.login = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    const usuario = await Usuario.findByUsername(nombre_usuario);

    if (!usuario) {
      return res.status(401).render('login', { error: 'Usuario no encontrado' });
    }

    if (usuario.contrasena !== contrasena) {
      return res.status(401).render('login', { error: 'Contraseña incorrecta' });
    }

    req.session.usuario = {
      id: usuario.id_usuario,
      rol: usuario.id_rol_PK,
      nombre: usuario.nombre_usuario
    };

    res.redirect('/dashboard'); 
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).render('login', { error: 'Error al iniciar sesión' });
  }
};