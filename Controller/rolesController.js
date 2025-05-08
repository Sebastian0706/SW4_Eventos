const { validationResult } = require('express-validator');
const Rol = require('../models/rolesModels');

exports.index = async (req, res) => {
  try {
    const roles = await Rol.getAll();
    res.render('roles/index', {
      title: 'Listado de Roles',
      roles
    });
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar los roles.'
    });
  }
};

exports.create = (req, res) => {
  res.render('roles/form', {
    title: 'Crear Rol',
    rol: {},
    errors: [],
    isEditing: false
  });
};

exports.store = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('roles/form', {
      title: 'Crear Rol',
      rol: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    await Rol.create(req.body.nombre);
    res.redirect('/roles');
  } catch (error) {
    console.error('Error al guardar rol:', error);
    res.render('roles/form', {
      title: 'Crear Rol',
      rol: req.body,
      errors: [{ msg: 'Error al guardar el rol.' }],
      isEditing: false
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const rol = await Rol.getById(req.params.id_rol);

    if (!rol) {
      return res.status(404).render('error', {
        title: 'Rol no encontrado',
        message: 'El rol que buscas no existe.'
      });
    }

    res.render('roles/form', {
      title: 'Editar Rol',
      rol,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error('Error al cargar rol:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar el rol.'
    });
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('roles/form', {
      title: 'Editar Rol',
      rol: { ...req.body, id_rol: req.params.id_rol },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Rol.update(req.params.id_rol, req.body.nombre);

    if (!success) {
      return res.status(404).render('error', {
        title: 'Rol no encontrado',
        message: 'El rol que estás intentando actualizar no existe.'
      });
    }

    res.redirect('/roles');
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.render('roles/form', {
      title: 'Editar Rol',
      rol: { ...req.body, id_rol: req.params.id_rol },
      errors: [{ msg: 'Error al actualizar el rol.' }],
      isEditing: true
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const success = await Rol.delete(req.params.id_rol);

    if (!success) {
      return res.status(404).json({ success: false, message: 'Rol no encontrado' });
    }

    res.redirect('/roles');
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el rol' });
  }
};