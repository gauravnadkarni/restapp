'use strict';
let sequelize = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [{
        name: 'superadmin',
        description: 'Single account to control everything. This is the account with all the privileges',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'admin',
        description: 'Limited privileges compared to superadmin and can be multple',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'superuser',
        description: 'Can be one per organization',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
      name: 'user',
      description: 'Can be many per organization',
      createdAt: new Date(),
      updatedAt: new Date()
  },{
    name: 'guest',
    description: 'Has very limited access',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', {name: {[sequelize.Op.in]: ['superadmin', 'admin', 'superuser', 'user', 'guest']}}, {});
  }
};
