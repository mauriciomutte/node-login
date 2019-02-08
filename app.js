const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Call express
const app = express();

// Passport config
require('./config/passport')(passport);

// Mongo connect
mongoose.connect('mongodb://localhost:27020/mydb', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Express body parser
app.use(express.urlencoded({ extended: true}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash connect
app.use(flash());

// Flash vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/login.js'));

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Express app listening on port ${PORT}`));