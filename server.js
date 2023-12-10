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

    // this.app.get('/person/create', async (req, res) => {
    //   try {
    //     const { id, name, age } = req.query;
    //     const person = await self.db.createPerson(id, name, age);
    //     res.send(JSON.stringify(person));
    //   } catch (err) {
    //     res.status(500).send(err);
    //   }
    // });

    this.app.get('/read', async (req, res) => {
      try {
        const { id } = req.query;
        const name = await self.db.readPerson(id);
        console.log(name);
        res.send(JSON.stringify(name));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // this.app.get('/person/update', async (req, res) => {
    //   try {
    //     const { id, name, age } = req.query;
    //     const person = await self.db.updatePerson(id, name, age);
    //     res.send(JSON.stringify(person));
    //   } catch (err) {
    //     res.status(500).send(err);
    //   }
    // });

    // this.app.get('/person/delete', async (req, res) => {
    //   try {
    //     const { id } = req.query;
    //     const person = await self.db.deletePerson(id);
    //     res.send(JSON.stringify(person));
    //   } catch (err) {
    //     res.status(500).send(err);
    //   }
    // });

    // this.app.post('/constellation', async (request, response) => {
    //   const search = request.body;
    //   try { 
    //     // const constellation = await self.db.readConstellation(searchValue.search);
    //     const constellation = search.searchValue;
    //     console.log(constellation);
    //     response.send(JSON.stringify(constellation));
    //     //console.log(options.search);
    //   } catch (err) {
    //     response.status(500).send(err);
    //     response.status(500).send(err.message);
    //   }
    // });

    // this.app.post('/constellation', async (request, response) => {
    //   const search = request.body;
    //   try { 
    //     const constellation = search.searchValue;
    //     console.log(constellation);
    //     response.send(JSON.stringify(constellation));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });

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

    // this.app.post('/constellation/postName', (req, res) => {
    //   const searchValue = req.body;
    //   console.log(searchValue);
    //   // Call your function here with the searchValue
    //   // Example: myFunction(searchValue);
    //   res.redirect('/'); // Redirect to another page after processing the input
    // });

    this.app.get('/constellation/name', async (req, res) => {
      try {
        const constellation = await self.db.readConstellation();
        console.log(constellation);
        res.send(JSON.stringify(constellation));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/person/all', async (req, res) => {
      try {
        const people = await self.db.readAllPeople();
        console.log(people);
        res.send(JSON.stringify(people));
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

