const router = require('express').Router();
const {check} = require('express-validator');

const Auth = require('../../controllers/auth_controller');
const validate = require('../../middelwares/validate');

//register new user
router.post("/register",[
   check('email').isEmail().withMessage('Enter a valid email address')
],validate,Auth.register)

module.exports = router