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
          profileUrl: "https://i.ibb.co/HTBdQC1/ninatrill-profile-pic.jpg",
        },
        {
          userId: 2,
          profileUrl: "https://i.ibb.co/NVYztmV/paullllllll.jpg",
        },
        {
          userId: 3,
          profileUrl: "https://i.ibb.co/pnPH0Tm/vern-profile.png",
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
