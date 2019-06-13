'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    Roles.hasMany(models.Users,{ foreignKey: 'roleId',allowNull: false });
  };
  return Roles;
};