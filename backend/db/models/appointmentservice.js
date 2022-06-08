"use strict";
module.exports = (sequelize, DataTypes) => {
  const appointmentService = sequelize.define(
    "appointmentService",
    {
      serviceId: DataTypes.INTEGER,
      appointmentId: DataTypes.INTEGER,
    },
    {}
  );
  appointmentService.associate = function (models) {
    // associations can be defined here
  };
  return appointmentService;
};
