const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { Op } = require("sequelize");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Service, Appointment, userService } = require("../../db/models");
const { db } = require("../../config");

const serviceValidations = [
  check("title").exists({ checkFalsy: true }).withMessage("Please Provide a Service Name"),
  check("title").isLength({ max: 75 }).withMessage("Your title name must be within 75 characters."),
  check("description").exists({ checkFalsy: true }).withMessage("Please provide a description of the service."),
  check("description").isLength({ max: 500 }).withMessage("Description must be 500 characters or less."),
  check("price").exists({ checkFalsy: true }).withMessage("You must include a price."),
  check("hours").exists({ checkFalsy: true }).withMessage("Include total service time in hours."),
  handleValidationErrors,
];

//get all services
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const services = await Service.findAll();

    return res.json({
      services,
    });
  })
);

//posts new service
router.post(
  "/",
  requireAuth,
  serviceValidations,
  asyncHandler(async (req, res) => {
    const { employeeId, title, description, price, hours } = req.body;

    const newService = await Service.build({
      employeeId,
      title,
      description,
      price,
      hours,
    });
    await newService.save();
    return res.json({
      newService,
    });
  })
);

//updating service
router.put(
  "/:serviceId",
  requireAuth,
  serviceValidations,
  asyncHandler(async (req, res) => {
    const { serviceId } = req.params;

    const { userId, title, description, price, hours } = req.body;

    const serviceToUpdate = await Service.findByPk(serviceId);

    if (userId === Service.employeeId) {
      await serviceToUpdate.update({
        title,
        description,
        price,
        hours,
        employeeId: userId,
      });
    }

    res.json({
      serviceToUpdate,
    });
  })
);

//removing service
router.delete(
  "/:serviceId",
  asyncHandler(async (req, res) => {
    const { serviceId } = req.params;

    const deletedService = await Service.findByPk(serviceId);
    if (deletedService) {
      await deletedService.destroy();
      res.json({ message: "Successfully removed service" });
    }
  })
);

//gets employee includes services
router.get(
  "/employee/:employeeId",
  asyncHandler(async (req, res) => {
    const { employeeId } = req.params;
    const userId = parseInt(employeeId);

    const user = await User.findOne({
      where: userId,
      include: Service,
    });

    return res.json({
      user,
    });
  })
);
const userServiceValidation = [
  check("userId")
    .exists({ checkFalsy: true })
    .withMessage("Please contact your development team if this issue persists"),
  check("serviceId")
    .exists({ checkFalsy: true })
    .withMessage("Please contact your development team if this issue persists"),
  handleValidationErrors,
];

//create join table instance for user service
router.post(
  "/:userId/:serviceId",
  requireAuth,
  userServiceValidation,
  asyncHandler(async (req, res) => {
    const { userId, serviceId } = req.body;

    const newUserService = await userService.build({
      userId,
      serviceId,
    });
    await newUserService.save();
    return res.json({
      newUserService,
    });
  })
);

//removing employee's service
router.delete(
  "/userServices",
  asyncHandler(async (req, res) => {
    const { userId, serviceId } = req.body;

    const deletedService = await userService.findOne({
      where: { userId: userId, serviceId: serviceId },
    });
    if (deletedService) {
      await deletedService.destroy();
      res.json({ message: "Successfully removed service" });
    }
  })
);

module.exports = router;
