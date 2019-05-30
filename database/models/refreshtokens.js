'use strict';

module.exports = (sequelize, DataTypes) => {
  const RefreshTokens = sequelize.define('RefreshTokens', {
    refreshToken: DataTypes.STRING,
    expiresIn: DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    name:DataTypes.STRING
  }, {});
  RefreshTokens.associate = function(models) {
    RefreshTokens.belongsTo(models.User);
  };
  return RefreshTokens;
};