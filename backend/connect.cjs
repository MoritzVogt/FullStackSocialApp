const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);

    try {
        await client.connect();

        const db = client.db("SocialApp");

        // Verwende listCollections, um die Collections zu bekommen
        const collections = await db.listCollections().toArray();

        // Alle Collections und ihre Einträge ausgeben
        for (const collectionInfo of collections) {
            console.log(`Collection Name: ${collectionInfo.name}`);

            // Hole die Collection selbst
            const collection = db.collection(collectionInfo.name);

            // Finde alle Einträge in der Collection und gebe sie aus
            const entries = await collection.find({}).toArray();
            console.log(`Entries in ${collectionInfo.name}:`);
            console.log(entries);

            console.log('---------------------------------');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main();
