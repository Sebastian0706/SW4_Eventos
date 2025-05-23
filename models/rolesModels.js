const pool = require('../config/database');

class Rol {
    static async getAll() {
      const [rows] = await pool.query('SELECT * FROM roles ORDER BY nombre_rol');
      return rows;
    }
  
    static async getById(id_rol) {
      const [rows] = await pool.query('SELECT * FROM roles WHERE id_rol = ?', [id_rol]);
      return rows[0];
    }
  
    static async getByNombre(nombre_rol) {
      const [rows] = await pool.query('SELECT * FROM roles WHERE nombre_rol = ?', [nombre_rol]);
      return rows[0];
    }
  
    static async create(nombre_rol) {
      const [result] = await pool.query(
        'INSERT INTO roles (nombre_rol) VALUES (?)',
        [nombre_rol]
      );
      return result.insertId;
    }
  
    static async update(id_rol, nombre_rol) {
      const [result] = await pool.query(
        'UPDATE roles SET nombre_rol = ? WHERE id_rol = ?',
        [nombre_rol, id_rol]
      );
      return result.affectedRows > 0;
    }
  
    static async delete(id_rol) {
      const [result] = await pool.query('DELETE FROM roles WHERE id_rol = ?', [id_rol]);
      return result.affectedRows > 0;
    }
  }
  
  module.exports = Rol;