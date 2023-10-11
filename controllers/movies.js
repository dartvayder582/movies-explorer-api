const Movies = require('../models/movies');
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require('../errors');

const getMovies = (req, res, next) => Movies.find({})
  .sort('-createdAt')
  .then((movies) => res.send(movies))
  .catch(next);

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  return Movies.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    },
  )
    .then((newMovie) => res.status(201).send(newMovie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  return Movies.findById(_id)
    .then((checkMovie) => {
      if (!checkMovie) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      } else if (checkMovie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить сохранённый фильм из профиля другого пользователя');
      }

      return Movies.deleteOne(checkMovie)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError('Некорректный id фильма'));
          }
          return next(err);
        });
    })
    .catch(next);
};

// const handleLikeCard = (req, res, next, method) => {
//   Cards.findByIdAndUpdate(
//     req.params.cardId,
//     { [method]: { likes: req.user._id } },
//     { new: true },
//   )
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Запрашиваемая карточка не найдена');
//       }
//       return res.send(card);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return next(new BadRequestError('Переданы некорректные данные'));
//       }
//       return next(err);
//     });
// };

// const addLikeCard = (req, res, next) => handleLikeCard(req, res, next, '$addToSet');

// const deleteLikeCard = (req, res, next) => handleLikeCard(req, res, next, '$pull');

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  // addLikeCard,
  // deleteLikeCard,
};
