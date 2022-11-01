const jwt = require('jsonwebtoken');

const Unauthorized = require('../utils/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwtForAutorization } = req.cookies;

  if (!jwtForAutorization) {
    throw new Unauthorized('Необходима авторизация');
  }

  const token = jwtForAutorization;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  req.user = payload;

  next();
};
