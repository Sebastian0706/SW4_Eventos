const { validationResult } = require('express-validator');
const Evento = require('../models/eventosModels');

exports.index = async (req, res) => {
  try {
    const eventos = await Evento.getAll(); 
    res.render('eventos/index', {
      title: 'Listado de Eventos',
      eventos
    });
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar los eventos.'
    });
  }
};

exports.create = async (req, res) => {
  try {
    res.render('eventos/form', {
      title: 'Crear Evento',
      evento: {},  
      errors: [],
      isEditing: false
    });
  } catch (error) {
    console.error('Error al cargar formulario de evento:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar el formulario.'
    });
  }
};

exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('eventos/form', {
      title: 'Crear Evento',
      evento: req.body,
      errors: errors.array(),
      isEditing: false
    });
  }

  try {
    const eventoId = await Evento.create(req.body); 
    res.redirect('/eventos');
  } catch (error) {
    console.error('Error al guardar evento:', error);
    res.render('eventos/form', {
      title: 'Crear Evento',
      evento: req.body,
      errors: [{ msg: 'Error al guardar el evento.' }],
      isEditing: false
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const evento = await Evento.getById(req.params.id_evento);
    if (!evento) {
      return res.status(404).render('error', {
        title: 'Evento no encontrado',
        message: 'El evento que buscas no existe.'
      });
    }

    res.render('eventos/form', {
      title: 'Editar Evento',
      evento,
      errors: [],
      isEditing: true
    });
  } catch (error) {
    console.error('Error al cargar evento:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar el evento.'
    });
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('eventos/form', {
      title: 'Editar Evento',
      evento: { ...req.body, id_evento: req.params.id_evento },
      errors: errors.array(),
      isEditing: true
    });
  }

  try {
    const success = await Evento.update(req.params.id_evento, req.body); 
    if (!success) {
      return res.status(404).render('error', {
        title: 'Evento no encontrado',
        message: 'El evento que estás intentando actualizar no existe.'
      });
    }
    res.redirect('/eventos');
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.render('eventos/form', {
      title: 'Editar Evento',
      evento: { ...req.body, id_evento: req.params.id_evento },
      errors: [{ msg: 'Error al actualizar el evento.' }],
      isEditing: true
    });
  }
};

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

exports.filter = async (req, res) => {
  try {
    const { genero, fecha, ubicacion, precioMax } = req.query;
    const eventos = await Evento.getByFilters({ genero_evento: genero, fecha: fecha, ubicacion: ubicacion, precioMax: precioMax });

    res.render('eventos/index', {
      title: 'Eventos Filtrados',
      eventos
    });
  } catch (error) {
    console.error('Error al filtrar eventos:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron filtrar los eventos.'
    });
  }
};

/*exports.generateEntry = async (req, res) => {
  try {
    const usuario_id = req.user.id; 
    const evento_id = req.params.id_evento;

    const entradaId = await Evento.generarEntrada(usuario_id, evento_id); // Generar entrada con código QR
    res.status(200).json({ success: true, message: 'Entrada generada correctamente', entradaId });
  } catch (error) {
    console.error('Error al generar entrada:', error);
    res.status(500).json({ success: false, message: 'Error al generar la entrada' });
  }
};
*/