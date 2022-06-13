"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          fName: "Hannah",
          lName: "Eldridge",
          hashedPassword: bcrypt.hashSync(process.env.ADMIN_CODE),
          phoneNum: 4793014455,
          email: "ninatrillcosmo@gmail.com",
          role: 3,
          bio: "Started Business",
          title: "Owner",
        },
        {
          fName: "Paul",
          lName: "Melhus",
          hashedPassword: bcrypt.hashSync("password"),
          phoneNum: 4794208080,
          email: "p.melhus@ninatrillesthetics.com",
          role: 2,
          bio: "Paul is a newly licensed esthetician after finding a new found love in skin care after losing all his money in crypto.  They referred to him in the space as 'paper hands'.",
          title: "Facial Specialist",
        },
        {
          fName: "Vernyoon",
          lName: "Chao",
          hashedPassword: bcrypt.hashSync("password"),
          phoneNum: 4798081337,
          email: "v.chao@ninatrillesthetics.com",
          role: 2,
          bio: "Vern is a highly experienced wax specialist.  He has been waxing since 2010.  He has a degree in dermatology and will take precautions to care for your skin.",
          title: "Wax/Skin Care Specialist",
        },
        {
          fName: "Darren",
          lName: "Kong",
          hashedPassword: bcrypt.hashSync("password"),
          phoneNum: 4795552525,
          email: "darren.kong@test.com",
          role: 1,
        },
        {
          fName: "Leo",
          lName: "Lapido",
          hashedPassword: bcrypt.hashSync("password"),
          phoneNum: 4795555595,
          email: "leo@joonisaTA.com",
          role: 1,
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        email: { [Op.in]: ["manager@test.com", "employee@test.com", "customer@test.com"] },
      },
      {}
    );
  },
};
