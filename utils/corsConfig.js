const corsConfig = {
  credentials: true,
  origin: [
    'http://localhost:3001',
    'https://movie.finder.nomoredomainsrocks.ru',
  ],
};

module.exports = { corsConfig };
