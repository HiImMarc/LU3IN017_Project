const { ObjectId } = require('mongodb')


class Friends {
    constructor(db) {
        this.db = db
    }

    // areFriends(userid1, userid2) {
    //     try {
    //         const friends = getFriends(userid1)
    //         return friends.includes(userid2)
    //     } catch (error) {
    //         throw new Error('Error areFriends');
    //     }
    // }

    sendFriendRequest(from, fromPseudo, to, toPseudo, message) {
        console.log("dans askFriend : ", from, to, message)
        return new Promise((resolve, reject) => {
            this.db.collection('FriendRequests')
                .insertOne({
                    from,
                    fromPseudo,
                    to,
                    toPseudo,
                    message
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    getFriendRequestsTo(userid) {
        return new Promise((resolve, reject) => {
            const friends = this.db.collection('FriendRequests')
                .find({ to: { $eq: userid } })
                .toArray() || []
            if (friends) {
                resolve(friends)
            } else {
                reject(error)
            }
        })
    }

    anwserRequest(accept, request) {
        return new Promise(async (resolve, reject) => {
            let result = ""
            const requestid = request._id.toString()
            const user1 = await this.db.collection('Users').findOne({ _id: new ObjectId(request.to) })
            const user2 = await this.db.collection('Users').findOne({ _id: new ObjectId(request.from) })

            if (accept) {
                console.log("DEBOGGAGE : ", user1,user2)
                const newfriends1 = user1.friends || []
                const newfriends2 = user2.friends || []

                const newfriend1 = {id:request.from, pseudo:request.fromPseudo, firstname:user2.firstname, lastname:user2.lastname}
                const newfriend2 = {id:request.to, pseudo:request.toPseudo, firstname:user1.firstname, lastname:user1.lastname}

                newfriends1.push(newfriend1)
                newfriends2.push(newfriend2)

                await this.db.collection('Users').updateOne({
                    _id: new ObjectId(request.to)
                }, {
                    $set: { friends: newfriends1}
                })
                await this.db.collection('Users').updateOne({
                    _id: new ObjectId(request.from)
                }, {
                    $set: { friends: newfriends2 }
                })


                result = "friend added"
                this.db.collection('FriendRequests').deleteOne({ _id: new ObjectId(requestid) })

                resolve(result)
            } else {
                result = "friend not added"
                this.db.collection('FriendRequests').deleteOne({ _id: new ObjectId(requestid) })
                resolve(result)
            }
        })

    }

    deleteFriend(userid, friendid) {
        return new Promise(async (resolve, reject) => {
            
            const user1 = await this.db.collection('Users').findOne({ _id: new ObjectId(userid) })
            const user2 = await this.db.collection('Users').findOne({ _id: new ObjectId(friendid) })
            console.log("user2 : ",friendid)
            const friends1 = user1.friends || []
            const friends2 = user2.friends || []
            const newfriends1 = friends1.filter(friend => { return friends1.some(friend_ => friend.id != friendid)})
        
            const newfriends2 = friends2.filter(friend => { return friends2.some(friend_ => friend.id != userid)})

            await this.db.collection('Users').updateOne({
                _id: new ObjectId(userid)
            }, {
                $set: { friends: newfriends1 }
            })
                .then(res => resolve(res))
                .catch(e => reject(e))

            await this.db.collection('Users').updateOne({
                _id: new ObjectId(friendid)
            }, {
                $set: { friends: newfriends2 }
            })
                .then(res => resolve(res))
                .catch(e => reject(e))
        })
    }

}


module.exports = Friends 