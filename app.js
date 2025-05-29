const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // <-- Importa express-session

const authRoutes = require('./routes/authRoute');
const usuariosRoutes = require('./routes/usuariosRoute');
const eventosRoutes = require('./routes/eventosRoute');
const ventasRoutes = require('./routes/ventaRoute');
const organizadoresRoutes = require('./routes/organizadoresRoute');
const compraRoutes = require('./routes/compraRoute');
const rolesRoutes = require('./routes/rolesRoute');
const boletasRoutes = require('./routes/boletasRoute');
const artistasRoutes = require('./routes/artistasRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del motor de vistas y carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares para parseo de body y cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Agrega express-session para manejar sesiones
app.use(session({
  secret: 'tu-secreto-muy-seguro',   // Cambia por un secreto seguro
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // Opcional: duración de la cookie en ms (1 hora)
}));

// Middleware para debuguear cookies (opcional, para desarrollo)
app.use((req, res, next) => {
  console.log('Cookies recibidas:', req.cookies);
  next();
});

// Middleware para exponer la variable user en todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.session ? req.session.user : null;
  next();
});

// Middleware para políticas de seguridad Content Security Policy
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

// Middleware para servir archivos estáticos (css, js, img)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para soporte de métodos PUT y DELETE desde formularios
app.use(methodOverride('_method'));

// Rutas
app.use('/', authRoutes);

app.use('/organizadores', organizadoresRoutes);
app.use('/compra', compraRoutes);
app.use('/admin/eventos', eventosRoutes);
app.use('/admin/artistas', artistasRoutes);
app.use('/admin/boletas', boletasRoutes);
app.use('/admin/usuarios', usuariosRoutes);
app.use('/admin/ventas', ventasRoutes);
app.use('/admin/roles', rolesRoutes);

// Ruta para /admin (renderiza vista index)
app.use('/admin', (req, res) => {
  res.render('index', { title: 'Panel Admin' });
});

// Página principal
app.get('/', (req, res) => {
  res.render('home/index', { title: 'Sistema de Gestión de Eventos' });
});

// Manejo de error 404 - Página no encontrada
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
