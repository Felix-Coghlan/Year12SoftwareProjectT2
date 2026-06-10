const express = require("express");
const sqlite = require('sqlite3');
const path = require("path");
const app = express();

app.get("/search", (req, res) => {
  const query = req.query.q;
  
  // Construct database path
  const dbPath = path.join(__dirname, ".database/datasource.db"); 

  // Open the database connection
  const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
      // Return if connection fails
      return res.status(500).json({ error: "Failed to connect to database." });
    }
  });
  
  db.get("SELECT name, genre, subgenre, creator, releasedate, hyperlink FROM Games WHERE name=?", [query], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    } else {
      // Send the data (or an empty object if no match is found)
      res.json(rows || {});
    }
    // Always close the database connection when done
    db.close(); 
  });
});

// genre search
app.get("/genresearch", (req, res) => {
  const query = req.query.q;
  
  // Construct path
  const dbPath = path.join(__dirname, ".database/datasource.db"); 

  // Open the database connection
  const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
      // Return if connection fails
      return res.status(500).json({ error: "Failed to connect to database." });
    }
  });
  
  db.all("SELECT name, genre, subgenre, creator, releasedate, hyperlink FROM Games WHERE genre=?", [query], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    } else {
      // Send the data (or an empty object if no match is found)
      res.json(rows || {});
    }
    // Always close the database connection when done
    db.close(); 
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/home.html"));
});

app.use(express.static(path.join(__dirname, ".database")));

app.listen(8000, () => console.log("Server is running on Port 8000, visit http://localhost:8000/ or http://127.0.0.1:8000 to access your website") );
