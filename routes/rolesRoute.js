const express = require('express');
const rolesController = require('../Controller/rolesController');
const validateRoles = require('../middlewares/rolesValidate');
const router = express.Router();

//rutas

router.get('/', rolesController.index);
router.get('/create', rolesController.create);
router.post('/', validateRoles, rolesController.store);
router.get('/:id/edit', rolesController.edit);
router.put('/:id', validateRoles, rolesController.update);
router.delete('/:id', rolesController.delete);

module.exports = router;