"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      days: DataTypes.STRING,
      hours: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      changeRequest: DataTypes.BOOLEAN,
    },
    {}
  );
  Schedule.associate = function (models) {
    Schedule.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Schedule;
};
