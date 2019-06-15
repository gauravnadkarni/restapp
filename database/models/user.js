'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  User.associate = function (models) {
    User.belongsTo(models.Roles, { foreignKey: 'roleId', as: 'Role' });
  };
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  User.prototype.getUserRoles = function () {
    return this.getRole().then((role) => {
      if (!role)
        return ["guest"];
      return [role.get('name')];
    })
  };
  return User;
};