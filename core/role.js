const {Roles} = require('../database/models');

module.exports = {
    getRoleByName : (name) => {
        return Roles.findOne({where : {name : name}});
    }
};