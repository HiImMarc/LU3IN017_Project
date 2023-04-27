const {ObjectId} = require('mongodb')


class Friends {
    constructor(db) {
        this.db = db
    }

    getFriends(userId) {
        try {
            const user = this.db.collection('Users').findOne({ 
                _id: new ObjectId(userId)
            });
            if (!user) {
                throw new Error('User not found');
            }
            const friends = user.friends || []; // Si la propriété friends est undefined, on utilise un tableau vide pour éviter des erreurs
            console.log("FRIENDS : ",friends)
            return friends;
        } catch (error) {
            throw new Error('Error getFriends');
        }
    }

    areFriends(userid1,userid2){
        try {
            const friends = getFriends(userid1)
            return friends.includes(userid2)
        } catch (error) {
            throw new Error('Error areFriends');
        }
    }

    sendFriendRequest(from, to, message){
        console.log("dans askFriend : ", from,to,message)
        return new Promise( (resolve, reject) => {
            this.db.collection('FriendRequests')
            .insertOne({
                from,
                to,
                message
            }, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    getFriendRequestsTo(userid) {
        return new Promise( (resolve, reject) => {
            console.log("CCCCCCCCCCCCCCCC",userid)
            this.db.collection('FriendRequests')
            .find({to : {$eq : userid}})
            .toArray()
            .then ((result) => resolve(result))
            .catch((error) => reject(error))
        })
    }
    
}

module.exports = Friends 