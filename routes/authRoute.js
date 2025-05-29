const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const authMiddleware = require('../middlewares/authValidate');

// Rutas públicas
router.get('/register', authMiddleware.redirectIfAuthenticated, (req, res) => {
  res.render('authViews/register', { error: null, nombre_usuario: '', correo: '' });
});

router.post('/register', authController.register);

router.get('/login', authMiddleware.redirectIfAuthenticated, (req, res) => {
  res.render('authViews/login', { error: null, success: null, correo: '' });
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Rutas protegidas
router.get('/dashboard', authMiddleware.isAuthenticated, authController.getDashboard);
router.get('/admin', authMiddleware.isAuthenticated, authController.getAdmin);

module.exports = router;