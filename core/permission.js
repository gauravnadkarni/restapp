const {Permissions} = require('../database/models');

module.exports = {
    gePermissionByName : (name) => {
        return Permissions.findOne({where : {name : name}});
    },
    getPermissionById : (id) => {
        return Permissions.findOne({where : {id : id}});
    }
};