"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Services",
      [
        {
          title: "Test Service",
          description: "Test service Description",
          employeeId: 1,
          price: 50,
        },
        {
          title: "Test Service2",
          description: "Test service Description",
          employeeId: 1,
          price: 50,
        },
        {
          title: "Test Service3",
          description: "Test service Description",
          employeeId: 1,
          price: 50,
        },
        {
          title: "Test Service4",
          description: "Test service Description",
          employeeId: 1,
          price: 50,
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
    return queryInterface.bulkDelete("Services", null, {});
  },
};