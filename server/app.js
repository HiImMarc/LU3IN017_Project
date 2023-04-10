const router = require("express").Router()

const Users = require("./entities/Users")
const Messages = require("./entities/Messages")
const Friends = require("./entities/Friends.js")
const connectToDB = require('./database/database')
const { resolvePath } = require("react-router-dom")
const { Query } = require("mongoose")
const jwt = require('jsonwebtoken')


router.post("/users/new", async function(req,res){
    const client = await connectToDB();
    const user = new Users(client)
    const result = await user.createUser(req.body.login, req.body.password, req.body.name, req.body.lastname)
    res.send(result);
}) // Crée un compte

router.get("/login", async function(req, res) {

    console.log("sjqkdlsq : ", req.query.login, req.query.password)

    const client = await connectToDB();
    const user = new Users(client)
    const result = await user.login(req.query.login, req.query.password);
    if (result) {
        const token = jwt.sign({id : result._id},'key');
        console.log("le token ? : ", token)
        res.send({ _id: result._id, token: token });
    } else {
        res.send("wrong password or login")
    }
}) // Se connecte à un compte (en réalité retourne juste l'id du connecté, la connexion se fera dans le côté front)

router.get("/users/id/infos/:user", async function(req, res){
    const client = await connectToDB();
    const user = new Users(client); 
    
    console.log("DANS LAPP MON ID EST EGAL A ", req.query.id)

    const id = req.query.id // On récupère l'id de l'user connecté

    const result = await user.getInfo(id);
    if (result){
        res.send(result);
    } else {
        res.send("erreur lors de getInfos");
    }
}) // Récupère les infos d'un user

router.post("/messages/new", async function(req, res) {
    const client = await connectToDB();
    const message = new Messages(client); 

    console.log("dans app : userid et content : ", req.body.id, req.body.content)

    await message.createMessage(req.body.id, req.body.name, req.body.lastname, req.body.pseudo, req.body.content)
    .then ((result) => {
        if (result) {
            res.send(result)
        } else {
            res.send('erreur lors de création message')
        }
    })

}) // Crée un message

router.get("/messages",async function(req, res) {
    const client = await connectToDB();
    const message = new Messages(client); 

    await message.getAllMessages()
    .then ((result) => {
        if (result) {
            res.send(result)
        } else {
            res.send('erreur lors de getAllMessages')
        }
    })
    .catch (err => console.log("Ya une erreur dans le router.get ",err))

}) // Récupère tout les messages



/*
router.delete("/users/delete/:userid", Users.logout) // Supprime un compte
router.get("/users/id/:userid", Users.getId) // Récupère l'id d'un user

router.get("/messages/user/:userid", Messages.getAllMessagesId) // Récupère les messages d'un user
router.get("/messages/:msgid", Messages.getMessage) // Récupère un message 
router.put("/messages/set/:msgid", Messages.setMessage) // Met à jour un message 
router.delete("/messages/delete/:msgid", Messages.deleteMessage) // Supprime un message
router.get("/messages/friend/:userid/:friendid", Messages.getMessagesFromAllFriends) // Récupère tout les messages d'un ami (friendid) d'un user (userid)
router.get("/messages/friend/:userid", Messages.getMessagesFromFriend) // Récupère tout les messages des amis d'un user
router.get("/messages/stats/:userid", Messages.getStats) // Récupère les statistiques des messages d'un user
*/
module.exports = router;
