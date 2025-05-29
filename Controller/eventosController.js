const { validationResult } = require('express-validator');
const Evento = require('../models/eventosModels');

// Listar todos los eventos
exports.index = async (req, res) => {
  const user = req.session.user || null;
  try {
    const eventos = await Evento.getAll();
    res.render('admin/eventos/index', { title: 'Listado de Eventos', eventos, user });
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron cargar los eventos.',
      user
    });
  }
};

// Mostrar formulario para crear un nuevo evento
exports.create = (req, res) => {
  const user = req.session.user || null;
  res.render('admin/eventos/form', {
    title: 'Crear Evento',
    evento: {},
    errors: [],
    isEditing: false,
    user
  });
};

// Guardar un nuevo evento
exports.store = async (req, res) => {
  const errors = validationResult(req);
  const user = req.session.user || null;

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/eventos/form', {
      title: 'Crear Evento',
      evento: req.body,
      errors: errors.array(),
      isEditing: false,
      user
    });
  }

  try {
    await Evento.create(req.body);
    res.redirect('/admin/eventos');
  } catch (error) {
    console.error('Error al guardar evento:', error);
    res.status(500).render('admin/eventos/form', {
      title: 'Crear Evento',
      evento: req.body,
      errors: [{ msg: 'Error al guardar el evento.' }],
      isEditing: false,
      user
    });
  }
};

// Mostrar detalle de un evento
exports.show = async (req, res) => {
  const user = req.session.user || null;

  try {
    const evento = await Evento.getById(req.params.id_evento);
    if (!evento) {
      return res.status(404).render('error', {
        title: 'Evento no encontrado',
        message: 'El evento solicitado no existe.',
        user
      });
    }

    res.render('admin/eventos/show', {
      title: 'Detalle del Evento',
      evento,
      user
    });
  } catch (error) {
    console.error('Error al obtener evento:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar el detalle del evento.',
      user
    });
  }
};

// Mostrar formulario para editar un evento existente
exports.edit = async (req, res) => {
  const user = req.session.user || null;

  try {
    const evento = await Evento.getById(req.params.id_evento);
    if (!evento) {
      return res.status(404).render('error', {
        title: 'Evento no encontrado',
        message: 'El evento solicitado no existe.',
        user
      });
    }

    if (evento.fecha_inicio_evento) {
      const fechaInicio = new Date(evento.fecha_inicio_evento);
      if (!isNaN(fechaInicio.getTime())) {
        evento.fecha_inicio_evento = fechaInicio.toISOString().slice(0, 10);
      } else {
        evento.fecha_inicio_evento = null;
      }
    }

    if (evento.fecha_fin_evento) {
      const fechaFin = new Date(evento.fecha_fin_evento);
      if (!isNaN(fechaFin.getTime())) {
        evento.fecha_fin_evento = fechaFin.toISOString().slice(0, 10);
      } else {
        evento.fecha_fin_evento = null;
      }
    }

    if (evento.hora_apertura) {
      if (typeof evento.hora_apertura === 'string') {
        evento.hora_apertura = evento.hora_apertura.slice(0, 5);
      } else if (evento.hora_apertura instanceof Date) {
        evento.hora_apertura = evento.hora_apertura.toISOString().slice(11, 16);
      }
    }

    res.render('admin/eventos/form', {
      title: 'Editar Evento',
      evento,
      errors: [],
      isEditing: true,
      user
    });
  } catch (error) {
    console.error('Error al obtener evento para editar:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudo cargar el evento.',
      user
    });
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  const id_evento = req.params.id_evento; // corregido aquí
  const user = req.session.user || null;

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/eventos/form', {
      title: 'Editar Evento',
      evento: { ...req.body, id_evento },
      errors: errors.array(),
      isEditing: true,
      user
    });
  }

  try {
    const success = await Evento.update(id_evento, req.body);
    if (!success) {
      return res.status(404).render('error', {
        title: 'Evento no encontrado',
        message: 'El evento que intentas actualizar no existe.',
        user
      });
    }
    res.redirect('/admin/eventos');
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(500).render('admin/eventos/form', {
      title: 'Editar Evento',
      evento: { ...req.body, id_evento },
      errors: [{ msg: 'Error al actualizar el evento.' }],
      isEditing: true,
      user
    });
  }
};

// Eliminar un evento
exports.delete = async (req, res) => {
  try {
    const success = await Evento.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    }
    res.redirect('/admin/eventos');
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el evento' });
  }
};

// Filtrar eventos según criterios
exports.filter = async (req, res) => {
  const user = req.session.user || null;
  try {
    const { genero_evento, fecha, ubicacion, precioMax } = req.query;
    const eventos = await Evento.getByFilters({ genero_evento, fecha, ubicacion, precioMax });

    res.render('admin/eventos/index', {
      title: 'Eventos Filtrados',
      eventos,
      user
    });
  } catch (error) {
    console.error('Error al filtrar eventos:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron filtrar los eventos.',
      user
    });
  }
};

// Mostrar entradas vendidas para un evento específico
exports.entradasVendidas = async (req, res) => {
  const user = req.session.user || null;
  try {
    const entradas = await Evento.getEntradasVendidas(req.params.id);
    res.render('admin/eventos/entradas', {
      title: 'Entradas Vendidas',
      entradas,
      user
    });
  } catch (error) {
    console.error('Error al obtener entradas:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'No se pudieron obtener las entradas.',
      user
    });
  }
};
