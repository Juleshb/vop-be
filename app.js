const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//import routers
const audioTrackRouter = require('./routers/audioTrackRoutes');
const albumRouter = require('./routers/albumRoutes');
const userRoutes = require('./routers/userRoutes');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DbConnection,
});

// Attempt to connect to the database
pool.connect((err, client, done) => {
  if (err) {
    console.error('Unable to connect to the database:', err);
  } else {
    console.log('Connected to the database');
    done(); // Release the client back to the pool
  }
});

// Define a route to test the connection
app.get('/', async (req, res) => {
  try {
    // Get a client from the connection pool
    const client = await pool.connect();

    // Execute a sample query to check the connection
    const result = await client.query('SELECT $1::text as message', ['Hello world!']);
    const message = result.rows[0].message;

    // Release the client back to the pool
    client.release();

    // Send a response with the connection status
    res.send(`Database connected! Message from database: ${message}`);
  } catch (err) {
    // If an error occurs, log it and send a 500 response
    console.error(err);
    res.status(500).send('Error occurred');
  }
});

// Mount the routes for AudioTrack and Album
app.use('/api', audioTrackRouter);
app.use('/api', albumRouter);
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on :http://localhost:${port}`);
});
