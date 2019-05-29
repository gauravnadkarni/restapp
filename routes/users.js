var express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../database/models');
const passport = require("passport");
var router = express.Router();


/* GET users listing. */
router.get('/', [passport.authenticate('jwt', {session: false})],function(req, res, next) {
  console.log(req.user);
  res.status(200);
  res.json({'message':'respond with a resource'});
});

router.post('/register', function(req, res, next) {
  let {firstName,lastName,email,password} = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
    User.create({firstName : firstName, lastName : lastName,email : email, password : hash}).then((user) => {
      res.status(201);
      let data = user.toJSON();
      delete data.password;
      res.json({"message":"Created","data" : data});
    }).catch((err)=> {
      res.status(500);
      res.json({"error":err.message});
    });
  });
});

module.exports = router;
