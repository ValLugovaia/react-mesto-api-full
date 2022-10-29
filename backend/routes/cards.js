const cardsRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { regexp } = require('../utils/regexp');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const handlerValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexp),
  }),
}), createCard);

cardsRouter.delete('/cards/:cardId', handlerValidation, deleteCard);
cardsRouter.put('/cards/:cardId/likes', handlerValidation, likeCard);
cardsRouter.delete('/cards/:cardId/likes', handlerValidation, dislikeCard);

module.exports = cardsRouter;
