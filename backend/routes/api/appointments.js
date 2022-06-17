const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { Op } = require("sequelize");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Service, Appointment, userService } = require("../../db/models");

const appointmentValidations = [
  check("startTime").exists({ checkFalsy: true }).withMessage("Please select an appointment time."),
  check("hours").exists({ checkFalsy: true }).withMessage("Error calculating appointment hours"),
  check("employeeId").exists({ checkFalsy: true }).withMessage("Error with employeeId"),
  check("customerId").exists({ checkFalsy: true }).withMessage("Error with customerId"),
  check("date")
    .exists({ checkFalsy: true })
    .withMessage("Please Select a date")
    .custom((value, { req }) => {
      return Appointment.findAll({ where: { date: value, employeeId: req.body.employeeId } }).then((appointments) => {
        if (appointments) {
          const bookedTimes = [];

          const selectedStartTime = req.body.startTime;
          const selectedAppointmentHours = req.body.hours;
          var selectedAppointmentEndTime;

          if (selectedAppointmentHours > 0.5) {
            selectedAppointmentEndTime = selectedStartTime;
            for (let i = 0.5; i < selectedAppointmentHours; i += 0.5) {
              selectedAppointmentEndTime += 0.5;
            }
          }

          for (let i = 0; i < appointments.length; i++) {
            let currAPP = appointments[i].dataValues;
            let hours = currAPP.hours;
            let startTime = currAPP.startTime;

            bookedTimes.push(Number(startTime));

            if (hours > 0.5) {
              var bookedSlots = Number(startTime);

              for (let i = 0.5; i < hours; i += 0.5) {
                bookedSlots += 0.5;
                bookedTimes.push(bookedSlots);
              }
            }
          }
          console.log(selectedAppointmentEndTime, "selected appointment time -------------------");
          if (bookedTimes.includes(selectedStartTime))
            return Promise.reject("This time slot has been booked, please select another time.");

          if (bookedTimes.includes(selectedAppointmentEndTime))
            return Promise.reject("This time slot overlaps an already booked appointment, please select another time.");

          if (selectedAppointmentEndTime > 20)
            return Promise.reject("You will need to schedule larger appointments earlier in the day.");
        }
      });
    }),

  handleValidationErrors,
];

router.get(
  "/",
  requireAuth,
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
  requireAuth,
  appointmentValidations,
  asyncHandler(async (req, res) => {
    const { startTime, hours, employeeId, customerId, date, services } = req.body;
    // let date = 20220817;

    const newAppointment = await Appointment.build({
      startTime,
      hours,
      employeeId,
      customerId,
      date,
      services,
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
  requireAuth,
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
  asyncHandler(async (req, res) => {
    const { employeeId } = req.params;
    console.log(employeeId, "----------------------");

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
  // serviceValidations,
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
  requireAuth,
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
