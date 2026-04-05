const express = require("express");
const router = express.Router();
const db = require("../db");

// Get menu items by restaurant
router.get("/:restaurant_id", (req, res) => {
    const { restaurant_id } = req.params;

    db.all(
        "SELECT * FROM menu_items WHERE restaurant_id = ?",
        [restaurant_id],
        (err, rows) => {
            if (err) return res.json({ error: err });
            res.json(rows);
        }
    );
});

module.exports = router;