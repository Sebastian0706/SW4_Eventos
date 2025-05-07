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

    // Tabla roles 
    await connection.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id_rol INT AUTO_INCREMENT PRIMARY KEY,
        nombre_rol VARCHAR(100) NOT NULL
      )
    `);

     // Tabla organizadores
     await connection.query(`
      CREATE TABLE IF NOT EXISTS organizadores (
        id_organizador INT AUTO_INCREMENT PRIMARY KEY,
        nombre_organizador VARCHAR(200) NOT NULL,
        tipo_documento VARCHAR(100) NOT NULL,
        num_documento INT NOT NULL,
        direccion VARCHAR(100) NOT NULL
      )
    `);

    // Tabla artistas

    await connection.query(`
      CREATE TABLE IF NOT EXISTS artistas (
        id_artista INT AUTO_INCREMENT PRIMARY KEY,
        nombre_artista VARCHAR(100) NOT NULL
      )
    `);

    
    // Tabla Eventos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS eventos (
        id_evento INT AUTO_INCREMENT PRIMARY KEY,
        nombre_evento VARCHAR(200) NOT NULL,
        categoria_evento VARCHAR(100) NOT NULL,
        lugar_evento VARCHAR(200) NOT NULL,
        ciudad_evento VARCHAR(100) NOT NULL,
        departamento_evento VARCHAR(100) NOT NULL,
        aforo_evento INT NOT NULL,
        fecha_inicio_evento DATE NOT NULL,
        fecha_fin_evento DATE NOT NULL,
        hora_apertura DATETIME NOT NULL,
        genero_evento VARCHAR(200) NOT NULL,
        edad_minima INT NOT NULL,
        id_artista_PK INT NOT NULL,
        id_organizador_PK INT NOT NULL,
        FOREIGN KEY (id_artista_PK) REFERENCES artistas(id_artista) ON DELETE CASCADE,
        FOREIGN KEY (id_organizador_PK) REFERENCES organizadores(id_organizador) ON DELETE CASCADE,
        UNIQUE KEY unique_evento (id_artista_PK, id_organizador_PK)
  
      )
    `);

    // Tabla de usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        primer_nombre VARCHAR(200) NOT NULL,
        segundo_nombre VARCHAR(200),
        primer_apellido VARCHAR(200) NOT NULL,
        segundo_apellido VARCHAR(200),
        tipo_documento VARCHAR(100) NOT NULL,
        numero_documento VARCHAR(50) NOT NULL UNIQUE,
        fecha_nacimiento DATE NOT NULL,
        celular_usuario VARCHAR(100) NOT NULL,
        direccion_usuario VARCHAR(100) NOT NULL,
        nombre_usuario VARCHAR(100) NOT NULL UNIQUE,
        correo VARCHAR(200) NOT NULL UNIQUE,
        contraseña VARCHAR(255) NOT NULL,
        id_rol_PK INT NOT NULL,
        FOREIGN KEY (id_rol_PK) REFERENCES roles(id_rol) ON DELETE CASCADE
      )
    `);


    // Tabla compras
    await connection.query(`
      CREATE TABLE IF NOT EXISTS compras (
        id_compra INT AUTO_INCREMENT PRIMARY KEY,
        cantidad_boletas INT NOT NULL,
        valor_entrada INT NOT NULL,
        valor_servicio INT NOT NULL,
        valor_pago INT NOT NULL,
        id_usuario_PK INT NOT NULL,
        FOREIGN KEY (id_usuario_PK) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
      )
    `);

    // Tabla ventas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS ventas (
        id_venta INT AUTO_INCREMENT PRIMARY KEY,
        valor_total INT NOT NULL,
        fecha_venta DATE NOT NULL,
        metodo_pago VARCHAR(100) NOT NULL,
        id_compra_PK INT NOT NULL,
        FOREIGN KEY (id_compra_PK) REFERENCES compras(id_compra) ON DELETE CASCADE

      )
    `);

    // Tabla boletas
    await connection.query(`
    CREATE TABLE IF NOT EXISTS boletas (
      id_boleta INT AUTO_INCREMENT PRIMARY KEY,
      precio_boleta INT NOT NULL,
      tipo_boleta VARCHAR(100) NOT NULL,
      localidad_boleta VARCHAR(100) NOT NULL,
      num_personas INT NOT NULL,
      id_evento_PK INT NOT NULL,
      FOREIGN KEY (id_evento_PK) REFERENCES eventos(id_evento) ON DELETE CASCADE

    )
  `);
  // Tabla compra_boleta
    await connection.query(`
    CREATE TABLE IF NOT EXISTS compra_boleta (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_compra_PK INT NOT NULL,
      id_boleta_PK INT NOT NULL,
      cantidad INT NOT NULL,
      FOREIGN KEY (id_compra_PK) REFERENCES compras(id_compra) ON DELETE CASCADE,
      FOREIGN KEY (id_boleta_PK) REFERENCES boletas(id_boleta) ON DELETE CASCADE
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