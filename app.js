const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// Rutas
const authRoutes = require('./routes/authRoute');
const usuariosRoutes = require('./routes/usuariosRoute');
const eventosRoutes = require('./routes/eventosRoute');
const ventasRoutes = require('./routes/ventaRoute');
const organizadoresRoutes = require('./routes/organizadoresRoute');
const compraRoutes = require('./routes/compraRoute');
const rolesRoutes = require('./routes/rolesRoute');
const boletasRoutes = require('./routes/boletasRoute');
const artistasRoutes = require('./routes/artistasRoute');

const PORT = process.env.PORT || 3000;

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware para debuguear cookies
app.use((req, res, next) => {
  console.log('Cookies recibidas:', req.cookies);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
   res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' https://cdn.jsdelivr.net https://code.jquery.com https://stackpath.bootstrapcdn.com https://cdn.tailwindcss.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://stackpath.bootstrapcdn.com https://cdnjs.cloudflare.com; " +
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; " +
    "img-src 'self' data:; " +
    "connect-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self';"
  );
  next();
});

// Rutas
app.use('/', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/eventos', eventosRoutes);
app.use('/ventas', ventasRoutes);
app.use('/organizadores', organizadoresRoutes);
app.use('/compra', compraRoutes);
app.use('/roles', rolesRoutes);
app.use('/boletas', boletasRoutes);
app.use('/artistas', artistasRoutes);
app.use('/admin', (req, res) => {
  res.render('index');
})

// Página principal
app.get('/', (req, res) => {
  res.render('home/index', { title: 'Sistema de Gestión de Eventos' });
});

// Página 404
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});