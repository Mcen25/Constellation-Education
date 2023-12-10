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
    this.collectionList = this.db.collection('List');

    const count1 = await this.collection.countDocuments();
    const count2 = await this.collectionList.countDocuments();

    if (count1 === 0) {
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
      
    if (count2 === 0) {
      await this.collection.insertOne([
        {
          id: "set1",
          name1: "Andromeda",
          name2: "Aquarius",
          name3: "Aquila",
          name4: "Ara",
          name5: "Aries",
        }
      ]);
    }
   
  }
  // Close the pool.
  async close() {
    this.client.close();
  }

  async readConstellation(fullName) {
    const res = await this.collection.findOne({ "fullName": fullName});
    return res;
  }

   // CREATE a user in the database.
   async createList(idName, givenName1, givenName2, givenName3, givenName4, givenName5) {
    const res = await this.collection.insertOne({ id: idName, givenName1, name2: givenName2, name3: givenName3, name4: givenName4, name5: givenName5 });
    return res;
  }

  // READ a user from the database.
  async readList(idName) {
    const res = await this.collection.findOne({ id: idName });
    return res;
  }

  // UPDATE a user in the database.
  async updateList(id, name, age) {
    const res = await this.collection.updateOne(
      { _id: id },
      { $set: { name, age } }
    );
    return res;
  }

  // DELETE a user from the database.
  async deleteList(id) {
    const res = await this.collection.deleteOne({ id: idName });
    return res;
  }
}
