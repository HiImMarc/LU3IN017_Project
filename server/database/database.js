const { MongoClient } = require('mongodb');

async function connectToDatabase() {
  const client = new MongoClient('mongodb+srv://admin:ProjetWebMotDePasse@birdy.hdf5l2g.mongodb.net/test');
  await client.connect();
  return client;
}

module.exports = connectToDatabase();