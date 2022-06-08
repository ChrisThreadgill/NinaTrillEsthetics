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
          userId: 2,
          serviceId: 4,
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
