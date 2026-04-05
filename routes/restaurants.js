const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all restaurants
router.get("/", (req, res) => {
    db.all("SELECT * FROM restaurants", [], (err, rows) => {
        if (err) return res.json({ error: err });
        res.json(rows);
    });
});

// Add restaurant (optional admin use)
router.post("/add", (req, res) => {
    const { name, rating, time, image, category } = req.body;

    db.run(
        "INSERT INTO restaurants (name, rating, time, image, category) VALUES (?, ?, ?, ?, ?)",
        [name, rating, time, image, category],
        function (err) {
            if (err) return res.json({ error: err });
            res.json({ message: "Restaurant added", id: this.lastID });
        }
    );
});

module.exports = router;