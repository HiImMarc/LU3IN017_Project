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

}

module.exports = Messages;