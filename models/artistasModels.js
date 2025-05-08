const pool = require('../config/database');

class Artista {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM artistas ORDER BY nombre_artista');
      return rows;
    } catch (error) {
      console.error('Error al obtener artistas:', error);
      throw error;
    }
  }

  static async getById(id_artista) {
    try {
      const [rows] = await pool.query('SELECT * FROM artistas WHERE id_artista = ?', [id_artista]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener artista con ID ${id_artista}:`, error);
      throw error;
    }
  }

  static async create(artista) {
    try {
      const { nombre_artista } = artista;
      const [result] = await pool.query(
        'INSERT INTO artistas (nombre_artista) VALUES (?)',
        [nombre_artista]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear artista:', error);
      throw error;
    }
  }

  static async update(id_artista, artista) {
    try {
      const { nombre_artista } = artista;
      const [result] = await pool.query(
        'UPDATE artistas SET nombre_artista = ? WHERE id_artista = ?',
        [nombre_artista, id_artista]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar artista con ID ${id_artista}:`, error);
      throw error;
    }
  }

  static async delete(id_artista) {
    try {
      const [result] = await pool.query('DELETE FROM artistas WHERE id_artista = ?', [id_artista]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar artista con ID ${id_artista}:`, error);
      throw error;
    }
  }
}

module.exports = Artista;