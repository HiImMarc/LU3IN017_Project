const { ObjectId } = require('mongodb');

class Users {
	constructor(db) {
		this.db = db
	}

	createUser(pseudo, password, firstname, lastname) {
		return new Promise(async (resolve, reject) => {

			const exists = await this.db.collection('Users').findOne({ pseudo })
				.catch((error) => {
					console.log(error);
				})

			console.log("exists : ", exists)

			if (exists) {
				resolve("login already exists");

			} else {
				this.db.collection('Users')
					.insertOne({ pseudo, password, firstname, lastname, friends: [] })
					.then((res) => {
						if (res) {
							resolve(res)
						} else {
							reject("createUser-error")
						}
					})
			}
		})
	}


	login(pseudo, password) {
		return new Promise((resolve, reject) => {
			const result = this.db.collection('Users').findOne({
				pseudo: { $eq: pseudo },
				password: { $eq: password }
			});
			if (result) {
				resolve(result);
			} else {
				reject();
			}
		});
	}

	getInfo(id) {
		return new Promise((resolve, reject) => {
			const result = this.db.collection('Users').findOne(
				{ _id: new ObjectId(id) }
			)
			if (result) {
				resolve(result);
			} else {
				reject("getInfo-error");
			}
		})
	}

	getAllUssers() {
		return new Promise((resolve,reject) => {
			this.db.collection('Users').find()
			.then((users) => res.send(users))
			.catch((err) => console.error(err))
		})
	}

	getById(userid) {
		const ObjectId = require('mongodb').ObjectId; //
		const query = { _id: new ObjectId(userid) }; // On fait ça prc que le id est un objet dans la bd
		return new Promise((resolve, reject) => {
			this.db.collection('Users').findOne(query, (error, user) => {
				if (error) {
					reject(error);
				} else {
					resolve(user);
				}
			})
		})
	}


	deleteAccount(userid){
		return new Promise((resolve,reject)=>{
			this.db.collection('Users').deleteOne({
				_id : new ObjectId(userid)
			})
			.then ((res)=>resolve(res))
			.catch((err)=> reject(err))
		})
	}

	/*
	exists(login) {
		return new Promise((resolve, reject) => {
			console.log("function exists : login =", login)
			this.database.db('Birdy').collection('Users').findOne({ login }, (err, user) => {
				if (err) {
					console.log("errei",err);
				} else {
					console.log("dans le resolve")
					resolve(user ? user : "!exists")
				}
			});
		});
	}
	*/

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

