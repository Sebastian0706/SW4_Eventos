const pool = require('../config/database');

class CompraBoleta {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM compra_boleta');
    return rows;
  }

  static async getById(id_compro_boleta) {
    const [rows] = await pool.query('SELECT * FROM compra_boleta WHERE id_compro_boleta = ?', [id_compro_boleta]);
    return rows[0];
  }

  static async getByCompraId(id_compra_PK) {
    const [rows] = await pool.query('SELECT * FROM compra_boleta WHERE id_compra_PK = ?', [id_compra_PK]);
    return rows;
  }

  static async create(data) {
    const { id_compra_PK, id_boleta_PK, cantidad } = data;

    const [result] = await pool.query(
      `INSERT INTO compra_boleta (id_compra_PK, id_boleta_PK, cantidad)
       VALUES (?, ?, ?)`,
      [id_compra_PK, id_boleta_PK, cantidad]
    );

    return result.insertId;
  }

  static async update(id_compro_boleta, data) {
    const { id_compra_PK, id_boleta_PK, cantidad } = data;

    const [result] = await pool.query(
      `UPDATE compra_boleta
       SET id_compra_PK = ?, id_boleta_PK = ?, cantidad = ?
       WHERE id_compro_boleta = ?`,
      [id_compra_PK, id_boleta_PK, cantidad, id_compro_boleta]
    );

    return result.affectedRows > 0;
  }

  static async delete(id_compro_boleta) {
    const [result] = await pool.query('DELETE FROM compra_boleta WHERE id_compro_boleta = ?', [id_compro_boleta]);
    return result.affectedRows > 0;
  }
}

module.exports = CompraBoleta;