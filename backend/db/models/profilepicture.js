'use strict';
module.exports = (sequelize, DataTypes) => {
  const profilePicture = sequelize.define('profilePicture', {
    userId: DataTypes.INTEGER,
    profileUrl: DataTypes.STRING
  }, {});
  profilePicture.associate = function(models) {
    // associations can be defined here
  };
  return profilePicture;
};