const express = require("express");
const app = express();
const port =  process.env.PORT||5000;
const mongoose = require("mongoose");
const router = require("./Router/router");
require("dotenv").config();









//connecting with database

mongoose.connect(process.env.DBCONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
       console.log("database start")
});





//router
app.use(express.json());
app.use("/api",router);





//port

app.listen(port,console.log("sever port start"))