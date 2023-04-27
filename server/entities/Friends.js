class Friends {
    constructor(db) {
        this.db = db
    }
    
    askFriend(from, to){
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

    
}

module.exports = Friends 