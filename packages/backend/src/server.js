const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

// Database
mongoose.connect(
  'mongodb://localhost:27017/node-login', 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Middlewares & Routes
app.use(express.json());
app.use(routes);

// Server
app.listen(3030);