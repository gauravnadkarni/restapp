const bcrypt = require('bcrypt');
const {User} = require('../database/models');

container = {};

container.register = function(req, res, next) {
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
};

container.list = function(req, res, next) {
    console.log(req.user);
    res.status(200);
    res.json({'message':'respond with a resource'}); 
};

module.exports = container;