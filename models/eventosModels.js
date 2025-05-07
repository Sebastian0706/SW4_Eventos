const pool = require('../config/database');

class Evento {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM eventos ORDER BY fecha_inicio_evento');
    return rows;
  }

  static async getById(id_evento) {
    const [rows] = await pool.query('SELECT * FROM eventos WHERE id_evento = ?', [id_evento]);
    return rows[0];
  }

  static async create(evento) {
    const { nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento, 
      aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_apertura, genero_evento, 
      edad_minima, id_artista_PK, id_organizador_PK 
    } = evento;

    const [result] = await pool.query(
      'INSERT INTO eventos (nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento, aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_apertura, genero_evento, edad_minima, id_artista_PK, id_organizador_PK) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento, aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_apertura, genero_evento, edad_minima, id_artista_PK, id_organizador_PK]
    );
    return result.insertId;
  }

  static async update(id_evento, evento) {
    const { nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento, 
      aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_apertura, genero_evento, 
      edad_minima, id_artista_PK, id_organizador_PK 
    } = evento;

    const [result] = await pool.query(
      `UPDATE eventos SET 
        nombre_evento = ?, categoria_evento = ?, lugar_evento = ?, ciudad_evento = ?, 
        departamento_evento = ?, aforo_evento = ?, fecha_inicio_evento = ?, 
        fecha_fin_evento = ?, hora_apertura = ?, genero_evento = ?, edad_minima = ?, 
        id_artista_PK = ?, id_organizador_PK = ? 
        WHERE id_evento = ?`,
      [nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento, aforo_evento, 
       fecha_inicio_evento, fecha_fin_evento, hora_apertura, genero_evento, edad_minima, 
       id_artista_PK, id_organizador_PK, id_evento]
    );
    return result.affectedRows > 0;
  }

  static async delete(id_evento) {
    const [result] = await pool.query('DELETE FROM eventos WHERE id_evento = ?', [id_evento]);
    return result.affectedRows > 0;
  }

  static async getByFilters({ genero_evento, fecha, ubicacion, precioMax }) {
    let query = 'SELECT * FROM eventos WHERE 1=1';
    const params = [];
  
    if (genero_evento) query += ' AND genero_evento = ?', params.push(genero_evento);
    if (fecha) query += ' AND fecha_inicio_evento = ?', params.push(fecha);
    if (ubicacion) query += ' AND lugar_evento = ?', params.push(ubicacion);
    if (precioMax) query += ' AND precio_evento <= ?', params.push(precioMax); 
  
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async getEntradasVendidas(eventoId) {
    const [rows] = await pool.query('SELECT * FROM entradas WHERE evento_id = ?', [eventoId]);
    return rows;
  }

  static async generarEntrada(usuario_id, evento_id) {
    const codigoQR = `QR-${evento_id}-${usuario_id}-${Date.now()}`;
    const [result] = await pool.query(
      'INSERT INTO entradas (usuario_id, evento_id, codigo_qr) VALUES (?, ?, ?)',
      [usuario_id, evento_id, codigoQR]
    );
    return result.insertId;
  }
}

module.exports = Evento;