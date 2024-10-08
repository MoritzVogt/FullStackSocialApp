const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const PORT = process.env.PORT;

//usermodel

//postmodel



app.use(express.json());
app.use(cors());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 15,
// });

app.use(async function (req, res, next) {
  await mongoose.connect(process.env.CONNECT_STRING);
  console.log("test");
  next();
});

app.get("/", (req, res) => {
  res.send("This is home");
});

//register
app.post('/api/user', async (req, res) => {
    try {
        const newUser = req.body;  // Liest die Benutzerinformationen aus dem Request-Body 
        
        //
        // Überprüfen, ob der Benutzer bereits existiert
        const existingUser = await userCollection.findOne({ email: newUser.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Füge den neuen Benutzer in die Datenbank ein
        const result = await userCollection.insertOne(newUser);
        res.status(201).json({ ...newUser, _id: result.insertedId });  // Rückgabe des neuen Benutzers inkl. _id
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Error inserting user' });
    }
});



app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
