const express = require("express");
const router = express.Router();
const db = require("../db");

// Add to cart
router.post("/add", (req, res) => {
    const { user_id, item_id, quantity } = req.body;

    db.run(
        "INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)",
        [user_id, item_id, quantity],
        function (err) {
            if (err) return res.json({ error: err });

            res.json({ message: "Added to cart", id: this.lastID });
        }
    );
});

// Get user cart
router.get("/:user_id", (req, res) => {
    const { user_id } = req.params;

    db.all(
        `SELECT cart.*, menu_items.name, menu_items.price, menu_items.image 
         FROM cart 
         JOIN menu_items ON cart.item_id = menu_items.id
         WHERE user_id = ?`,
        [user_id],
        (err, rows) => {
            if (err) return res.json({ error: err });
            res.json(rows);
        }
    );
});

module.exports = router;