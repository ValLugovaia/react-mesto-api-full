const usersRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { regexp } = require('../utils/regexp');
const {
  getAllUsers, getUserById, getMyInfo, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/me', getMyInfo);

usersRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexp),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
