const { validationResult } = require('express-validator');
const organizadorModel = require('../models/organizadoresModels');

exports.listarOrganizadores = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cargar los organizadores' });
  }
};



exports.agregarOrganizador = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error en la validación',
      errors: errors.array()
    });
  }

  try {
    await usuarioModel.create(req.body);
    res.status(201).json({ message: 'Organizador creado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el Organizador' });
  }
};


exports.editarOrganizador = async (req, res) => {
  try {
    const organizador = await organizadorModel.getById(req.params.id);
    if (!organizador) {
      return res.status(404).json({ message: 'Organizador no encontrado' })
    }
    res.status(200).json(organizador)

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cargar los datos del organizador' })

  }
};

exports.actualizarOrganizador = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Error en la validacion',
      errors: errors.array()
    })

  }

  try {
    const success = await organizadorModel.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Organizador no encontrado' });
    }
    res.status(200).json({ message: 'Organizador actualizado con exito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el organizador' });

  }
};

exports.eliminarOrganizador = async (req, res) => {
  try {
    const success = await organizadorModel.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Organizador no encontrado' });
    }
    res.redirect('/organizador')
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar el Organizador' });
  }
};