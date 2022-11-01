const jwt = require('jsonwebtoken');

const Unauthorized = require('../utils/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Нужно авторизироваться'));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new Unauthorized('Ошибка при авторизации'));
    return;
  }

  req.user = payload;
  next();
};
