const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
router.use("/api", apiRouter);

router.get("/", function (req, res) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("HomePage from routes/index.js");
});

module.exports = router;
