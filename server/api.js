const router = require("express").Router()
const Users = require("./entities/Users")
const Messages = require("./entities/Messages")
const Friends = require("./entities/Friends.js")
const connectToDB = require('./database/database')
const jwt = require('jsonwebtoken')


const getDB = async (req, res, next) => { // Fonction pour donner une instance de la database à mes routes
    try {
        const client = await connectToDB();
        req.db = client.db('Birdy');
        process.on('SIGINT', () => client.close()); // Quand il y a une IT (ctrl c etc...) on ferme la database
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur interne du serveur');
    }
};
router.use(getDB);



///////////////////// SERVICES UTILISATEURS /////////////////////

router.post("/users/new", async function (req, res) {
    const user = new Users(req.db)
    const result = await user.createUser(req.body.login, req.body.password, req.body.name, req.body.lastname)
    res.send(result);
}) // Crée un compte

router.get("/login", async function (req, res) {
    const user = new Users(req.db)
    const result = await user.login(req.query.login, req.query.password);
    if (result) {
        const token = jwt.sign({ id: result._id }, 'key');
        res.send({ _id: result._id, token: token });
    } else {
        res.send("wrong password or login")
    }
}) // Se connecte à un compte (en réalité retourne juste l'id du connecté, la connexion se fera dans le côté front)

router.get("/users/id/infos", async function (req, res) {
    const user = new Users(req.db)
    const id = req.query.userid // On récupère l'id de l'user connecté
    const result = await user.getInfo(id);
    if (result) {
        //console.log("!!!!!!!!!!!!!",result)
        res.send(result);
    } else {
        res.send("erreur lors de getInfos");
    }
}) // Récupère les infos d'un user

router.delete("/users/delete", async function (req, res) {
    const user = new Users(req.db)
    await user.deleteAccount(req.query.userid)
    .then((result) => res.send(result))
}) // Supprime un compte

///////////////////// SERVICES MESSAGES /////////////////////

router.post("/messages/new", async function (req, res) {
    const message = new Messages(req.db);
    await message.createMessage(req.body.id, req.body.name, req.body.lastname, req.body.pseudo, req.body.content, req.body.date)
        .then((result) => {
            if (result) {
                console.log("/messages/new")
                res.send(result)
            } else {
                res.send('erreur lors de création message')
            }
        })
}) // Crée un message

router.get("/messages", async function (req, res) {
    const message = new Messages(req.db);

    await message.getAllMessages()
        .then((result) => {
            if (result) {
                res.send(result)
            } else {
                res.send('erreur lors de getAllMessages')
            }
        })
        .catch(err => console.log("Ya une erreur dans le router.get ", err))

}) // Récupère tout les messages

router.patch("/messages/like", async function (req, res) {
    const message = new Messages(req.db);
    await message.addLike(req.body.userid, req.body.msgid)
        .then((result) => res.send(result))
}) // Ajoute / Supprime  un like

router.get("/messages/:msgid/likes", async function (req, res) {
    const message = new Messages(req.db);
    await message.getLikes(req.params.msgid)
        .then((result) => res.send(result))
}) // Récupère le nombre de likes d'un message

router.patch("/messages/comment/new", async function (req, res) {
    const message = new Messages(req.db);
    //console.log("#######",req.body.msgid, req.body.userid, req.body.lastname, req.body.name, req.body.pseudo, req.body.content)
    await message.addComment(req.body.msgid, req.body.userid, req.body.lastname, req.body.name, req.body.pseudo, req.body.content, req.body.date)
        .then((result) => res.send(result))
        .catch((err) => console.log("erreur dans api : ", err))
}) // Ajoute un commentaire à un message

router.delete("/messages/delete", async function (req, res) {
    const message = new Messages(req.db)
    await message.deleteMessage(req.query.msgid)
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
}) // Supprime un message avec l'id msgid





///////////////////// SERVICES AMIS /////////////////////

router.post("/friends/invitation", async function (req, res) {
    const friend = new Friends(req.db)
    await friend.sendFriendRequest(req.body.from, req.body.fromPseudo, req.body.to, req.body.toPseudo, req.body.message)
        .then((result) => res.send(result))
        .catch((error) => console.error(error))
}) // Envoie une demande d'ami avec un message de from à to

router.get("/friends/getTo", async function (req, res) {
    const friend = new Friends(req.db)
    await friend.getFriendRequestsTo(req.query.userid)
        .then((result) => res.send(result))
        .catch((error) => console.error(error))
}) // Récupère toute les demandes d'amis vers un userid

router.delete("/friends/invitation/response", async function (req, res) {
    const friend = new Friends(req.db)
    await friend.anwserRequest(req.query.accept, req.query.request)
        .then((result) => res.send(result))
        .catch((err) => console.error(err))
}) // Gère la réponse à une demande d'ami

router.get("/friends/get", async function (req, res) {
    const friend = new Friends(req.db)
    console.log("/friends/get req.query.userid : ", req.query.userid)
    await friend.getFriends(req.query.userid)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.error(err))
}) // Retourne les amis d'un user

router.delete("/friends/delete", async function (req, res) {
    const friend = new Friends(req.db)
    await friend.deleteFriend(req.query.userid, req.query.friendid)
        .then((result) => res.send(result))
        .catch((err) => console.error(err))
}) // Supprime le lien d'amitié entre deux users


/* A FAIRE ? 
router.delete("/users/delete/:userid", Users.logout) // Supprime un compte
router.get("/users/id/:userid", Users.getId) // Récupère l'id d'un user

router.get("/messages/user/:userid", Messages.getAllMessagesId) // Récupère les messages d'un user
router.get("/messages/:msgid", Messages.getMessage) // Récupère un message 
router.get("/messages/friend/:userid/:friendid", Messages.getMessagesFromAllFriends) // Récupère tout les messages d'un ami (friendid) d'un user (userid)
router.get("/messages/friend/:userid", Messages.getMessagesFromFriend) // Récupère tout les messages des amis d'un user
router.get("/messages/stats/:userid", Messages.getStats) // Récupère les statistiques des messages d'un user
*/
module.exports = router;
