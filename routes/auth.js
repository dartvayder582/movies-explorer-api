const router = require('express').Router();
const { signupValidation, signinValidation } = require('../utils/validationConfig');

const {
  login,
  logout,
  createUser,
} = require('../controllers/users');

router.post(
  '/signup',
  signupValidation,
  createUser,
);
router.post(
  '/signin',
  signinValidation,
  login,
);
router.post(
  '/signout',
  logout,
);

module.exports = router;
