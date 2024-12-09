const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const {getRequests, getconnections}=require("../controllers/UserController");
userRouter.get("/user/requests/received",userAuth,getRequests);
userRouter.get("/user/getConnections",userAuth,getconnections);
module.exports=userRouter;