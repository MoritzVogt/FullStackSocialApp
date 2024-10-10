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

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minglegth: 8,
    maxlength: 50,
  },
  hashPassword: {
    type: String,
    required: true,
    minglegth: 5,
  },
  id: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["visitor", "organisation", "admin"],
  },
});
const User = mongoose.model("social-user", userSchema);

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


app.get("/users",async(req,res)=>{
  res.send({
    empty:"currently",
  })
})

app.use(express.json());
app.post("/api/register", async (req, res) => {
  try {
    //Daten extrahieren - destructering
    console.log(req.body);
    const { id, fullname, email, password, role } = req.body;
 
    if (!id || !fullname || !email || !password || !role) {
      return res.status(404).send({ message: "Please fill out all fields" });
    }
    //existiert user?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ id, fullname, email, hashPassword, role });
    await User.create(user);
    res.status(201).send({ message: "User successfully created!" });
  } catch (error) {
    res.status(500).send({ message: "Server register failed" });
  }
});


//register
/*app.post('/api/user', async (req, res) => {
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
});*/



app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
