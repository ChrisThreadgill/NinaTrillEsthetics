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
          date: 6102022,
          startTime: 12,
          hours: 2,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3",
        },
        {
          date: 6102022,
          startTime: 14,
          hours: 2,
          employeeId: 2,
          customerId: 3,
          services: "1 2",
        },
        {
          date: 6112022,
          startTime: 12,
          hours: 2,
          employeeId: 2,
          customerId: 3,
          services: "2",
        },
        {
          date: 6112022,
          startTime: 15,
          hours: 3,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6122022,
          startTime: 10,
          hours: 0.5,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6122022,
          startTime: 10.5,
          hours: 0.5,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6122022,
          startTime: 12,
          hours: 4.5,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6132022,
          startTime: 10,
          hours: 8,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6142022,
          startTime: 15,
          hours: 2.5,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6142022,
          startTime: 10,
          hours: 1,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6072022,
          startTime: 10.5,
          hours: 3,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6072022,
          startTime: 14.5,
          hours: 1.5,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
        },
        {
          date: 6072022,
          startTime: 18.5,
          hours: 0.5,
          employeeId: 2,
          customerId: 3,
          services: "1 2 3 4",
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
