'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Permissions', [{
        name: 'create',
        description: 'Permission for creating a resource',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'update',
        description: 'Permission to update a resource',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'delete',
        description: 'Permission for deleting a resource',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'view',
        description: 'Permission for viewing a resource',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'reset',
        description: 'Permission for resetting a resource',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'notify',
        description: 'Permission for creating a notification',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Permissions', {name: {[sequelize.Op.in]: ['create', 'update', 'delete', 'view', 'guest','notify']}}, {});
  }
};
