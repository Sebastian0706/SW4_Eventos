const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'eventos_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Inicializar las tablas si no existen
async function initDb() {
  try {
    const connection = await pool.getConnection();

    // Tabla de usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        primer_nombre VARCHAR(200) NOT NULL,
        segundo_nombre VARCHAR(200),
        primer_apellido VARCHAR(200) NOT NULL,
        segundo_apellido VARCHAR(200),
        tipo_documento VARCHAR(100) NOT NULL,
        n_documento INT NOT NULL,
        edad INT CHECK (edad >= 16),
        FOREIGN KEY (id_rol) REFERENCES roles(id) ON DELETE CASCADE
      )
    `);


    // Tabla roles 
    await connection.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL
      )
    `);


    // Tabla compras
    await connection.query(`
      CREATE TABLE IF NOT EXISTS compras (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cantidad_boletas INT NOT NULL,
        valor_entrada INT NOT NULL,
        pago INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
        FOREIGN KEY (id_boleta) REFERENCES boletas(id) ON DELETE CASCADE,
        UNIQUE KEY unique_compra (id_usuario, id_boleta)

      )
    `);

    // Tabla ventas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS ventas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        total INT NOT NULL,
        forma_pago VARCHAR(100) NOT NULL,
        FOREIGN KEY (id_compra) REFERENCES compras(id) ON DELETE CASCADE

      )
    `);

    // Tabla boletas
    await connection.query(`
    CREATE TABLE IF NOT EXISTS boletas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      precio INT NOT NULL,
      tipo VARCHAR(100) NOT NULL,
      localidad VARCHAR(100) NOT NULL,
      FOREIGN KEY (id_evento) REFERENCES eventos(id) ON DELETE CASCADE

    )
  `);

    // Tabla Eventos
    await connection.query(`
    CREATE TABLE IF NOT EXISTS eventos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(200) NOT NULL,
      lugar VARCHAR(200) NOT NULL,
      aforo INT NOT NULL,
      fecha DATE NOT NULL,
      hora DATETIME NOT NULL,
      tipo VARCHAR(200) NOT NULL,
      FOREIGN KEY (id_artista) REFERENCES artistas(id) ON DELETE CASCADE,
      FOREIGN KEY (id_organizador) REFERENCES organizadores(id) ON DELETE CASCADE,
      UNIQUE KEY unique_evento (id_artista, id_organizador)

    )
  `);

    // Tabla organizadores
    await connection.query(`
      CREATE TABLE IF NOT EXISTS organizadores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        primer_nombre VARCHAR(200) NOT NULL,
        segundo_nombre VARCHAR(200),
        primer_apellido VARCHAR(200) NOT NULL,
        segundo_apellido VARCHAR(200),
        tipo_documento VARCHAR(100) NOT NULL,
        n_documento INT NOT NULL
      )
    `);

    // Tabla artistas

    await connection.query(`
      CREATE TABLE IF NOT EXISTS artistas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        primer_nombre VARCHAR(200) NOT NULL,
        segundo_nombre VARCHAR(200),
        primer_apellido VARCHAR(200) NOT NULL,
        segundo_apellido VARCHAR(200),
        tipo_documento VARCHAR(100) NOT NULL,
        n_documento INT NOT NULL,
        tipo VARCHAR(250) 
      )
    `);


    connection.release();
    console.log("Base de datos inicializada correctamente");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
}


initDb();

module.exports = pool;