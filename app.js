// npm
const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// local
const routes = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsConfig } = require('./utils/corsConfig');
const { celebrateConfig } = require('./utils/constants');
const { limiterConfig } = require('./utils/rateLimiterConfig');

const { PORT } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(cors(corsConfig));

// security and validation ПЕРЕДЕЛАТЬ!!!!
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// req logger
app.use(requestLogger);

// req limit
app.use(rateLimit(limiterConfig));

// crash-test
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// auth and routes
app.use(routes);

// err logger
app.use(errorLogger);

// errors
app.use(errors(celebrateConfig));
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
