var router = require('express').Router();

router.use('/devices',require('./devices'));
router.use('/users',require('./user'));

module.exports = router;