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
          date: 1,
          startTime: 12,
          hours: 2,
          endTime: 14,
          employeeId: 2,
          customerId: 3,
          services: "serv1,serv2",
        },
        {
          date: 1,
          startTime: 12,
          hours: 2,
          endTime: 14,
          employeeId: 2,
          customerId: 3,
          services: "all 4 ",
        },
        {
          date: 1,
          startTime: 12,
          hours: 2,
          endTime: 14,
          employeeId: 2,
          customerId: 3,
          services: "serv3",
        },
        {
          date: 1,
          startTime: 12,
          hours: 2,
          endTime: 14,
          employeeId: 2,
          customerId: 3,
          services: "serv2",
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
