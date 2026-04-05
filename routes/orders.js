const express = require("express");
const router = express.Router();
const db = require("../db");

// Place Order
router.post("/place", (req, res) => {
    const { user_email, restaurant_id, total_amount, items } = req.body;

    if (!user_email) return res.status(400).json({ error: "User email is required" });
    if (!items || items.length === 0) return res.status(400).json({ error: "No items in order" });

    const created_at = new Date().toLocaleString();

    // First, find user ID by email
    db.get("SELECT id FROM users WHERE email = ?", [user_email], (err, user) => {
        if (err) {
            console.error("Order DB Error (User Scan):", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        if (!user) {
            console.error("Order Error: User not found for email:", user_email);
            return res.status(404).json({ error: "User not found. Please log in again." });
        }

        db.run(
            "INSERT INTO orders (user_id, restaurant_id, total_amount, status, created_at) VALUES (?, ?, ?, ?, ?)",
            [user.id, restaurant_id, total_amount, "Preparing", created_at],
            function (err) {
                if (err) {
                    console.error("Order Insertion Error:", err.message);
                    return res.status(500).json({ error: err.message });
                }

                const orderId = this.lastID;
                console.log("Order created successfully, ID:", orderId);

                // Insert into order_items
                items.forEach(item => {
                    db.run(
                        "INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)",
                        [orderId, 0, item.qty, item.price],
                        (err) => { if(err) console.error("Order Item Insertion Error:", err.message); }
                    );
                });

                res.json({ message: "Order placed", order_id: orderId });
            }
        );
    });
});

// Order History
router.get("/history/:email", (req, res) => {
    const email = req.params.email;
    const query = `
        SELECT o.id, o.total_amount, o.status, o.created_at, r.name as restaurant_name
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN restaurants r ON o.restaurant_id = r.id
        WHERE u.email = ?
        ORDER BY o.id DESC
    `;
    
    db.all(query, [email], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get Live Order Status
router.get("/status/:id", (req, res) => {
    const orderId = req.params.id;
    db.get("SELECT status FROM orders WHERE id = ?", [orderId], (err, row) => {
        if (err || !row) return res.status(404).json({ error: "Order not found" });
        res.json(row);
    });
});

module.exports = router;