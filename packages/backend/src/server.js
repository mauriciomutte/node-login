const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Database
mongoose.connect(
  'mongodb://localhost:27017/node-login', 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Middlewares
app.use(express.json());

// Server
app.listen(3030);