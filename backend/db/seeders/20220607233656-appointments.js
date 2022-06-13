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
          date: 6222022,
          startTime: 12,
          hours: 2.5,
          employeeId: 2,
          customerId: 4,
          services: "3 11",
        },
        {
          date: 6222022,
          startTime: 14,
          hours: 1.5,
          employeeId: 3,
          customerId: 5,
          services: "4 5 6",
        },
        {
          date: 6222022,
          startTime: 12,
          hours: 1,
          employeeId: 1,
          customerId: 5,
          services: "2",
        },
        {
          date: 6222022,
          startTime: 15,
          hours: 3,
          employeeId: 1,
          customerId: 4,
          services: "2 3 10",
        },
        {
          date: 6132022,
          startTime: 15,
          hours: 0.5,
          employeeId: 1,
          customerId: 4,
          services: "13",
        },
        {
          date: 6132022,
          startTime: 10.5,
          hours: 1,
          employeeId: 2,
          customerId: 4,
          services: "1",
        },
        {
          date: 6132022,
          startTime: 12,
          hours: 2.5,
          employeeId: 1,
          customerId: 5,
          services: " 2 3 4 5 6",
        },
        {
          date: 6142022,
          startTime: 14.5,
          hours: 0.5,
          employeeId: 3,
          customerId: 4,
          services: "5",
        },
        {
          date: 6142022,
          startTime: 15,
          hours: 0.5,
          employeeId: 3,
          customerId: 5,
          services: "4",
        },
        {
          date: 6142022,
          startTime: 11.5,
          hours: 1,
          employeeId: 2,
          customerId: 5,
          services: "2",
        },
        {
          date: 6152022,
          startTime: 10.5,
          hours: 1,
          employeeId: 2,
          customerId: 4,
          services: "3",
        },
        {
          date: 6152022,
          startTime: 11,
          hours: 0.5,
          employeeId: 1,
          customerId: 5,
          services: "13",
        },
        {
          date: 6152022,
          startTime: 14,
          hours: 2,
          employeeId: 1,
          customerId: 4,
          services: "11 13",
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
