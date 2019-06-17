'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resources = sequelize.define('Resources', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Resources.associate = function(models) {
    Resources.hasMany(models.Rbac,{ foreignKey: 'resourceId',allowNull: false });
  };
  return Resources;
};