const Card = require('../models/card');
const BadRequest = require('../utils/BadRequest');
const Forbidden = require('../utils/Forbidden');
const NotFound = require('../utils/NotFound');
const InternalServerError = require('../utils/InternalServerError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с указанным id не найдена'));
      } else if (card.owner.toString() !== req.user._id) {
        next(new Forbidden('У вас нет прав для удаления карточки'));
      } else {
        card.remove()
          .then(() => res.send({ data: card }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный id карточки'));
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('Карточка не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный id карточки'));
      } else if (err.message === 'Карточка не найдена') {
        next(new NotFound('Карточка по указанному id не найдена'));
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('Карточка не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный id карточки'));
      } else if (err.message === 'Карточка не найдена') {
        next(new NotFound('Карточка по указанному id не найдена'));
      } else {
        next(new InternalServerError());
      }
    });
};
