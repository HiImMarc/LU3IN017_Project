const router = require("express").Router()

const Users = require("./entities/Users")
const Messages = require("./entities/Messages")
const Friends = require("./entities/Friends.js")
const connectToDB = require('./database/database')
const { resolvePath } = require("react-router-dom")



router.post("/users/new", async function(req,res){
    const client = await connectToDB();
    const user = new Users(client)
    user.createUser(req.body.login, req.body.password, req.body.name, req.body.lastname)
}) // Crée un compte

router.get('/', (req, res) => {
res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
 res.send('Tout va à merveille');
})

router.get('/test',async  (req, res) => {
    const client = await connectToDB();
    const result =await client.db('Birdy').collection('Users').find().toArray()
    res.send(result);
    
});


/*
router.post("/users/login/:userid", Users.login) // Se connecte à un compte
router.delete("/users/delete/:userid", Users.logout) // Supprime un compte
router.get("/users/id/:userid", Users.getId) // Récupère l'id d'un user
router.get("/users/id/infos/:user", Users.getInfo) // Récupère les infos d'un user

router.get("/messages", Messages.getAllMessages) // Récupère tout les messages
router.get("/messages/user/:userid", Messages.getAllMessagesId) // Récupère les messages d'un user
router.get("/messages/:msgid", Messages.getMessage) // Récupère un message 
router.post("/messages/new", Messages.createMessage) // Crée un message
router.put("/messages/set/:msgid", Messages.setMessage) // Met à jour un message 
router.delete("/messages/delete/:msgid", Messages.deleteMessage) // Supprime un message
router.get("/messages/friend/:userid/:friendid", Messages.getMessagesFromAllFriends) // Récupère tout les messages d'un ami (friendid) d'un user (userid)
router.get("/messages/friend/:userid", Messages.getMessagesFromFriend) // Récupère tout les messages des amis d'un user
router.get("/messages/stats/:userid", Messages.getStats) // Récupère les statistiques des messages d'un user
*/
module.exports = router;
