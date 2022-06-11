"use strict";
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
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

    Service.belongsToMany(models.User, columnMapping);
  };
  return Service;
};
