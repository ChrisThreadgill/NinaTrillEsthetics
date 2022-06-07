const router = require("express").Router();

router.post("/", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
