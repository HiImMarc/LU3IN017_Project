const router = require("express").Router()
const user = require("./entities/Users")
const message = require("./entities/Messages")
const friend = require("./entities/Friends.js")


router.post("/api/:user", user.createUser)// permet de créer un compte
router.post("/api/:user/login", user.login) //permet de se connecter
router.delete("/api/:user/userid/logout", user.logout) //permet de se déconnecter
router.get("/api/:user/userid", user.getId)// permet d'avoir l'id de l'utilisateur
router.get("/api/:user/userid/infos", user.getInfo)// permet d'avoir l'information sur l'utilisateur

router.post("/apimsg/user/userid/messages", message.createMessage)//afficher un message
router.put("/apimsg/user/userid/messages", message.setMessage)//modifier un message
router.delete("/apimsg/user/userid/messages", message.deleteMessage)//supprimer un message
router.get("/apimsg/user/userid/messages/friendid", message.getMessageFromFriendId)//permet d'obtenir l'affichage de tous les messages d'un ami friendid de user dont l'id est userid
router.get("/apimsg/user/userid/messages/friends", message.getMessageFromAllFriends)//permet d'obtenir l'affichage de tous les messages de tous les amis de user dont l'id est userid
router.get("/apimsg/user/userid/infos", message.getStats)//permet d'obtenir les stats sur les messages de l'user userid.

router.post("/apifriends/user/userid/friends", friend.addFriend)//permet d'ajouter en amis
router.get(" /apifriends/user/userid/friends", friend.getFriendList)//permet d'obtenir la liste d'amis
router.delete("/apifriends/user/userid/friends/friendid", friend.deleteFriend)//permet de supprimer un ami
router.get("/apifriends/user/userid/infos", friend.getInfos)// permet d'obtenir des infos sur l'amis

module.exports = routeur ;
