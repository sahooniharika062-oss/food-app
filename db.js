const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/app.db", (err) => {
    if (err) console.log("Error:", err);
    else console.log("SQLite Connected");
});

db.serialize(() => {

    // Users Table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    `);

    // Restaurants Table
    db.run(`
        CREATE TABLE IF NOT EXISTS restaurants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            rating REAL,
            time TEXT,
            image TEXT,
            category TEXT
        )
    `);

    // 🏆 Seeding Restaurants Table (Fixes Order History Join)
    const seedRestaurants = [
        [1, 'KFC', 4.2, '30 mins', 'images/restaurants/kfc.jpg', 'American'],
        [2, 'Dominos', 4.5, '25 mins', 'images/restaurants/dominos.jpg', 'Pizza'],
        [3, "Haldiram's", 4.6, '20 mins', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600', 'Veg'],
        [4, 'Sagar Ratna', 4.4, '35 mins', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600', 'Veg'],
        [5, "McDonald's", 4.3, '15 mins', 'images/restaurants/mcd.jpg', 'Burgers'],
        [6, 'Biryani House', 4.4, '40 mins', 'images/restaurants/biryani.jpg', 'Biryani']
    ];

    seedRestaurants.forEach(r => {
        db.run("INSERT OR REPLACE INTO restaurants (id, name, rating, time, image, category) VALUES (?, ?, ?, ?, ?, ?)", r);
    });

    // Menu Items Table
    db.run(`
        CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            restaurant_id INTEGER,
            name TEXT,
            price REAL,
            image TEXT,
            description TEXT,
            is_veg INTEGER DEFAULT 1
        )
    `);

    // Cart Table
    db.run(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            item_id INTEGER,
            quantity INTEGER
        )
    `);

    // Orders Table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            restaurant_id INTEGER,
            total_amount REAL,
            status TEXT DEFAULT 'Pending',
            created_at TEXT
        )
    `);

    // Order Items Table
    db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER,
            item_id INTEGER,
            quantity INTEGER,
            price REAL
        )
    `);

    // Reservations Table
    db.run(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            restaurant_id INTEGER,
            time TEXT,
            guests INTEGER,
            status TEXT DEFAULT 'Confirmed'
        )
    `);

});

module.exports = db;