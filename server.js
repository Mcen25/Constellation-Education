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

    this.app.post('/list/create', async (request, response) => {
      try {
        const createList = request.body;
        const addName1 = request.body;
        const addName2 = request.body;
        const addName3 = request.body;
        const addName4 = request.body;
        const addName5 = request.body;

        const createListValue = createList.createListValue;
        const addName1Value = addName1.addName1Value;
        const addName2Value = addName2.addName2Value;
        const addName3Value = addName3.addName3Value;
        const addName4Value = addName4.addName4Value;
        const addName5Value = addName5.addName5Value;
    
        if (createListValue || addName1Value || addName2Value || addName3Value || addName4Value || addName5Value) {
          await self.db.createList(createListValue, addName1Value, addName2Value, addName3Value, addName4Value, addName5Value);
          response.status(200).send({status : "success"});
        } else {
          response.status(400).json({ error: 'Invalid search value' });
        }
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
      }
    });

    this.app.post('/list/update', async (request, response) => {
      try {
        const updateList = request.body;
        const updateName1 = request.body;
        const updateName2 = request.body;
        const updateName3 = request.body;
        const updateName4 = request.body;
        const updateName5 = request.body;

        const updateListValue = updateList.updateListValue;
        const updateName1Value = updateName1.updateName1Value;
        const updateName2Value = updateName2.updateName2Value;
        const updateName3Value = updateName3.updateName3Value;
        const updateName4Value = updateName4.updateName4Value;
        const updateName5Value = updateName5.updateName5Value;
    
        if (updateListValue || updateName1Value || updateName2Value || updateName3Value || updateName4Value || updateName5Value) {
          await self.db.updateList(updateListValue, updateName1Value, updateName2Value, updateName3Value, updateName4Value, updateName5Value);
          response.status(200).send({status : "success"});
        } else {
          response.status(400).json({ error: 'Invalid search value' });
        }
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
      }
    });

    this.app.post('/list/read', async (request, response) => {
      try {
        const id = request.body;
        const searchValue = id.readListSearchValue;
    
        if (searchValue) {
          const constellation = await self.db.readList(searchValue);

          response.status(200).send(JSON.stringify(constellation));
        } else {
          response.status(400).json({ error: 'Invalid search value' });
        }
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
      }
    });

    this.app.post('/list/delete', async (request, response) => {
      try {
        const id = request.body;
        const searchValue = id.deleteListSearchValue;
    
        if (searchValue) {
          const constellation = await self.db.deleteList(searchValue);

          response.status(200).send(JSON.stringify(constellation));
        } else {
          response.status(400).json({ error: 'Invalid search value' });
        }
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
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

