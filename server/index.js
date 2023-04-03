const {MongoClient} = require('mongodb');

const express = require('express'); 
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Users = require('./entities/Users');

async function main(){

}

main();

app.listen(8000, () => { console.log("Serveur écoute port 8000")})

