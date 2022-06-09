"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Appointments",
      [
        {
          date: new Date(),
          startTime: 12,
          hours: 2,
          endTime: 14,
          employeeId: 2,
          customerId: 3,
        },
        {
          date: new Date(),
          startTime: 12,
          hours: 2,
          endTime: 14,
          employeeId: 2,
          customerId: 3,
        },
        {
          date: new Date(),
          startTime: 12,
          hours: 2,
          endTime: 14,
          employeeId: 2,
          customerId: 3,
        },
        {
          date: new Date(),
          startTime: 12,
          hours: 2,
          endTime: 14,
          employeeId: 2,
          customerId: 3,
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
    return queryInterface.bulkDelete("Appointments", null, {});
  },
};
