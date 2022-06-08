"use strict";
module.exports = (sequelize, DataTypes) => {
  const userService = sequelize.define(
    "userService",
    {
      serviceId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  userService.associate = function (models) {
    // associations can be defined here
  };
  return userService;
};
