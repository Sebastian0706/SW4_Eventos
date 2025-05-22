const { body } = require('express-validator');
const Artista = require('../models/artistasModels');

const validateArtistas = [
  body('nombre_artista')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 200 })
    .withMessage('El nombre debe tener entre 2 y 200 caracteres')
    .custom(async (value, { req }) => {
      const artistaExistente = await Artista.findByName(value);

      if (req.method === 'POST') {
        if (artistaExistente) {
          throw new Error('El artista ya está registrado');
        }
      } else if (req.method === 'PUT') {
       
        if (artistaExistente && artistaExistente.id_artista !== parseInt(req.params.id_artista)) {
          throw new Error('Otro artista con ese nombre ya existe');
        }
      }

      return true;
    }),
];

module.exports = validateArtistas;