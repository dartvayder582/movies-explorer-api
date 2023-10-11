const router = require('express').Router();
const { addMovieValidation, movieIdValidation } = require('../utils/validationConfig');

const {
  getMovies,
  addMovie,
  deleteMovie,
  // addLikeCard,
  // deleteLikeCard,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post(
  '/',
  addMovieValidation,
  addMovie,
);
router.delete(
  '/:_id',
  movieIdValidation,
  deleteMovie,
);
// router.put(
//   '/:cardId/likes',
//   cardIdValidation,
//   addLikeCard,
// );
// router.delete(
//   '/:cardId/likes',
//   cardIdValidation,
//   deleteLikeCard,
// );

module.exports = router;
