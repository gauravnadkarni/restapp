'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rbac = sequelize.define('Rbac', {
    roleId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {});
  Rbac.associate = function(models) {
    Rbac.belongsTo(models.Roles, { foreignKey: 'roleId', as: 'Role' });
    Rbac.belongsTo(models.Permissions, { foreignKey: 'permissionId', as: 'Permission' });
    Rbac.belongsTo(models.Resources, { foreignKey: 'resourceId', as: 'Resource' });
  };
  return Rbac;
};