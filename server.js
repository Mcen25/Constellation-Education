console.log('Server-side code running');

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;
app.use(express.static('public'));
//const uri = "mongodb+srv://Mcen25:ZCsyZipn0J1fpbnW@constellations.ketcgbo.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://Mcen25:ZCsyZipn0J1fpbnW@constellations.ketcgbo.mongodb.net/?retryWrites=true&w=majority";
//Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log('listening on 3000');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});