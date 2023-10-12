const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/user');
const {
  NotFoundError,
  UserExistError,
  NotAuthError,
} = require('../errors');
const { resTemplate } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// signup
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name,
      email,
      password: hash,
    }))
    .then((data) => {
      res.status(201).send(resTemplate(data));
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new UserExistError('Пользователь с таким e-mail уже существует'));
      }
      return next(err);
    });
};

// signin
const login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send(resTemplate(user));
    })
    .catch(() => {
      next(new NotAuthError('Неправильные почта или пароль'));
    });
};

// signout
const logout = (req, res, next) => {
  if (req.cookies.jwt) {
    return res
      .clearCookie('jwt', {
        httpOnly: true,
        sameSite: true,
      })
      .send({ message: 'Вы успешно вышли' });
  }
  return next();
};

// user info
const getCurrentUser = (req, res, next) => Users.findById(req.user._id)
  .then((userData) => res.send(resTemplate(userData)))
  .catch(next);

const updateUser = (req, res, next) => {
  const updateUserData = req.body;

  return Users.findByIdAndUpdate(
    req.user._id,
    updateUserData,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports = {
  login,
  logout,
  createUser,
  updateUser,
  getCurrentUser,
};
