const pool = require('../config/database');

class Organizador {
  static async getAll() {
    const [rows] = await pool.query(
      'SELECT * FROM organizadores ORDER BY nombre_organizador'
    );
    return rows;
  }

  static async getById(id_organizador) {
    const [rows] = await pool.query('SELECT * FROM organizadores WHERE id_organizador = ?', [id_organizador]);
    return rows[0];
  }

  static async create(organizador) {
    const { nombre_organizador, tipo_documento, num_documento, direccion } = organizador;

    const [result] = await pool.query(
      `INSERT INTO organizadores (
        nombre_organizador, tipo_documento, num_documento, direccion
      ) VALUES (?, ?, ?, ?)`,
      [nombre_organizador, tipo_documento, num_documento, direccion]
    );

    return result.insertId;
  }

  static async update(id_organizador, organizador) {
    const { nombre_organizador, tipo_documento, num_documento, direccion } = organizador;

    const [result] = await pool.query(
      `UPDATE organizadores SET
        nombre_organizador = ?, tipo_documento = ?, num_documento = ?, direccion = ?
        WHERE id_organizador = ?`,
      [nombre_organizador, tipo_documento, num_documento, direccion, id_organizador]
    );

    return result.affectedRows > 0;
  }

  static async delete(id_organizador) {
    const [result] = await pool.query('DELETE FROM organizadores WHERE id_organizador = ?', [id_organizador]);
    return result.affectedRows > 0;
  }
}

module.exports = Organizador;