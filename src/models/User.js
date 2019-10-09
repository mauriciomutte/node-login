const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 5,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
});

const User = mongoose.model('User', UserSchema);

// Validate User
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(200).required().email(),
    password: Joi.string().min(5).max(200).required()
  };

  return Joi.validate(user, schema)
}

exports.User = User; 
exports.validate = validateUser;