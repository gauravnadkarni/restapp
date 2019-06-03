const {User} = require('../database/models');

class UserHandler {
    constructor() {

    }

    createUser (userObj) {
        return User.create(userObj);
    }

    getUsers () {
        return User.findAll();
    }
}

module.exports = UserHandler;