const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const albumRoutes = require('./routes/albumRoutes');
const songRoutes = require('./routes/songRoutes');
const imageRoutes = require('./routes/imageRoutes');
const eventRoutes = require('./routes/eventRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use('/auth', authRoutes);
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);
app.use('/images', imageRoutes);
app.use('/events', eventRoutes);
app.use('/gallery', galleryRoutes);


app.get("/", (req, res) => {
    res.status(200).json({
      status: "200",
      author: "FamiliHub",
      message: "Most welcome to our API",
    });
  });
  
  db.getConnection()
    .then((connection) => {
      console.log("Connected to the database successfully.");
      connection.release();
  
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 🔥🔥🔥`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to the database:", error.message);
      process.exit(1);
    });
  
  module.exports = app;
  