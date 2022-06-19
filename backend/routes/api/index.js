const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const servicesRouter = require("./services.js");
const appointmentsRouter = require("./appointments.js");
const profilePicturesRouter = require("./profilePictures");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/services", servicesRouter);

router.use("/appointments", appointmentsRouter);

router.use("/profilePictures", profilePicturesRouter);

module.exports = router;
