const express = require('express');
const router  = express.Router();
const auth = require('../controllers/auth');
const { check } = require('express-validator/check');


/* POST login. */
router.post('/login', [ check('email').isEmail().withMessage('Invalid email supplied'),
                        check('password').isLength({min:6,max:10}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, "i").withMessage('Invalid password supplied')
                    ],auth.login);
router.post('/token', [check('refreshToken').not().isEmpty().withMessage('Refresh token is not supplied')],auth.refreshToken);

module.exports = router;

