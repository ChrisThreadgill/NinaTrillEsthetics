"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Services",
      [
        {
          title: "Basic Glow Facial",
          description:
            "The basic glow facial will leave you with clean, fresh feeling, glowing skin. What you get with this facial: cleanser, toner, exfoliant, moisturizer, face mask, serums, cold roller, hot towels, face massage, and SPF.  All products used will be specially chosen to suit each persons specific skin care needs.",
          price: 85,
          hours: 1,
        },
        {
          title: "Dermaplane Facial",
          description:
            "This facial will include all of the features of the Basic Glow Facial however instead of an exfoliant you will get the dermaplane service.  Dermaplaning is a method of exfoliating your skin deeper, and gets rid of dirt and vellus hair. (aka peach fuzz)",
          price: 100,
          hours: 1,
        },
        {
          title: "Back Facial",
          description:
            "With the back facial you get the same products as the Basic Glow Facial it's just all done on your back!  This can help with back acne, or just to leave your back feeling clean and leave the skin glowing!  It includes a back massage as well.",
          price: 75,
          hours: 1,
        },
        {
          title: "Brow Wax",
          description: "Have your brows cleaned up, or reshaped!",
          price: 20,
          hours: 0.5,
        },
        {
          title: "Lip Wax",
          description: "Take care of unwanted hair",
          price: 15,
          hours: 0.5,
        },
        {
          title: "Armpit Wax",
          description: "Take care of unwanted hair",
          price: 35,
          hours: 0.5,
        },
        {
          title: "Brow Wax & Tint",
          description:
            "Get your brows cleaned up or reshaped and tinted.  With various shades to choose from we will be able to determine the best shade for your natural brow and desired look!  Tint lasts about 2-4 weeks depending on your hair growth.",
          price: 40,
          hours: 0.5,
        },
        {
          title: "Lash Lift",
          description:
            "A lash lift is the perming of your natural lash.  It is a low maintenance service that last about 6 weeks.  It is the right choice for someone who wants their lash to look amplified, without having to worry about spending hundreds of dollars or getting them filled every 2 weeks.",
          price: 65,
          hours: 1,
        },
        {
          title: "Lash Tint",
          description:
            "Tinting your lashes (usually darker) will last about 6 weeks, depending on your lash cycle and hair growth.",
          price: 20,
          hours: 0.5,
        },
        {
          title: "Lash Lift & Tint",
          description: "Most clients will choose to do this lift and tint together!",
          price: 20,
          hours: 1,
        },
        {
          title: "Teeth Whitening",
          description:
            "Teeth whitening service using a carbamide peroxide product and a professional teeth-whitening LED Lamp to whiten the teeth.  This will be an hour long service split into 3 20 minute sessions.  Your sensitivity will be monitored throughout the entire service and adjusted as needed.  Results last depending on your lifestyle!",
          price: 20,
          hours: 1.5,
        },
        {
          title: "Basic Spray Tan",
          description:
            "With multiple different shades to choose from we are able to suit each client's skin tone and desired level of dark.  You will receive a prep before your appointment.  The spray tan lasts about 7 days with proper preparation and care!",
          price: 50,
          hours: 0.5,
        },
        {
          title: "Deluxe Spray Tan Package",
          description:
            "With this deluxe package, you get a Ph balancing spray which works on the skin to skin to boost amino acid levels and maximize sunless color results.(You can think of this as a primer for your spray tan)  This will also include the spray tan solution and a post tan extender spray, which helps your tan last up to 3 days longer!",
          price: 60,
          hours: 0.5,
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
    return queryInterface.bulkDelete("Services", null, {});
  },
};
