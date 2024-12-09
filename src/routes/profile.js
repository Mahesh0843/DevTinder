const express = require("express");
const profileRouter = express.Router();

const { profileview, updatePassword, updateUserProfile } = require("../controllers/profileController");
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile/view", userAuth, profileview);
profileRouter.put("/profile/edit", userAuth, updateUserProfile);
profileRouter.patch("/profile/update-password",userAuth, updatePassword);

module.exports = profileRouter; 