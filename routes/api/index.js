var router = require('express').Router();

router.use('/devices',require('./devices'));
router.use('/users',require('./user'));
router.use('/auth',require('./auth'));

module.exports = router;