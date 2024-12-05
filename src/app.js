const express = require("express");
const connectDb=require("./config/database");
const dotenv=require("dotenv");
const app=express();
const cookieparser=require("cookie-parser");
dotenv.config();


app.use(express.json());
app.use(cookieparser());

connectDb()
  .then(()=>{
    console.log("Database connected!!");
    console.log('Database URL:', process.env.DATABASE_URL);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err)=>{
    console.error("MongoDb connection failed!");
  });