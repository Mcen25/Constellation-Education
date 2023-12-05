console.log('Server-side code running');

const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;
app.use(express.static('public'));

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Constellations',
  password: 'AppaMomo2025',
  port: 5432,
});

client.connect();

app.get('/constellation', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT fullName FROM constellation');
    res.send(rows);
    console.log(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving users from database');
  }
});

// const tableName = 'constellation';
// const query = `SELECT * FROM ${tableName}`;

// client.query(query, (err, result) => {
//   if (err) {
//     console.error('Error executing query', err);
//     client.end();
//     return;
//   }

//   const rows = result.rows;
//   console.log('Rows from the table:', rows);

//   client.end();
// });

app.listen(port, () => {
  console.log('listening on 3000 on http://localhost:3000/');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});