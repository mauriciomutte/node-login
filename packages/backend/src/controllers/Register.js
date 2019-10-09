const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/User');

async function register(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already exist!');

  // Encrypted password
  const encrypted = bcrypt.hashSync(password, 10);

  user = await User.create({ name, email, password: encrypted });

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header('auth-token', token);

  res.json(user);
}

module.exports = register;