require('dotenv').config();  // Stellt sicher, dass die Umgebungsvariablen geladen werden

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3002', // Port, auf dem das Frontend läuft
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json());  // Um JSON-Body von Requests zu parsen

// MongoDB Verbindung
const uri = "mongodb+srv://admin:admin@socialappdb.t36fh.mongodb.net/?retryWrites=true&w=majority&appName=SocialAppDB";  // Verbindungs-String aus der .env-Datei
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
