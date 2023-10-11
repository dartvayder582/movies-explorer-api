const { celebrate, Joi } = require('celebrate');
const { regexLink } = require('./constants');

// card validation
const addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexLink),
    trailerLink: Joi.string().required().regex(regexLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(regexLink),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

// user validation

// const userIdValidation = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().hex().length(24),
//   }),
// });

const userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// const userAvatarValidation = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().regex(regexLink),
//   }),
// });

// auth validation
const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  addMovieValidation,
  movieIdValidation,
  // userIdValidation,
  userInfoValidation,
  // userAvatarValidation,
  signupValidation,
  signinValidation,
};
