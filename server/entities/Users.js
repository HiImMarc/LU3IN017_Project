const { ObjectId } = require('mongodb');

class Users {
	constructor(db) {
		this.db = db
	}

	createUser(login, password, name, lastname) {
		return new Promise( async (resolve, reject) => {

			const exists = await this.db.collection('Users').findOne({login})
			.catch ((error) => {
				console.log(error);
			})

			console.log("exists : ", exists)

			if (exists) {
				resolve("login already exists");

			} else {
				this.db.collection('Users')
				.insertOne({ login, password, name, lastname }, (error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result.insertedId)
					}
				});
			}
		});
	}


	login(login, password) {
		return new Promise((resolve, reject) => {
			const result = this.db.collection('Users').findOne({
				login : {$eq : login},
				password : {$eq : password}
			});
			if (result) {
				resolve(result);
			} else {
				reject();
			}
		});
	}

	getInfo(id) {
		return new Promise( (resolve, reject) => {
			const result = this.db.collection('Users').findOne(
				{ _id : new ObjectId(id) }
			)
			if (result) {
				resolve(result);
			} else {
				reject("error getInfo");
			}
		})
	}

	getAllUssers() {

	}

	getById(userid) {
		const ObjectId = require('mongodb').ObjectId; //
		const query = { _id: new ObjectId(userid) }; // On fait ça prc que le id est un objet dans la bd
		return new Promise((resolve, reject) => {
			this.db.collection('users').findOne(query, (error, user) => {
				if (error) {
					reject(error);
				} else {
					resolve(user);
				}
			})
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

