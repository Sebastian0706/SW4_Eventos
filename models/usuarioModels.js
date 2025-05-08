const pool = require('../config/database');

class Usuario {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios ORDER BY primer_apellido, primer_nombre');
      return rows;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  static async getById(id_usuario) {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id_usuario}:`, error);
      throw error;
    }
  }

  static async findByUsername(nombre_usuario) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE nombre_usuario = ?',
        [nombre_usuario]
      );
      return rows[0]; 
    } catch (error) {
      console.error(`Error al buscar usuario por nombre de usuario ${nombre_usuario}:`, error);
      throw error;
    }
  }

  static async create(usuario) {
    try {
      const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, fecha_nacimiento,
        celular_usuario, direccion_usuario, nombre_usuario, correo, contrasena, id_rol_PK } = usuario;

      const [result] = await pool.query(
        `INSERT INTO usuarios (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, fecha_nacimiento,
          celular_usuario, direccion_usuario, nombre_usuario, correo, contrasena, id_rol_PK) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, fecha_nacimiento,
          celular_usuario, direccion_usuario, nombre_usuario, correo, contrasena, id_rol_PK
        ]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  static async update(id_usuario, usuario) {
    try {
      const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, fecha_nacimiento,
        celular_usuario, direccion_usuario, nombre_usuario, correo, contrasena, id_rol_PK } = usuario;

      const [result] = await pool.query(
        `UPDATE usuarios SET primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?,
        tipo_documento = ?, numero_documento = ?, fecha_nacimiento = ?, celular_usuario = ?, direccion_usuario = ?,
        nombre_usuario = ?, correo = ?, contrasena = ?, id_rol_PK = ? WHERE id_usuario = ?`,
        [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, fecha_nacimiento,
          celular_usuario, direccion_usuario, nombre_usuario, correo, contrasena, id_rol_PK, id_usuario]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id_usuario}:`, error);
      throw error;
    }
  }

  static async delete(id_usuario) {
    try {
      const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id_usuario}:`, error);
      throw error;
    }
  }
}

module.exports = Usuario;