const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const routes = require('./routes');

const app = express();
dotenv.config();

// Database
mongoose.connect(
  process.env.DB_CONNECT, 
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