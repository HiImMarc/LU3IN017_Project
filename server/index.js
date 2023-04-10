const cors = require('cors')
const express = require('express'); 
const app = express();
const session = require('express-session') // J'ai pas compris c'est quoi encore

app.use(express.json());
app.use(cors()) // Use this after the variable declaration

const router = require('./app')
app.use('/', router);


app.listen(8000, () => { console.log("Serveur écoute port 8000")})