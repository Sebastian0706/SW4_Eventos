const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use('/usuarios', usuariosRoutes);
app.use('/eventos', eventosRoutes);
app.use('/ventas', ventasRoutes);
app.use('/organizadores', organizadoresRoutes);
app.use('/compra', compraRoutes);
app.use('/roles', rolesRoutes);
app.use('/boletas', boletasRoutes);
app.use('/artistas', artistasRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Sistema de Gestion de Eventos' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' https://www.gstatic.com;");
  next();
});

});