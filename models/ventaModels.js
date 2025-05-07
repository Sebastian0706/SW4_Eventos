const pool = require('../config/database');

class Venta {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM ventas');
    return rows;
  }

  static async getById(id_venta) {
    const [rows] = await pool.query('SELECT * FROM ventas WHERE id_venta = ?', [id_venta]);
    return rows[0];
  }

  static async create(venta) {
    const { valor_total, fecha_venta, metodo_pago, id_compra_PK } = venta;

    const [result] = await pool.query(
      `INSERT INTO ventas (valor_total, fecha_venta, metodo_pago, id_compra_PK) 
       VALUES (?, ?, ?, ?)`,
      [valor_total, fecha_venta, metodo_pago, id_compra_PK]
    );

    return result.insertId;
  }

  static async update(id_venta, venta) {
    const { valor_total, fecha_venta, metodo_pago, id_compra_PK } = venta;

    const [result] = await pool.query(
      `UPDATE ventas 
       SET valor_total = ?, fecha_venta = ?, metodo_pago = ?, id_compra_PK = ? 
       WHERE id_venta = ?`,
      [valor_total, fecha_venta, metodo_pago, id_compra_PK, id_venta]
    );

    return result.affectedRows > 0;
  }

  static async delete(id_venta) {
    const [result] = await pool.query('DELETE FROM ventas WHERE id_venta = ?', [id_venta]);
    return result.affectedRows > 0;
  }
}

module.exports = Venta;