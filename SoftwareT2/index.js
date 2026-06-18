const express = require("express");
const sqlite = require('sqlite3');
const path = require("path");
const app = express();
const fs = require("fs"); // reads in files

app.use(express.json()); 

// Registration
app.post("/send", (req, res) => {
  const { username, password } = req.body;
  console.log('I got a request!')
  console.log(req.body)
  // Construct database path
  const dbPath = path.join(__dirname, ".database/datasource.db");
  const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
      // Return if connection fails
      return res.status(500).json({ error: "Failed to connect to database." });
    }
  });

  const sql = `INSERT INTO Accounts (username, password) VALUES (?, ?)`;
  db.run(sql, [username, password], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error saving data to the database.');
        }
        res.status(200).send('Data successfully stored in SQL Database!');
    });

});


// Login
app.post("/search", (req, res) => {
  const { LoginUsername, LoginPassword } = req.body;
  console.log('I got a login request!');
  console.log(req.body);
  
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
  
  
  db.get("SELECT username, password FROM Accounts WHERE username=?", [LoginUsername], (err, rows) => {
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

// Student Registration
app.post("/student", (req, res) => {
  const { Owner, Name, Age, Class, Skill } = req.body;
  const dbPath = path.join(__dirname, ".database/datasource.db");
  const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
      // Return if connection fails
      return res.status(500).json({ error: "Failed to connect to database." });
    }
  });

  const sql = `INSERT INTO Students (owner, name, age, class, skill) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [Owner, Name, Age, Class, Skill], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error saving data to the database.');
        }
        res.status(200).send('Data successfully stored in SQL Database!');
    });
});

// Grabs student data
app.post("/students", (req, res) => {
  const {Owner} = req.body;
  
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
  
  db.all("SELECT owner, name, age, class, skill FROM Students WHERE owner=?", [Owner], (err, rows) => {
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

//  Grabs student based on their name, not on the owner
app.post("/studentsdata", (req, res) => {
  const {Student} = req.body;
  
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
  
  db.all("SELECT owner, name, age, class, skill FROM Students WHERE name=?", [Student], (err, rows) => {
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

// Grabs all records
app.post("/records", (req, res) => {
  const {Student} = req.body;
  
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
  
  db.all("SELECT student, records FROM Records WHERE student=?", [Student], (err, rows) => {
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

// Grabs all checklist data
app.post("/checklist", (req, res) => {
  const {Student} = req.body;
  
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
  
  db.all("SELECT student, safeentry, treading, backfloat, backscull, duckdive, paddling, freestyle FROM Checklist WHERE student=?", [Student], (err, rows) => {
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

// Middleware for uploading
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

app.post('/upload', upload.single('avatar'), function (req, res) {
  console.log('Upload request received')
  const student = req.body.student;

  // Construct path
  const dbPath = path.join(__dirname, ".database/datasource.db"); 

  // Open the database connection
  const db = new sqlite.Database(dbPath);
  
  const filePath = req.file.path;
  console.log(filePath);

  fs.readFile(filePath, "utf-8", function(err, data){
    console.log(data)
    
    const sql = `INSERT INTO Records (student, records) VALUES (?, ?)`;
    db.run(sql, [student, data], function (err) {
          if (err) {
              console.error(err.message);
              return res.status(500).send('Error saving data to the database.');
          }
          res.status(200).send('Data successfully stored in SQL Database!');
      });
  });

  fs.unlink(filePath, function(err) {
    // Removes the file after finished reading
  });
});


// Reads in checklist data to update values
app.post("/checklistread", (req, res) => {
  const { student, safeentry, treading, backfloat, backscull, duckdive, paddling, freestyle } = req.body;
  
  // Construct path
  const dbPath = path.join(__dirname, ".database/datasource.db"); 

  // Open the database connection
  const db = new sqlite.Database(dbPath)

  const sql = `UPDATE Checklist 
SET safeentry = ?, treading = ?, backfloat = ?, backscull = ?, duckdive = ?, paddling = ?, freestyle = ? 
WHERE student = ?`;
  db.run(sql, [safeentry, treading, backfloat, backscull, duckdive, paddling, freestyle, student], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error saving data to the database.');
        }
        res.status(200).send('Data successfully stored in SQL Database!');
  });
});


// Makes the checklists for students
app.post("/checklistMake", (req, res) => {
  const { student } = req.body;
  
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
  
  const sql = `INSERT INTO Checklist (student) VALUES (?)`;
  db.run(sql, [student]);

  db.all("SELECT student FROM Checklist WHERE student=?", [student], (err, rows) => {
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
