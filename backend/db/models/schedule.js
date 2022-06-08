"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      days: DataTypes.STRING,
      hours: DataTypes.STRING,
      changeRequest: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      startTime: DataTypes.STRING,
    },
    {}
  );
  Schedule.associate = function (models) {
    // associations can be defined here
    Schedule.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Schedule;
};
