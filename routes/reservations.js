const express = require("express");
const router = express.Router();
const db = require("../db");

// Book a table
router.post("/book", (req, res) => {
    const { user_email, restaurant_id, time, guests } = req.body;

    // Find user ID by email
    db.get("SELECT id FROM users WHERE email = ?", [user_email], (err, user) => {
        if (err || !user) return res.status(500).json({ error: "User not found" });

        db.run(
            "INSERT INTO reservations (user_id, restaurant_id, time, guests, status) VALUES (?, ?, ?, ?, ?)",
            [user.id, restaurant_id, time, guests, "Confirmed"],
            function (err) {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: "Table booked successfully", id: this.lastID });
            }
        );
    });
});

// Reservation History
router.get("/history/:email", (req, res) => {
    const email = req.params.email;
    const query = `
        SELECT r.id, r.time, r.guests, r.status, res.name as restaurant_name
        FROM reservations r
        JOIN users u ON r.user_id = u.id
        JOIN restaurants res ON r.restaurant_id = res.id
        WHERE u.email = ?
        ORDER BY r.id DESC
    `;
    
    db.all(query, [email], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
