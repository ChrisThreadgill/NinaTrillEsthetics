const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { Op } = require("sequelize");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Service, Appointment, userService } = require("../../db/models");

// const serviceValidations = [
//   check("date").custom((value) => {
//     console.log(value, "the valueeeeeeeeee");
//     // return Appointment.findAll({ where: { date: value } }).then((appointments) => {
//     //   if (appointments) {
//     //     console.log(value, "the original value");
//     //     appointments.forEach((el) => {
//     //       console.log(el.dataValues.date);
//     //     });
//     //     console.log(appointments);
//     //     return Promise.reject("The provided Email Address is already in use by another account");
//     //   }
//     // });
//   }),
//   handleValidationErrors,
// ];

router.get(
  "/",
  // requireAuth,
  // serviceValidations,
  asyncHandler(async (req, res) => {
    // const { appointmentId } = req.params;

    const appointments = await Appointment.findAll();
    // await newService.save();
    return res.json({
      appointments,
    });
  })
);

router.post(
  "/",
  // requireAuth,
  // serviceValidations,
  asyncHandler(async (req, res) => {
    const { startTime, endTime, hours, employeeId, customerId, date } = req.body;
    // let date = 20220817;

    const newAppointment = await Appointment.build({
      startTime,
      endTime,
      hours,
      employeeId,
      customerId,
      date,
    });
    await newAppointment.save();
    return res.json({
      newAppointment,
    });
  })
);

//get all customer appointments
router.get(
  "/customer/:customerId",
  // requireAuth,
  // serviceValidations,
  asyncHandler(async (req, res) => {
    const { customerId } = req.params;

    const appointments = await Appointment.findAll({
      where: { customerId: customerId },
    });
    return res.json({
      appointments,
    });
  })
);

//get all employee appointments
router.get(
  "/employee/:employeeId",
  requireAuth,
  serviceValidations,
  asyncHandler(async (req, res) => {
    const { employeeId } = req.params;

    const appointments = await Appointment.findAll({
      where: { employeeId: employeeId },
    });
    return res.json({
      appointments,
    });
  })
);

router.get(
  "/:appointmentId",
  requireAuth,
  serviceValidations,
  asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findByPk(appointmentId);
    return res.json({
      appointment,
    });
  })
);
router.put(
  "/:appointmentId",
  requireAuth,
  serviceValidations,
  asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;

    const { date, startTime, endTime, hours, customerId } = req.body;

    const appointmentToUpdate = await Appointment.findByPk(appointmentId);

    if (customerId === appointmentToUpdate.customerId) {
      await appointmentToUpdate.update({
        date,
        startTime,
        endTime,
        hours,
        customerId,
      });
    }

    res.json({
      appointmentToUpdate,
    });
  })
);

//cancelling appointment
router.delete(
  "/:appointmentId",
  asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;

    const deletedService = await Appointment.findByPk(appointmentId);
    if (deletedService) {
      await deletedService.destroy();
      res.json({ message: "Successfully cancelled appointment" });
    }
  })
);

module.exports = router;
