const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth")
const {connectionReq,requestReview}=require("../controllers/requestController");
requestRouter.post("/request/send/:status/:toUserId", userAuth,connectionReq);
requestRouter.post("/request/review/:status/:requestId",userAuth,requestReview);
module.exports=requestRouter;