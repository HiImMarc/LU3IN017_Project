const cors = require('cors')
const express = require('express'); 
const app = express();
const session = require('express-session') // J'ai pas compris c'est quoi encore ? J'utilise jwt à la place je crois

app.use(express.json());
app.use(cors()) // Je sais pas si c'est nécessaire mais ça a réglé un problème au tout début je crois ?

const router = require('./app')
app.use('/', router);

app.listen(8000, () => { console.log("Serveur écoute port 8000")})