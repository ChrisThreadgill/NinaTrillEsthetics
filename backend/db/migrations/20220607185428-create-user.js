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
        type: Sequelize.STRING(75),
      },
      lName: {
        type: Sequelize.STRING(75),
      },
      phoneNum: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        type: Sequelize.STRING(255),
        unique: true,
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      profileUrl: {
        type: Sequelize.STRING,
      },
      splashUrl: {
        type: Sequelize.STRING,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY,
      },
      bio: {
        type: Sequelize.STRING(500),
      },
      title: {
        type: Sequelize.STRING(75),
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
