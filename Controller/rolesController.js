const { validationResult } = require('express-validator');
const Rol = require('../models/rolesModels');

// Listar todos los roles
exports.index = async (req, res) => {
  try {
    const roles = await Rol.getAll();
    res.render('admin/roles/index', { title: 'Listado de Roles', roles });
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron cargar los roles.' });
  }
};

// Mostrar formulario para crear rol
exports.create = (req, res) => {
  res.render('admin/roles/form', {
    title: 'Crear Rol',
    rol: {},
    errors: [],
    isEditing: false,
  });
};

// Guardar nuevo rol
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('admin/roles/form', {
      title: 'Crear Rol',
      rol: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    const { nombre_rol, acciones_rol } = req.body;
    const nuevoId = await Rol.create(nombre_rol, acciones_rol);

    // Redirigir al detalle del nuevo rol creado con prefijo /admin
    res.redirect(`/admin/roles/${nuevoId}`);
  } catch (error) {
    console.error('Error al guardar rol:', error);
    res.render('admin/roles/form', {
      title: 'Crear Rol',
      rol: req.body,
      errors: [{ msg: 'Error al guardar el rol.' }],
      isEditing: false
    });
  }
};

// Mostrar formulario para editar rol
exports.edit = async (req, res) => {
  try {
    const rol = await Rol.getById(req.params.id_rol);
    if (!rol) {
      return res.status(404).render('error', { title: 'Rol no encontrado', message: 'El rol solicitado no existe.' });
    }
    res.render('admin/roles/form', {
      title: 'Editar Rol',
      rol,
      errors: [],
      isEditing: true,
      action: `/admin/roles/${rol.id_rol}?_method=PUT`,
      method: 'PUT'
    });
  } catch (error) {
    console.error('Error al obtener rol:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudo cargar el rol.' });
  }
};

// Actualizar rol
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_rol = req.params.id_rol;

  if (!errors.isEmpty()) {
    return res.render('admin/roles/form', {
      title: 'Editar Rol',
      rol: { ...req.body, id_rol },
      errors: errors.array(),
      isEditing: true,
      action: `/admin/roles/${id_rol}?_method=PUT`,
      method: 'PUT'
    });
  }

  try {
    const { nombre_rol, acciones_rol } = req.body;
    const success = await Rol.update(id_rol, nombre_rol, acciones_rol);
    if (!success) {
      return res.status(404).render('error', { title: 'Rol no encontrado', message: 'El rol que intentas actualizar no existe.' });
    }
    // Redirigir a listado con prefijo /admin
    res.redirect('/admin/roles');
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.render('admin/roles/form', {
      title: 'Editar Rol',
      rol: { ...req.body, id_rol },
      errors: [{ msg: 'Error al actualizar el rol.' }],
      isEditing: true,
      action: `/admin/roles/${id_rol}?_method=PUT`,
      method: 'PUT'
    });
  }
};

// Eliminar rol
exports.delete = async (req, res) => {
  try {
    const success = await Rol.delete(req.params.id_rol);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Rol no encontrado' });
    }
    // Redirigir a listado con prefijo /admin
    res.redirect('/admin/roles');
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el rol' });
  }
};

// Mostrar detalle del rol
exports.show = async (req, res) => {
  try {
    const rol = await Rol.getById(req.params.id_rol);
    if (!rol) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Rol no encontrado.'
      });
    }
    res.render('admin/roles/show', {
      title: 'Detalle del Rol',
      rol
    });
  } catch (error) {
    console.error('Error al mostrar detalles del rol:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al cargar los detalles del rol.'
    });
  }
};
