const express=require("express");
const router=express.Router();

const {profileview,updatePassword,updateUserProfile}=require("../controllers/profileController");
const {userAuth}=require("../middleware/auth");

router.get("/profile/view",userAuth,profileview);
router.get("/profile/edit",userAuth,updateUserProfile);
router.get("/profile/forgotpassword",updatePassword);


module.exports = profileRouter;