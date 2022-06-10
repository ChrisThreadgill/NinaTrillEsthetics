"use strict";
const bcrypt = require("bcryptjs");

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
          phoneNum: 4795023037,
          email: "manager@test.com",
          role: 3,
          bio: "Started Business",
          title: "Owner",
        },
        {
          fName: "Hannah's",
          lName: "Employee",
          hashedPassword: bcrypt.hashSync("123"),
          phoneNum: 4791231337,
          email: "employee@test.com",
          role: 2,
          bio: "Started Working for hannah",
          title: "Hannah's Employee",
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
        email: { [Op.in]: ["manager@test.com", "employee@test.com", "customer@test.com"] },
      },
      {}
    );
  },
};
