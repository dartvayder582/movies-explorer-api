const router = require('express').Router();
const {
  addMovieValidation,
  movieIdValidation,
} = require('../utils/validationConfig');

const {
  getMovies,
  addMovie,
  deleteMovie,
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

module.exports = router;
