const express = require('express');
const router = express.Router();
const rolesController = require('../Controller/rolesController');
const validateRol = require('../middlewares/rolesValidate');


router.get('/', rolesController.index);
router.get('/create', rolesController.create);
router.post('/', validateRol, rolesController.store);
router.get('/:id_rol/edit', rolesController.edit);
router.put('/:id_rol', validateRol, rolesController.update);
router.delete('/:id_rol', rolesController.delete);
router.get('/:id_rol', rolesController.show);


module.exports = router;