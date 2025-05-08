const { validationResult } = require('express-validator');
const artistaModel = require('../models/artistasModels');

exports.listarArtistas = async (req, res) => {
  try {
    const artistas = await artistaModel.getAll();
    res.status(200).json(artistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cargar los artistas' });
  }
};

exports.agregarArtista = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error en la validación',
      errors: errors.array()
    });
  }

  try {
    await artistaModel.create(req.body);
    res.status(201).json({ message: 'Artista creado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el artista' });
  }
};

exports.editarArtista = async (req, res) => {
  try {
    const artista = await artistaModel.getById(req.params.id_artista);
    if (!artista) {
      return res.status(404).json({ message: 'Artista no encontrado' });
    }
    res.status(200).json(artista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cargar los datos del artista' });
  }
};

exports.actualizarArtista = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error en la validación',
      errors: errors.array()
    });
  }

  try {
    const success = await artistaModel.update(req.params.id_artista, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Artista no encontrado' });
    }
    res.status(200).json({ message: 'Artista actualizado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el artista' });
  }
};

// Eliminar un artista
exports.eliminarArtista = async (req, res) => {
  try {
    const success = await artistaModel.delete(req.params.id_artista);
    if (!success) {
      return res.status(404).json({ message: 'Artista no encontrado' });
    }
    res.status(200).json({ message: 'Artista eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el artista' });
  }
};