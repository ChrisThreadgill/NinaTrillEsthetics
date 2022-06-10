"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fName: {
        allNull: false,
        type: Sequelize.STRING(75),
      },
      lName: {
        allNull: false,
        type: Sequelize.STRING(75),
      },
      phoneNum: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        allNull: false,
        type: Sequelize.STRING(255),
        unique: true,
      },
      role: {
        allNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      bio: {
        type: Sequelize.STRING(1000),
      },
      title: {
        type: Sequelize.STRING(75),
      },
      hashedPassword: {
        allNull: false,
        type: Sequelize.STRING.BINARY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  },
};
