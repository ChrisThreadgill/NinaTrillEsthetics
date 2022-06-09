const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const servicesRouter = require("./services.js");
const appointmentsRouter = require("./appointments.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/services", servicesRouter);

router.use("/appointments", appointmentsRouter);

// router.post("/test", (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
