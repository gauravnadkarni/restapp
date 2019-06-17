'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    Roles.hasMany(models.User,{ foreignKey: 'roleId',allowNull: false });
    Roles.hasMany(models.Rbac,{ foreignKey: 'roleId',allowNull: false });
  };
  return Roles;
};