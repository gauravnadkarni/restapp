'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rbac = sequelize.define('Rbac', {
    roleId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {});
  Rbac.associate = function(models) {
    // associations can be defined here
  };
  return Rbac;
};