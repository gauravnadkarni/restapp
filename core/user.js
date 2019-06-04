const {User} = require('../database/models');
const bcrypt = require('bcrypt');

class UserHandler {
    constructor() {

    }

    createUser (userObj) {
        return User.create(userObj);
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