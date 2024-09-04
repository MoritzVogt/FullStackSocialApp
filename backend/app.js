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

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
    },
    hashPassword:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    id:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ["visitor","organisation","admin"],
    },

});

const User = mongoose.model("User", userSchema);


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


app.post("/api/register",async(req,res) =>{

})

app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})

app.get("/health-check",(req,res)=>{
    res.status(200).send("All right!");
})

