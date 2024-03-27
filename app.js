const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;
//require('./config/database');

// Connect to MongoDB using Mongoose

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient instance with specified options
const client = new MongoClient(uri, {
  // Set the MongoDB Server API version to v1
  serverApi: {
    version: ServerApiVersion.v1,
    // Enable strict mode for API compatibility checks
    strict: true,
    // Enable deprecation errors to be thrown for deprecated API usage
    deprecationErrors: true,
    // Adjust timeout for server selection (adjust value as needed)
    serverSelectionTimeoutMS: 5000, // 5 seconds
    // Adjust timeout for socket operations (adjust value as needed)
    socketTimeoutMS: 45000, // 45 seconds
  }
});

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


// Define routes
const audioTrackRouter = require('./routers/audioTrackRoutes');
const albumRouter = require('./routers/albumRoutes');
const userRoutes = require('./routers/userRoutes');

// Define a route to test the connection
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Mount the routes
app.use('/api', audioTrackRouter);
app.use('/api', albumRouter);
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
