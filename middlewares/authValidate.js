const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('Token en middleware:', token);
  
  if (!token) {
    return res.redirect('/login');
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error de autenticación:', err);
      res.clearCookie('jwt');
      return res.redirect('/login');
    }
    req.user = decoded;
    next();
  });
};

exports.redirectIfAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.jwt;    
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect('/dashboard');
    }    
    next();
  } catch (error) {
    res.clearCookie('jwt');
    next();
  }
};