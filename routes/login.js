const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');
const { ensureAuthenticated } = require('../config/auth');

// Index page
router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register route
router.post('/register', (req, res) => {
  const {name, email, password, passwordConfirm} = req.body;
  let errors = [];

  //validations
  if (!name || !email || !password || !passwordConfirm) {
    errors.push({msg: 'Please, enter all filds'});
  }

  if (password !== passwordConfirm) {
    errors.push({msg: 'Passwords do not match'});
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      passwordConfirm,
    });
  } else {
    // create new user
    const newUser = new User({
      name,
      email,
      password
    });

    // encrypt password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('/login');
          })
          .catch(err => console.log(err));
      });
    });
  }
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard/',
    failureRedirect: '/login',
    failureMessage: true,
  })(req, res, next);
});

// Logout route
router.get('/logout', (req,res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login')
});

module.exports = router;