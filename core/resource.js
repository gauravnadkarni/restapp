const {Resources} = require('../database/models');

module.exports = {
    getResourceByName : (name) => {
        return Resources.findOne({where : {name : name}});
    },
    getResourceById : (id) => {
        return Resources.findOne({where : {id : id}});
    }
};