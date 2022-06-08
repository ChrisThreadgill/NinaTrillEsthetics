"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "appointmentServices",
      [
        {
          serviceId: 1,
          appointmentId: 2,
        },
        {
          serviceId: 2,
          appointmentId: 2,
        },
        {
          serviceId: 2,
          appointmentId: 2,
        },
        {
          serviceId: 1,
          appointmentId: 2,
        },
        {
          serviceId: 3,
          appointmentId: 2,
        },
        {
          serviceId: 4,
          appointmentId: 2,
        },
        {
          serviceId: 3,
          appointmentId: 3,
        },
        {
          serviceId: 2,
          appointmentId: 4,
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
    return queryInterface.bulkDelete("appointmentServices", null, {});
  },
};
