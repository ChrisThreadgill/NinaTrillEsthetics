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
          bio: "Hannah is a 29 year old local NWA *NorthWest Arkansas* native, that started NinaTrill Esthetics in early 2020 right before the pandemic.  After going to Nail Tech school in early 2017, she quickly realized her love wasn't for nails but for skin and making people feel beautiful in their own skin. She then went on to become a licensed esthetician by the State of Arkansas.  She is very adamant on make sure that every one of her clients feels at home and as comfortable as possible. If you have any questions about your specific beauty goals Hannah is the right person to talk to, as well as even if you just need a place to decompress!",
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
