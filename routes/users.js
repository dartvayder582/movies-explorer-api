const router = require('express').Router();
const {
  // userIdValidation,
  userInfoValidation,
  // userAvatarValidation,
} = require('../utils/validationConfig');

const {
  // getUsers,
  // getUserById,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

// router.get('/', getUsers);
router.get('/me', getCurrentUser);
// router.get(
//   '/:userId',
//   userIdValidation,
//   getUserById,
// );
router.patch(
  '/me',
  userInfoValidation,
  updateUser,
);
// router.patch(
//   '/me/avatar',
//   userAvatarValidation,
//   updateUser,
// );

module.exports = router;
