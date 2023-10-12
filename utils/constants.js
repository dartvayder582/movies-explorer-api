const resTemplate = (data) => ({
  _id: data._id,
  email: data.email,
  name: data.name,
});

const celebrateConfig = {
  message: 'Переданы некорректные данные',
};

const regexLink = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const regexName = /^[\p{L}\-'\s]+$/;

module.exports = {
  celebrateConfig,
  resTemplate,
  regexLink,
  regexName,
};
