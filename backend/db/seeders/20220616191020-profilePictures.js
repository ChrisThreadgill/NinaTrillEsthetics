"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "profilePictures",
      [
        {
          userId: 1,
          profileUrl: "https://i.postimg.cc/Qd8Vv1nj/ninatrill-profile-pic.jpg",
        },
        {
          userId: 2,
          profileUrl: "https://postimg.cc/yDBQ2h3w",
        },
        {
          userId: 3,
          profileUrl: "https://postimg.cc/Z0nhMmzr",
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
    return queryInterface.bulkDelete("profilePictures", null, {});
  },
};
