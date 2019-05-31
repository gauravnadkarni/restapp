const {User} = require('../database/models');

class UserHandler {
    constructor() {

    }

    createUser (userObj) {
        return User.create(userObj);
    }
}

module.exports = UserHandler;