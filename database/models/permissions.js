'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Permissions.associate = function(models) {
    // associations can be defined here
  };
  return Permissions;
};