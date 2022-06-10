"use strict";
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      date: DataTypes.DATE,
      startTime: DataTypes.INTEGER,
      endTime: DataTypes.INTEGER,
      hours: DataTypes.INTEGER,
      employeeId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
    },
    {}
  );
  Appointment.associate = function (models) {
    Appointment.belongsTo(models.User, { foreignKey: "customerId" });
    Appointment.belongsTo(models.User, { foreignKey: "employeeId" });
  };
  return Appointment;
};
