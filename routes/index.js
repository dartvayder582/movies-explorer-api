const router = require('express').Router();

const authRoutes = require('./auth');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { NotFoundError } = require('../errors');
const { generalMessage } = require('../utils/constants');

router.use('/', authRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/*', (req, res, next) => next(new NotFoundError(generalMessage.routeNotFound)));

module.exports = router;
