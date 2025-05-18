const { validationResult } = require('express-validator');
const Evento = require('../models/eventosModels');

// Listar todos los eventos
exports.index = async (req, res) => {
  try {
    const eventos = await Evento.getAll();
    res.render('eventos/index', { title: 'Listado de Eventos', eventos });
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron cargar los eventos.' });
  }
};

// Mostrar formulario para crear evento
exports.create = (req, res) => {
  res.render('eventos/form', { title: 'Crear Evento', evento: {}, errors: [], isEditing: false });
};

// Guardar nuevo evento
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('eventos/form', { title: 'Crear Evento', evento: req.body, errors: errors.array(), isEditing: false });
  }

  try {
    await Evento.create(req.body);
    res.redirect('/eventos');
  } catch (error) {
    console.error('Error al guardar evento:', error);
    res.render('eventos/form', { title: 'Crear Evento', evento: req.body, errors: [{ msg: 'Error al guardar el evento.' }], isEditing: false });
  }
};

// Mostrar formulario para editar evento
exports.edit = async (req, res) => {
  try {
    const evento = await Evento.getById(req.params.id_evento);
    if (!evento) {
      return res.status(404).render('error', { title: 'Evento no encontrado', message: 'El evento solicitado no existe.' });
    }
    res.render('eventos/form', { title: 'Editar Evento', evento, errors: [], isEditing: true });
  } catch (error) {
    console.error('Error al obtener evento:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudo cargar el evento.' });
  }
};

// Actualizar evento
exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_evento = req.params.id_evento;

  if (!errors.isEmpty()) {
    return res.render('eventos/form', { title: 'Editar Evento', evento: { ...req.body, id_evento }, errors: errors.array(), isEditing: true });
  }

  try {
    const success = await Evento.update(id_evento, req.body);
    if (!success) {
      return res.status(404).render('error', { title: 'Evento no encontrado', message: 'El evento que intentas actualizar no existe.' });
    }
    res.redirect('/eventos');
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.render('eventos/form', { title: 'Editar Evento', evento: { ...req.body, id_evento }, errors: [{ msg: 'Error al actualizar el evento.' }], isEditing: true });
  }
};

// Eliminar evento
exports.delete = async (req, res) => {
  try {
    const success = await Evento.delete(req.params.id_evento);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    }
    res.redirect('/eventos');
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el evento' });
  }
};

// Buscar eventos por filtros
exports.filter = async (req, res) => {
  try {
    const { genero_evento, fecha, ubicacion, precioMax } = req.query;
    const eventos = await Evento.getByFilters({ genero_evento, fecha, ubicacion, precioMax });
    res.render('eventos/index', { title: 'Eventos Filtrados', eventos });
  } catch (error) {
    console.error('Error al filtrar eventos:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron filtrar los eventos.' });
  }
};

// Mostrar entradas vendidas para un evento
exports.entradasVendidas = async (req, res) => {
  try {
    const entradas = await Evento.getEntradasVendidas(req.params.id_evento);
    res.render('eventos/entradas', { title: 'Entradas Vendidas', entradas });
  } catch (error) {
    console.error('Error al obtener entradas:', error);
    res.status(500).render('error', { title: 'Error', message: 'No se pudieron obtener las entradas.' });
  }
};