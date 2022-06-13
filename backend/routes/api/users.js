const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
const { setJWT } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const { User, userService, Service, Schedule } = require("../../db/models");

const router = express.Router();

const lowerCase = /^(?=.*[a-z])/;
const upperCase = /^(?=.*[A-Z])/;
const oneNumeric = /(?=.*[0-9])/;
const sevenCharacters = /(?=.{7,})/;
const userValidators = [
  check("fName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name")
    .isLength({ max: 75 })
    .withMessage("First name cannot be more than 75 characters long"),
  check("lName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name")
    .isLength({ max: 75 })
    .withMessage("Last name cannot be more than 75 characters long"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email")
    .isLength({ max: 255 })
    .withMessage("email cannot be more than 255 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("The provided Email Address is already in use by another account");
        }
      });
    }),
  check("email").isEmail().withMessage("Must be a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please Provide a password")
    .isLength({ max: 255 })
    .withMessage("password must be less than 255 characters")
    .matches(sevenCharacters)
    .withMessage("Please input a password at least seven characters long")
    .matches(lowerCase)
    .withMessage("Please input a password with at least one lower case character")
    .matches(upperCase)
    .withMessage("Please input a password with at least one upper case character")
    .matches(oneNumeric)
    .withMessage("Please input a password with at least one numeric character"),
  check("phoneNum")
    .isLength({ max: 10 })
    .withMessage("Please enter a 10 digit US phone number.")
    .custom((value) => {
      return db.User.findOne({ where: { phoneNum: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "This phone number is already in use.  Please use a different phone number or leave this field blank.  Thank you"
          );
        }
      });
    }),
  handleValidationErrors,
];

router.post(
  "/",
  userValidators,

  asyncHandler(async (req, res) => {
    const { email, password, fName, lName, phoneNum } = req.body;

    const user = await User.signup({ email, password, fName, lName, phoneNum });

    await setJWT(res, user);

    return res.json({
      user,
    });
  })
);
router.get(
  "/employees",
  asyncHandler(async (req, res) => {
    console.log("inside the route");
    const employees = await User.findAll({
      where: { role: { [Op.gt]: 1 } },
      include: [Service, Schedule],
    });

    // console.log(employees);
    return res.json({
      employees,
    });
  })
);

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { userId } = req.params;
//     // const serviceId = 3;
//     // const users = await User.findAll();
//     // console.log(users);
//     let res2 = "hello world";
//     return res.json({
//       res2,
//     });
//   })
// );

module.exports = router;
