const mongoose = require('mongoose');
// const { default: isURL } = require('validator/lib/isURL');
const { regexLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v), // или воспользоваться внутренним методом isURL
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v), // или воспользоваться внутренним методом isURL
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLink.test(v), // или воспользоваться внутренним методом isURL
    },
  },
  // likes: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   default: [],
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
