console.log('Server-side code running');

import 'dotenv/config';
import express from 'express';
import { ConstellationDatabase } from './database.js';
import bodyParser from 'body-parser';

class ConsetllationServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.post('/constellation/postName', async (request, response) => {
      try {
        const search = request.body;
        const searchValue = search.searchValue;
    
        if (searchValue) {
          const constellation = await self.db.readConstellation(searchValue);

          response.status(200).send(JSON.stringify(constellation));
        } else {
          response.status(400).json({ error: 'Invalid search value' });
        }
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
      }
    });

    this.app.get('/constellation/getAll', async (request, response) => {
      try {
        const constellations = await self.db.readAllConstellations();
        response.status(200).send(JSON.stringify(constellations));
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
      }
    });

    this.app.get('/list/create', async (req, res) => {
      try {
        const { id, name, age } = req.query;
        const person = await self.db.createPerson(id, name, age);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/list/read', async (req, res) => {
      try {
        const { id } = req.query;
        const person = await self.db.readPerson(id);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/list/update', async (req, res) => {
      try {
        const { id, name, age } = req.query;
        const person = await self.db.updatePerson(id, name, age);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/list/delete', async (req, res) => {
      try {
        const { id } = req.query;
        const person = await self.db.deletePerson(id);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });


  }

  async initDb() {
    this.db = new ConstellationDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(express.static('public'));

    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;

    this.app.listen(port, () => {
      console.log(`PeopleServer listening on port ${port}! on http://localhost:${port}`);
    });
    this.app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
  }
}

const server = new ConsetllationServer(process.env.DATABASE_URL);
server.start();

