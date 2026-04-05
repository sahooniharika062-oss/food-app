const express = require("express");
const app = express();
const cors = require("cors");

require("./db"); // connect database

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Routes
app.use("/users", require("./routes/users"));
app.use("/restaurants", require("./routes/restaurants"));
app.use("/menu", require("./routes/menu"));
app.use("/cart", require("./routes/cart"));
app.use("/orders", require("./routes/orders"));
app.use("/reservations", require("./routes/reservations"));

app.listen(5000, () => console.log("Server running on port 5000"));