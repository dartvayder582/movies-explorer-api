const resTemplate = (data) => ({
  _id: data._id,
  email: data.email,
  name: data.name,
});

const celebrateConfig = {
  message: 'Переданы некорректные данные',
};

// response messages
const generalMessage = {
  routeNotFound: 'Ресурс не найден',
  serverError: 'На сервере произошла ошибка',
};
const authMessage = {
  required: 'Необходима авторизация',
  conflict: 'Пользователь с таким e-mail уже существует',
  incorrectLoginData: 'Неправильные почта или пароль',
  logout: 'Вы успешно вышли',
};
const userMessage = {
  conflict: 'Пользователь с таким e-mail уже существует',
  notFound: 'Запрашиваемый пользователь не найден',
};
const movieMessage = {
  notFound: 'Запрашиваемый фильм не найден',
  forbidden: 'Вы не можете удалить сохранённый фильм из профиля другого пользователя',
  deleted: 'Фильм удален',
  incorrectId: 'Некорректный id фильма',
};

const regexLink = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const regexName = /^[\p{L}\-'\s]+$/u;

module.exports = {
  celebrateConfig,
  resTemplate,
  regexLink,
  regexName,
  movieMessage,
  userMessage,
  authMessage,
  generalMessage,
};
