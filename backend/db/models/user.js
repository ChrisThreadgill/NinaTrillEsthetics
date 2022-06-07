"use strict";
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fName: DataTypes.STRING,
      lName: DataTypes.STRING,
      phoneNum: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
      role: DataTypes.INTEGER,
      profileUrl: DataTypes.STRING,
      splashUrl: DataTypes.STRING,
      bio: DataTypes.STRING,
      title: DataTypes.STRING,
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.prototype.toSafeObject = function () {
    const { id, fName, lName, email, profileUrl } = this;
    return { id, fName, lName, email, profileUrl };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        email: credential,
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({ email, fName, lName, phoneNum, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      email,
      fName,
      lName,
      phoneNum,
      hashedPassword,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
