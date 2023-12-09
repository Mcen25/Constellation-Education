import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class ConstellationDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    
    this.client = new MongoClient(this.dburl, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });

    // Get the database.
    this.db = this.client.db('Constellations');
    
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('Constellation');

    const count = await this.collection.countDocuments();

    if (count === 0) {
      await this.collection.insertOne([
        {fullName:"Andromeda",
        abbreviations:"And",
        origin:"ancient (Ptolemy)",
        meaning:"Andromeda (The chained maiden or princess)",
        brightestStar:"Alpheratz",
        url:"https://upload.wikimedia.org/wikipedia/commons/8/87/Andromeda_IAU.svg",
        visible:"Visible at latitudes between +90° and −40°.",
        starNum: 16,
        area:722}
      ]);
    }
  }
  // Close the pool.
  async close() {
    this.client.close();
  }

//   // CREATE a user in the database.
//   async createPerson(id, name, age) {
//     const res = await this.collection.insertOne({ _id: id, name, age });
//     // Note: the result received back from MongoDB does not contain the
//     // entire document that was inserted into the database. Instead, it
//     // only contains the _id of the document (and an acknowledged field).
//     return res;
//   }

  // READ a user from the database.
  async readPerson(id) {
    const res = await this.collection.findOne({ fullName: id });
    return res;
  }

  //Read a consetllation from the database.
  async readConstellation(name) {
    const res = await this.collection.findOne({ fullName: 'Andromeda'});
    return res;
  }

//   // UPDATE a user in the database.
//   async updatePerson(id, name, age) {
//     const res = await this.collection.updateOne(
//       { _id: id },
//       { $set: { name, age } }
//     );
//     return res;
//   }

//   // DELETE a user from the database.
//   async deletePerson(id) {
//     // Note: the result received back from MongoDB does not contain the
//     // entire document that was deleted from the database. Instead, it
//     // only contains the 'deletedCount' (and an acknowledged field).
//     const res = await this.collection.deleteOne({ _id: id });
//     return res;
//   }

  // READ all people from the database.
  async readAllPeople() {
    const res = await this.collection.find({}).toArray();
    return res;
  }
}
