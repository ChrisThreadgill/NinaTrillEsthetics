const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth");
const { Appointment } = require("../../db/models");

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
          const newAppointmentHours = [];

          const selectedStartTime = req.body.startTime;
          const selectedAppointmentHours = req.body.hours;
          // console.log(selectedAppointmentHours);
          var selectedAppointmentEndTime;

          if (selectedAppointmentHours > 0.5) {
            selectedAppointmentEndTime = Number(selectedStartTime);
            newAppointmentHours.push(selectedAppointmentEndTime);
            for (let i = 0.5; i < selectedAppointmentHours; i += 0.5) {
              selectedAppointmentEndTime += 0.5;
              newAppointmentHours.push(selectedAppointmentEndTime);
              // console.log("selected appointment end time ---------------------", selectedAppointmentEndTime);
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

          while (newAppointmentHours.length) {
            let currentHourCheck = newAppointmentHours.pop();
            if (bookedTimes.includes(currentHourCheck))
              return Promise.reject(
                "This time slot overlaps an already booked appointment, please select another time."
              );
          }
          // console.log(bookedTimes, "-------------------- BOOKED TIMES");
          // console.log(newAppointmentHours, "--------------------------");
          // console.log(selectedAppointmentEndTime, "selected appointment time -------------------");
          if (bookedTimes.includes(selectedStartTime))
            return Promise.reject("This time slot has been booked, please select another time.");

          if (bookedTimes.includes(selectedAppointmentEndTime))
            return Promise.reject("This time slot overlaps an already booked appointment, please select another time.");

          if (selectedAppointmentEndTime > 20)
            return Promise.reject("You will need to schedule appointments longer than 2.5 hours earlier in the day.");
        }
      });
    }),

  handleValidationErrors,
];

const appointmentEditValidations = [
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
          const newAppointmentHours = [];
          const appointmentsCopy = [...appointments];

          const selectedStartTime = req.body.startTime;
          const selectedAppointmentHours = req.body.hours;

          var selectedAppointmentEndTime;

          if (selectedAppointmentHours > 0.5) {
            selectedAppointmentEndTime = Number(selectedStartTime);
            newAppointmentHours.push(selectedAppointmentEndTime);
            for (let i = 0.5; i < selectedAppointmentHours; i += 0.5) {
              selectedAppointmentEndTime += 0.5;
              newAppointmentHours.push(selectedAppointmentEndTime);
            }
          }

          for (let i = 0; i < appointmentsCopy.length - 1; i++) {
            let currAPP = appointments[i].dataValues;

            if (currAPP.id == req.body.appointmentId) {
              continue;
            }
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
          while (newAppointmentHours.length) {
            let currentHourCheck = newAppointmentHours.pop();
            if (bookedTimes.includes(currentHourCheck))
              return Promise.reject(
                "This time slot overlaps an already booked appointment, please select another time."
              );
          }
          if (bookedTimes.includes(selectedStartTime))
            return Promise.reject("This time slot has been booked, please select another time.");

          if (bookedTimes.includes(selectedAppointmentEndTime))
            return Promise.reject("This time slot overlaps an already booked appointment, please select another time.");

          if (selectedAppointmentEndTime > 20)
            return Promise.reject("You will need to schedule appointments longer than 2.5 hours earlier in the day.");
        }
      });
    }),

  handleValidationErrors,
];

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const appointments = await Appointment.findAll();
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
  appointmentEditValidations,
  asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;

    const { date, startTime, hours, employeeId, customerId } = req.body;

    const appointmentToUpdate = await Appointment.findByPk(appointmentId);

    if (customerId === appointmentToUpdate.customerId) {
      await appointmentToUpdate.update({
        date,
        startTime,
        hours,
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
