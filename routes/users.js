var express = require('express');
var router = express.Router();
const passport = require("passport");
const users = require('../controllers/users');

router.get('/', [passport.authenticate('jwt', {session: false})],users.list);
router.post('/register', users.register);

module.exports = router;
