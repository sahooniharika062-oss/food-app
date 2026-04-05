const db = require("./db");

db.serialize(() => {
    db.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        ["Sagarika", "sagarika@example.com", "12345"],
        function (err) {
            if (err) {
                console.log("Insert error:", err);
            } else {
                console.log("User Inserted, ID:", this.lastID);
            }
        }
    );
});