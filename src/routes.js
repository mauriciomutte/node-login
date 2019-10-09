const express = require('express');
const routes = express.Router();

const auth = require('./middleware/auth');
const Register = require('./controllers/Register');
const Login = require('./controllers/Login');

//Home
routes.get('/', auth, (req, res) => {
  res.send('HOME!')
});

//Register
routes.post('/register', Register);

// Login
routes.post('/login', Login);

module.exports = routes;