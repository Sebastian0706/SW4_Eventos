const pool = require('../config/database');

class Boleta {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM boletas');
    return rows;
  }

  static async getById(id_boleta) {
    const [rows] = await pool.query('SELECT * FROM boletas WHERE id_boleta = ?', [id_boleta]);
    return rows[0];
  }

  static async getByEventoId(id_evento_PK) {
    const [rows] = await pool.query('SELECT * FROM boletas WHERE id_evento_PK = ?', [id_evento_PK]);
    return rows;
  }

  static async create(boleta) {
    const { precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento_PK } = boleta;

    const [result] = await pool.query(
      `INSERT INTO boletas (precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento_PK)
       VALUES (?, ?, ?, ?, ?)`,
      [precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento_PK]
    );

    return result.insertId;
  }

  static async update(id_boleta, boleta) {
    const { precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento_PK } = boleta;

    const [result] = await pool.query(
      `UPDATE boletas
       SET precio_boleta = ?, tipo_boleta = ?, localidad_boleta = ?, num_personas = ?, id_evento_PK = ?
       WHERE id_boleta = ?`,
      [precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento_PK, id_boleta]
    );

    return result.affectedRows > 0;
  }

  static async delete(id_boleta) {
    const [result] = await pool.query('DELETE FROM boletas WHERE id_boleta = ?', [id_boleta]);
    return result.affectedRows > 0;
  }
}

module.exports = Boleta;