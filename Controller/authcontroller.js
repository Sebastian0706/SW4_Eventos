const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const e = require('express');
const dotenv = require('dotenv').config();
const usuario = require('../models/usuarioModels');

exports.register = async(req,res) =>{
    try{
        const {primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      tipo_documento,
      numero_documento,
      fecha_nacimiento,
      celular_usuario,
      direccion_usuario,
      nombre_usuario,
      correo,
      contrasena,
      confirmcontrasena,
    id_rol_PK} = req.body;
        if(!primer_nombre || !primer_apellido || !tipo_documento || !numero_documento ||
      !fecha_nacimiento || !celular_usuario || !direccion_usuario ||
      !nombre_usuario || !correo || !contrasena || !confirmcontrasena || !id_rol_PK){
            return res.status(400).render('authViews/register',{
                error: "Todos los campos son obligatorios",
                nombre_usuario: nombre_usuario || '',
                correo: correo || ''
            });
        }
        //Si hace la parte de confirmar contraseña el codigo 
        //va aqui la validacion
         if (contrasena !== confirmcontrasena) {
            return res.status(400).render('authViews/register', {
                error: 'Las contraseñas no coinciden',
                nombre_usuario: nombre_usuario || '',
                correo: correo || ''
            });
        }

        //existe usuario en bd
        const [existUser] = await pool.query(
            'SELECT * FROM usuarios WHERE nombre_usuario = ? OR correo = ?',
            [nombre_usuario, correo]
        );

        if(existUser.length > 0){
            return res.status(409).render('authViews/register',{
                error: 'El usuario o correo ya existe',
                nombre_usuario: nombre_usuario || '',
                correo: correo || ''
            });
        }

        //Encriptar la constraseña
        const hashedPassword = await bcrypt.hash(contrasena,10);
        await pool.query(
            'INSERT INTO usuarios (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, fecha_nacimiento, celular_usuario, direccion_usuario, nombre_usuario, correo, contrasena,id_rol_PK) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
            [ primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
        tipo_documento, numero_documento, fecha_nacimiento, celular_usuario,
        direccion_usuario, nombre_usuario, correo, hashedPassword,id_rol_PK]
        );

        return res.status(201).render('authViews/login', {
            success: 'Registro exitoso. Ahora puedes iniciar sesion',
            error: null, 
            correo: ''
        });

    } catch(error){
        console.error('Error de resgristo: ', error);
        return res.status(500).render('authViews/register', {
            error: 'Error en el servidor. Inténtalo mas tarde',
            nombre_usuario: req.body.nombre_usuario || '',
            correo: req.body.correo || ''
        });
    }

}

exports.login = async(req, res) =>{
    try{
        const { correo, contrasena} = req.body;
        //validacdion basica de los campos
        if(!correo || !contrasena){
            return res.status(400).render('authViews/login',{
                error: 'Correo y contraseña son obligatorios',
                success: null,
                correo
            });
        }

        //Realizar la busqueda por el email del usuario
        const [ users] = await pool.query('SELECT * FROM usuarios WHERE correo =?', [correo]);
        if(users.length === 0){
            return res.status(400).render('authViews/login',{
                error: "Credenciales incorrectas",
                success: null,
                correo: req.body.correo || ''
            });
        }        
        const user = users[0];

        // Comparar contraseñas
        const iscontrasenaValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!iscontrasenaValid) {
            return res.status(401).render('authViews/login', { 
                error: 'Credenciales incorrectas',
                success: null,
                correo
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id_usuario, nombre_usuario: user.nombre_usuario, correo: user.correo },
                process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Guardar token en cookie
        res.cookie('jwt', token, { 
            httpOnly: true,
            maxAge: 60 * 60 * 1000 //representa que va a durar 1 hora
        });
        
        return res.redirect('/admin');

    }
    catch(error){
        console.error('Error de inicio de sesión:', error);
        return res.status(500).render('authViews/login', {
            error: 'Error en el servidor. Inténtalo más tarde.',
            correo: req.body.correo
        });        
    }

}

//Salir de sesion
exports.logout = (req, res) => {
  res.clearCookie('jwt');
  return res.redirect('/login');
};

//Regresar a la ppal 

exports.getDashboard = (req, res) => {
  return res.render('authViews/dashboard', { 
    user: req.user
  });
};


exports.getAdmin = (req, res) => {
  return res.render('index', { 
    user: req.user
  });
};
