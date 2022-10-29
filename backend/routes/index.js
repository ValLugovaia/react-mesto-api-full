const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../utils/NotFound');
const { login, createUser, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { regexp } = require('../utils/regexp');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
router.get('/signout', signout);

router.use('/', auth, usersRouter);
router.use('/', auth, cardsRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
