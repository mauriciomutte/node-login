const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.headers['auth-token'] || req.headers['authorization'];

  if(!token) return res.status(401).send('Access denied! No token provided.');

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;

    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}