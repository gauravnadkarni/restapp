'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resources = sequelize.define('Resources', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Resources.associate = function(models) {
    // associations can be defined here
  };
  return Resources;
};