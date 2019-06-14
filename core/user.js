const {User} = require('../database/models');
const roles = require('./role');
const bcrypt = require('bcrypt');

class UserHandler {
    constructor() {

    }

    createUser (userObj) {
        let userPromise = User.create(userObj);
        let rolePromise = roles.getRoleByName('guest');
        return Promise.all([userPromise,rolePromise]).then((vector)=>{
            let user = vector[0];
            let role = vector[1];
            user.setRole(role);
            return user.save();
        });
    }

    getUsers () {
        return User.findAll();
    }

    getUserById (id) {
        return User.findByPk(id);
    }

    generatePassworHash(password,callback) {
        bcrypt.hash(password, 10, callback);
    }
}

module.exports = UserHandler;