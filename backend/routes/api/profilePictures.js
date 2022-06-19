const express = require("express");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
const asyncHandler = require("express-async-handler");
const { setJWT } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const { User, profilePicture } = require("../../db/models");

const router = express.Router();

router.post(
  "/",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const profileUrl = await singlePublicFileUpload(req.file);
    // console.log(profileUrl);
    const currentProfilePicture = await profilePicture.findOne({ where: userId });
    // console.log(currentProfilePicture);
    // const newProfilePic = await profilePicture.build({ userId, profileUrl });
    // return res.json({
    //   newProfilePic,
    // });
  })
);

module.exports = router;
