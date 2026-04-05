const express = require("express");
const router = express.Router(); // <-- this was missing
const db = require("../db"); // make sure path is correct

// -------- Register --------
router.post("/register", (req, res) => {
  const { name, email, pass } = req.body;

  if (!name || !email || !pass) return res.json({ message: "Fill all fields" });

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.run(query, [name, email, pass], function(err) {
    if (err) {
      console.error("Registration Error:", err.message);
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.json({ message: "Email already exists" });
      }
      return res.json({ message: "Database error: " + err.message });
    }
    res.json({ message: "User registered", id: this.lastID });
  });
});

// -------- Login --------
// -------- Login --------
router.post("/login", (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) return res.json({ message: "Fill all fields" });

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.get(query, [email, pass], (err, row) => {
    if (err) {
      console.error(err);
      return res.json({ message: "Database error" });
    }

    if (row) {
      // Successful login
      return res.json({ message: "Login successful", name: row.name });
    } else {
      // Failed login
      return res.json({ message: "Invalid email or password" });
    }
  });
});
module.exports = router;