require('dotenv').config();  // Stellt sicher, dass die Umgebungsvariablen geladen werden
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

const corsOptions = {
    origin: ['http://localhost:3002', 'http://127.0.0.1:3002'],
    methods: ['GET', 'POST', 'OPTIONS'], // Erlaube auch OPTIONS für Preflight
    credentials: true
};

// Middleware
app.use(cors(corsOptions));

// Zusätzliche Middleware für Preflight-Anfragen
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});


app.use(express.json());  // Um JSON-Body von Requests zu parsen

// MongoDB Verbindung
const uri = "mongodb+srv://admin:admin@socialappdb.t36fh.mongodb.net/?retryWrites=true&w=majority&appName=SocialAppDB";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDb() {
    try {
        await client.connect();  // Verbindung zur Datenbank herstellen
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

connectToDb();  // Verbindung aufbauen, wenn der Server gestartet wird

// Benutzerregistrierung (API-Endpunkt)
app.post('/api/user', async (req, res) => {
    try {
        const newUser = req.body;  // Liest die Benutzerinformationen aus dem Request-Body
        const database = client.db('SocialApp');  // Verweis auf die Datenbank
        const userCollection = database.collection('User');  // Verweis auf die Collection "User"
        
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


app.post('/api/login', async (req, res) => {
    try{
    const newUser = req.body;  // Liest die Benutzerinformationen aus dem Request-Body
    const database = client.db('SocialApp');  // Verweis auf die Datenbank
    const userCollection = database.collection('User');
    const { email, password } = req.body;
    const datas = await database.userCollection.find()
    console.log(datas)

    //check if both variables are provided
    if (!email || !password) {
        res.status(401).json({ error: 'Error inserting user' });
    }
    //check if user exists
    const existUser = await userCollection.findOne({ email });
    if (!existUser) {
      return res.status(401).send({ message: "User does not exist!" });
    }
    //check if password is correct
    const existUserPw = await userCollection.findOne({ password });
    if (!existUserPw) {
      return res.status(401).json({ message: "Password incorrect!" });
      
    }
    res.status(200).send({ message: "Login successful!" });
}catch (error){  
    console.error('Error inserting login:', error);
    res.status(404).json({ error: 'Error inserting login' });
}
  });




// Beispiel-Route zum Erstellen eines Posts in der Datenbank
app.post('/api/posts', async (req, res) => {
    try {
        const newPost = req.body;  // Der neue Post wird aus dem Request-Body gelesen
        const database = client.db('SocialApp');  // Verweis auf die Datenbank
        const postsCollection = database.collection('Posts');  // Verweis auf die "Posts"-Collection

        const result = await postsCollection.insertOne(newPost);  // Füge den neuen Post in die Datenbank ein
        // Das gesamte Dokument zurückgeben, inklusive der _id
        res.status(201).json({ ...newPost, _id: result.insertedId });  
    } catch (error) {
        console.error('Error inserting post:', error);
        res.status(500).json({ error: 'Error inserting post' });
    }
});

// Server starten
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
