const express = require('express'); 
const app = express();

const {MongoClient} = require('mongodb');

app.use(express.json());

const url = "mongodb://localhost:8000"
const client = new MongoClient(url);
client.connect();

app.listen(8000, () => { console.log("Serveur écoute port 8000")})

