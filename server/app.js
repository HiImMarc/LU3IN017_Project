const router = require("express").Router()

const Users = require("./entities/Users")
const Messages = require("./entities/Messages")
const Friends = require("./entities/Friends.js") // va être abandonné je crois ? Je vois pas comment implémenter ça
const connectToDB = require('./database/database')
const jwt = require('jsonwebtoken')


const dbMiddleware = async (req, res, next) => { // Fonction pour donner une instance de la database à mes routes
    try {
      const client = await connectToDB();
      req.db = client.db('Birdy');
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur interne du serveur');
    }
};
router.use(dbMiddleware);


router.post("/users/new", async function(req,res){
    // const client = await connectToDB();
    // const user = new Users(client)
    const user = new Users(req.db)
    const result = await user.createUser(req.body.login, req.body.password, req.body.name, req.body.lastname)
    res.send(result);
}) // Crée un compte

router.get("/login", async function(req, res) {

    console.log("sjqkdlsq : ", req.query.login, req.query.password)

    // const client = await connectToDB();
    // const user = new Users(client)
    const user = new Users(req.db)
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
    // const client = await connectToDB();
    // const user = new Users(client); 
    const user = new Users(req.db)

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
    // const client = await connectToDB();
    // const message = new Messages(client); 
    const message = new Messages(req.db); 
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
    // const client = await connectToDB();
    // const message = new Messages(client); 
    const message = new Messages(req.db); 

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
