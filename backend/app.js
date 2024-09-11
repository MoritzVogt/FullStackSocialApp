const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const rateLimit =  require("express-rate-limit")
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15* 60* 1000,
    limit: 15
})

app.use(async function(req,res, next){
    await mongoose.connect(process.env.CONNECT_STRING);
    console.log("test");
    next();
})

app.get("/",(req,res)=>{
    res.send("This is home")
})


app.use(express.json());
app.get("/users",async(req,res)=>{
    res.send({
        empty: "currently"
    });
})


app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})

app.get("/health-check",(req,res)=>{
    res.status(200).send("All right!");
})

