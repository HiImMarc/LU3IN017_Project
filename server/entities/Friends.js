const {ObjectId} = require('mongodb')


class Friends {
    constructor(db) {
        this.db = db
    }

    getFriends(userId) {
        return new Promise(async (resolve,reject) => {
            try {
                const user = await this.db.collection('Users').findOne({ 
                    _id: new ObjectId(userId)
                });
                if (!user) {
                    throw new Error('User not found');
                }
                const friends = user.friends || []; // Si la propriété friends est undefined, on utilise un tableau vide pour éviter des erreurs
                resolve(friends);
            } catch (error) {
                reject(error)
            }
        })
    

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
            this.db.collection('FriendRequests')
            .find({to : {$eq : userid}})
            .toArray()
            .then ((result) => resolve(result))
            .catch((error) => reject(error))
        })
    }

    anwserRequest(accept, request) {
        return new Promise ((resolve, reject) => {
            let result  = ""
            const requestid = request._id.toString()
            const user = this.db.collection('Users').findOne({ _id : new ObjectId(request.to)})
            if (accept) {
                const newfriends = user.friends || []
                newfriends.push(request.from)
                this.db.collection('Users').updateOne({
                    _id: new ObjectId(request.to)
                }, {
                    $set: { friends: newfriends }
                })
                result = "friend added"
                this.db.collection('FriendRequests').deleteOne( { _id : new ObjectId(requestid)})

                resolve(result)
            } else {
                result = "friend not added"
                this.db.collection('FriendRequests').deleteOne( { _id : new ObjectId(requestid)}) 
                resolve(result)
            }
        })
        
    }

    deleteFriend(userid,friendid) {
        return new Promise ((resolve, reject) => {

            const user = this.db.collection('Users').findOne({ _id : new ObjectId(userid)})
            const friends = user.friends || []
            const newfriends = friends.filter(friend => element != friendid)
            this.db.collection('Users').updateOne({
                _id : new ObjectId(userid)
            }, {
                $set : {friends: newfriends}
            })
            .then (res => resolve("friend deleted", res))
            .catch(e => console.error(e))
        })
    }

}

module.exports = Friends 