"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "userServices",
      [
        {
          userId: 1,
          serviceId: 1,
        },
        {
          userId: 1,
          serviceId: 2,
        },
        {
          userId: 1,
          serviceId: 3,
        },
        {
          userId: 1,
          serviceId: 4,
        },
        {
          userId: 1,
          serviceId: 5,
        },
        {
          userId: 1,
          serviceId: 6,
        },
        {
          userId: 1,
          serviceId: 7,
        },
        {
          userId: 1,
          serviceId: 8,
        },
        {
          userId: 1,
          serviceId: 9,
        },
        {
          userId: 1,
          serviceId: 10,
        },
        {
          userId: 1,
          serviceId: 11,
        },
        {
          userId: 1,
          serviceId: 12,
        },
        {
          userId: 1,
          serviceId: 13,
        },
        {
          userId: 2,
          serviceId: 1,
        },
        {
          userId: 2,
          serviceId: 2,
        },
        {
          userId: 2,
          serviceId: 3,
        },
        {
          userId: 3,
          serviceId: 4,
        },
        {
          userId: 3,
          serviceId: 5,
        },
        {
          userId: 3,
          serviceId: 6,
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
    return queryInterface.bulkDelete("userServices", null, {});
  },
};
