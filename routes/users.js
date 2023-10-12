const router = require('express').Router();
const {
  userInfoValidation,
} = require('../utils/validationConfig');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch(
  '/me',
  userInfoValidation,
  updateUser,
);

module.exports = router;
