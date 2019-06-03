const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');
const UserHandler = require('../core/user');

container = {};

container.register = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let {firstName,lastName,email,password} = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
      let userHandler = new UserHandler();
      userHandler.createUser({firstName : firstName, lastName : lastName,email : email, password : hash}).then((user) => {
        res.status(201);
        res.json({"message":"Created","data" : user});
      }).catch((err)=> {
        res.status(500);
        res.json({"error":err.message});
      });
    });
};

container.list = function(req, res, next) {
    let userHandler = new UserHandler();
    userHandler.getUsers().then(function(users){
      if(!users) {
        res.status(404);
        res.json({'message':'no users found'}); 
      } else{
        res.status(200);
        res.json({'data':users}); 
      }
    }).catch(function(error){
      res.status(500);
      res.json({'error':'We rae facing some issues at our end'}); 
    });
    
};

module.exports = container;
