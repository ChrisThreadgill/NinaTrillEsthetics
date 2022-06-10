"use strict";
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      employeeId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      hours: DataTypes.INTEGER,
    },
    {}
  );
  Service.associate = function (models) {
    const columnMapping = {
      through: "userService",
      otherKey: "userId",
      foreignKey: "serviceId",
      onDelete: "CASCADE",
      hooks: true,
    };

    Service.belongsTo(models.User, columnMapping);

    const appointmentMapping = {
      through: "appointmentService",
      otherKey: "appointmentId",
      foreignKey: "serviceId",
    };

    Service.belongsToMany(models.Appointment, appointmentMapping);
  };
  return Service;
};
