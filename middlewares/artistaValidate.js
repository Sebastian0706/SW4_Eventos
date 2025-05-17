const { body } = require('express-validator');


const validateArtistas = [
    body('nombre_artista')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
  
   ];


   module.exports = validateArtistas;