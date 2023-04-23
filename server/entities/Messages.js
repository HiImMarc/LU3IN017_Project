const {ObjectId} = require('mongodb')

class Messages {
    constructor(db) {
        this.db = db
    }
    
    createMessage(authorid, name, lastname, pseudo, content){
        console.log("dans createMessage : ", authorid,content)

        return new Promise( (resolve, reject) => {
            this.db.collection('Messages')
            .insertOne({
                authorid,
                name,
                lastname,
                pseudo,
                content,
                likes : 0,
                comments : []
            }, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }


    getAllMessages(){
        return new Promise( (resolve, reject) => {
            this.db.collection('Messages').find().toArray()
            .then ( (res) => {
                if (res) {
                    resolve(res)
                } else {
                    reject("Erreur lors de getAllMessages")
                }
            })
            .catch( (err) => console.log("getAllMessages catch : ",err))
        })
    }

    getLikes(msgid) {
        return new Promise( (resolve,reject) => {
            this.db.collection('Messages').findOne({
                _id : {$eq : new ObjectId(msgid)}
            })
            .then( (message) => {
                console.log("message : ",message)
                if (message) {
                    resolve(message.likes.length)
                }
            })
            .catch( (err) => console.error(err))
        })
    }

    addLike(userid, msgid) {
        return new Promise( (resolve, reject) => {
            this.db.collection('Messages').findOne({
                _id : {$eq : new ObjectId(msgid)}
            })
            .then ( (message) => {
                console.log("message : ",message)
                const likes = message.likes || []
                const user = likes.findIndex((like) => like === userid)
                // Si on a trouvé un userid qui correspond, on l'a déjà like, donc on va supprimer
                if (user != -1) {
                    const newLikes = likes.filter((like) => like !== userid);
                    this.db.collection('Messages').updateOne({
                        _id: new ObjectId(msgid)
                    }, {
                        $set: { likes: newLikes }
                    })
                    .then(() => {
                        resolve({ 
                            message: 'like deleted',
                            likeCount: newLikes.length
                        });
                    })
                    .catch((err) => {
                        reject(err);
                    });
                // Si on l'a pas trouvé, on le rajoute
                } else {
                    likes.push(userid);
                    this.db.collection('Messages').updateOne({
                    _id: new ObjectId(msgid)
                    }, {
                    $set: { likes: likes }
                    })
                    .then(() => {
                    resolve({ 
                        message: 'like added',
                        likeCount: likes.length,
                    });
                    })
                    .catch((err) => {
                    reject(err);
                    });
                }
            })

        })
    }

    addComment(msgid,authorid,content) {
        return new Promise( (resolve,reject) => {
            newcomment = {
                authorid : authorid,
                content : content
            }
            this.db.collection('Messages').updateOne({
                _id: new ObjectId(msgid)
            }, {
                $set: { comments: [... newcomment]}
            })
            .then(() => {
                resolve({ 
                    message: 'comment added',
                    comment: newcomment,
                });
            })
            .catch((err) => {
                reject(err);
            });
        })
    }

}

module.exports = Messages;