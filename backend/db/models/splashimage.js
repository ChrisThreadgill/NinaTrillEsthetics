'use strict';
module.exports = (sequelize, DataTypes) => {
  const splashImage = sequelize.define('splashImage', {
    userId: DataTypes.INTEGER,
    splashUrl: DataTypes.STRING
  }, {});
  splashImage.associate = function(models) {
    // associations can be defined here
  };
  return splashImage;
};