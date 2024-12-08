const express=require("express");
const router=express.Router();
const {connectionReq,requestReview}=require("../controllers/requestController");
router.post("/request/send/:status/:toUserId", userAuth,connectionReq);
router.post("/request/review/:status/:requestId",userAuth,requestReview);
module.exports=Requestrouter;