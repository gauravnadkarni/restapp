var express = require('express');
var router = express.Router();
const passport = require("passport");
const users = require('../controllers/users');
const { check } = require('express-validator/check');
const userModel = require('../database/models').User;

router.get('/', [passport.authenticate('jwt', {session: false})],users.list);
router.post('/register',[ check('firstName').not().isEmpty().withMessage('Invalid first name supplied'),
                          check('lastName').not().isEmpty().withMessage('Invalid last name supplied'),
                          check('email').isEmail().withMessage('Invalid email supplied').custom(value => {
                            return userModel.findOne({where:{email:value}}).then((record) => {
                              if(record) 
                                return Promise.reject('Email is already in use');
                            });
                          }),
                          check('password').isLength({min:6,max:10}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, "i").withMessage('Invalid password supplied'),
], users.register);

module.exports = router;
