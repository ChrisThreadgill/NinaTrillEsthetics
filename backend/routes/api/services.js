const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const { requireAuth } = require("../../utils/auth");
const { User, Service, Appointment, userService } = require("../../db/models");

const serviceValidations = [
  check("title").exists({ checkFalsy: true }).withMessage("Please Provide a Service Name"),
  check("title").isLength({ max: 75 }).withMessage("Service name must be within 75 characters."),
  check("title").not().isEmpty().withMessage("Please Provide a service name"),
  check("description").exists({ checkFalsy: true }).withMessage("Please provide a description of the service."),
  check("description").isLength({ max: 500 }).withMessage("Description must be 500 characters or less."),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("You must include a price.")
    .isNumeric()
    .withMessage("Price must be a number."),
  check("hours")
    .exists({ checkFalsy: true })
    .withMessage("Include total service time in hours.")
    .isNumeric({ min: 1, max: 5 })
    .withMessage("Hours must be a number"),
  // .isInt({ min: 1, max: 5 })
  // .withMessage("Cannot exceed 5 hours and must be a whole number."),
  check("hours").custom((value) => {
    if (!value) return Promise.reject("Please use increments of .5");
    if (value > 5) return Promise.reject("We do not offer services more than 5 hours.");
    if (value % 0.5 !== 0) {
      return Promise.reject("Please use increments of .5");
    }
    return true;
  }),

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
    const { title, description, price, hours } = req.body;

    const newService = await Service.build({
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
  "/managerDelete",
  asyncHandler(async (req, res) => {
    const { serviceId } = req.body;

    const deletedService = await Service.findByPk(serviceId);

    const serviceToDeleteRelations = await userService.findAll({
      where: { serviceId },
    });

    if (serviceToDeleteRelations.length) {
      for (const relation of serviceToDeleteRelations) {
        await relation.destroy();
      }
    }

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
