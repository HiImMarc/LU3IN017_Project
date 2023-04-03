const {MongoClient} = require('mongodb');

const express = require('express'); 
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Users = require('./entities/Users');

async function main(){


  const url = 'mongodb+srv://admin:ProjetWebMotDePasse@birdy.hdf5l2g.mongodb.net/Birdy';
  const client = new MongoClient(url);
  await client.connect();

  try {

    app.get('/', async (req, res) => {
      const ch = 'blah'
      res.json(ch)
    })
    
    
    app.get('/users', async (req,res)=>{
        const data = client.db('Birdy').collection('Users').find();
        res.json(data);
    })
    
    
    // Créer un nouvel utilisateur
    app.post('/users/new', async (req, res) => {
      const { login, password, name, lastname } = req.body; //On récupère les identifiants
      try {
        const userId = await new Users(db).create(login, password, name, lastname); //On crée une instance User avec les identifiants
        res.status(201).json({ id: userId }); //On revoie le userId
      } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur' });
      }
    });
    
    // Mettre à jour un utilisateur existant
    app.put('/users/:id', async (req, res) => {
      const userId = req.params.id;
      const { login, password, lastname, firstname } = req.body;
      try {
        const result = await new Users(db).put(userId, login, password, lastname, firstname);
        if (result === 0) {
          res.status(404).json({ error: `Utilisateur avec l'identifiant ${userId} non trouvé` });
        } else {
          res.status(204).end();
        }
      } catch (error) {
        res.status(500).json({ error: `Une erreur est survenue lors de la mise à jour de l'utilisateur ${userId}` });
      }
    });
    
    // Supprimer un utilisateur existant
    app.delete('/users/:id', async (req, res) => {
      const userId = req.params.id;
      try {
        const result = await new Users(db).delete(userId);
        if (result === 0) {
          res.status(404).json({ error: `Utilisateur avec l'identifiant ${userId} non trouvé` });
        } else {
          res.status(204).end();
        }
      } catch (error) {
        res.status(500).json({ error: `Une erreur est survenue lors de la suppression de l'utilisateur ${userId}` });
      }
    });
  }

  catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}

main();

app.listen(8000, () => { console.log("Serveur écoute port 8000")})

