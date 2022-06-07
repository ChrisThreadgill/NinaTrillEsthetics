"use strict";
const bcrypt = require("brcyptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          fName: "Hannah",
          lName: "Eldridge",
          hashedPassword: bcrypt.hashSync("123"),
          phoneNum: 123456,
          email: "manager@test.com",
          role: 3,
        },
        {
          fName: "Hannah's",
          lName: "Employee",
          hashedPassword: bcrypt.hashSync("123"),
          phoneNum: 123456,
          email: "employee@test.com",
          role: 2,
        },
        {
          fName: "Hannah's",
          lName: "Customer",
          hashedPassword: bcrypt.hashSync("123"),
          phoneNum: 123456,
          email: "customer@test.com",
          role: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
