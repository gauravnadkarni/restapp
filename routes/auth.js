const express = require('express');
const router  = express.Router();
const auth = require('../controllers/auth');


/* POST login. */
router.post('/login', auth.login);

module.exports = router;

