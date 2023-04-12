const { MongoClient } = require('mongodb');

// Liste les bases de données
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function connectToDB() {

	const url = 'mongodb+srv://admin:1tz5QiodbevzhJja@birdy.hdf5l2g.mongodb.net/test'
	const client = new MongoClient(url);

	try {
		await client.connect();
		await listDatabases(client);

	} catch (e) {
		console.error(e);
	}

	return client;
}

process.on('SIGINT', () => client.close()); // Quand il y a une IT (genre ctrl c) on ferme la database

module.exports = connectToDB;