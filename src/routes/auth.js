const express=require("express");
const authrouter=express.Router();
const {signup,logout,login}=require("../controllers/authController");

authrouter.post("/signup",signup);
authrouter.post("/login",login);
authrouter.post("/logout",logout);

module.exports = authrouter;