"use strict";
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      date: DataTypes.INTEGER,
      startTime: DataTypes.INTEGER,
      hours: DataTypes.INTEGER,
      endTime: DataTypes.INTEGER,
      employeeId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      services: DataTypes.STRING,
    },
    {}
  );
  Appointment.associate = function (models) {
    Appointment.belongsTo(models.User);
    const appointmentMapping = {
      through: "appointmentService",
      otherKey: "serviceId",
      foreignKey: "appointmentId",
    };

    Appointment.belongsToMany(models.Service, appointmentMapping);

    Appointment.belongsTo(models.User, { foreignKey: "customerId" });
  };
  return Appointment;
};
