"use strict";
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      date: DataTypes.INTEGER,
      startTime: DataTypes.NUMERIC,
      hours: DataTypes.NUMERIC,
      employeeId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      services: DataTypes.STRING,
    },
    {}
  );
  Appointment.associate = function (models) {
    Appointment.belongsTo(models.User, { foreignKey: "customerId" });
  };
  return Appointment;
};
