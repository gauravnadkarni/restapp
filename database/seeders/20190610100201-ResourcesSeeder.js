'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Resources', [{
        name: 'user',
        description: 'represents user of the system',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'rbac',
        description: 'represents acl related components',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Resources', {name: {[sequelize.Op.in]: ['user', 'rbac']}}, {});
  }
};
