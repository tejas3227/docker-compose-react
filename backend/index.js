const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); 

const app = express();
app.use(cors()); 
let db;

// 🔁 Retry DB connection
function connectDB() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,          // service name from docker-compose
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  db.connect(err => {
    if (err) {
      console.log("DB not ready, retrying in 5s...");
      setTimeout(connectDB, 5000);
    } else {
      console.log("Connected to MySQL ✅");
    }
  });
}

// ✅ API route
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
// ✅ Start server ONCE
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start DB connection
connectDB();
