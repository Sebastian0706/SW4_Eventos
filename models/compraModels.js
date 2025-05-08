const pool = require('../config/database');

class Compra {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM compras');
    return rows;
  }

  static async getById(id_compra) {
    const [rows] = await pool.query('SELECT * FROM compras WHERE id_compra = ?', [id_compra]);
    return rows[0];
  }

  static async create(compra) {
    const { cantidad_boletas, valor_entrada, valor_servicio, valor_pago, id_usuario_PK } = compra;

    const [result] = await pool.query(
      `INSERT INTO compras (cantidad_boletas, valor_entrada, valor_servicio, valor_pago, id_usuario_PK)
       VALUES (?, ?, ?, ?, ?)`,
      [cantidad_boletas, valor_entrada, valor_servicio, valor_pago, id_usuario_PK]
    );

    return result.insertId;
  }

  static async update(id_compra, compra) {
    const { cantidad_boletas, valor_entrada, valor_servicio, valor_pago, id_usuario_PK } = compra;

    const [result] = await pool.query(
      `UPDATE compras
       SET cantidad_boletas = ?, valor_entrada = ?, valor_servicio = ?, valor_pago = ?, id_usuario_PK = ?
       WHERE id_compra = ?`,
      [cantidad_boletas, valor_entrada, valor_servicio, valor_pago, id_usuario_PK, id_compra]
    );

    return result.affectedRows > 0;
  }

  static async delete(id_compra) {
    const [result] = await pool.query('DELETE FROM compras WHERE id_compra = ?', [id_compra]);
    return result.affectedRows > 0;
  }
}

module.exports = Compra;