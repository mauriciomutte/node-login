const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models/User');

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json('Email incorreto!');  

  const matchPassword = bcrypt.compareSync(password, user.password);
  if (!matchPassword) return res.status(400).json('Senha incorreta!');
    
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header('auth-token', token).json({
    id: user._id,
    token,
  });
}

module.exports = login;