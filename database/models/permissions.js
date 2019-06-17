'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Permissions.associate = function(models) {
    Permissions.hasMany(models.Rbac,{ foreignKey: 'permissionId',allowNull: false });
  };
  return Permissions;
};