class Users {
  constructor(db) {this.db = db}

  create(login, password, name, lastname){
    return new Promise((resolve, reject) =>{
      this.db.collection('users').insertOne({login, password, name, lastname}, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertedId)
        }
      });
    });
  }

  get(userid){
    const ObjectId = require('mongodb').ObjectId; //
    const query = { _id: new ObjectId(userid)}; // On fait ça prc que le id est un objet dans la bd
    return new Promise ((resolve, reject) => {
      this.db.collection('users').findOne(query, (error, user) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      })
    })
  }

  exists(login) {
    return new Promise((resolve, reject) => {
      this.db.collection('users').findOne({ login }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(!!user);
        }
      });
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      this.db.collection('users').findOne({ login, password }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user ? user._id : null);
        }
      });
    });
  }
}

module.exports = Users;

