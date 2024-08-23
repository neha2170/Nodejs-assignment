const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/schoolRoutes");
const db = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());

db.getConnection()
  .then(() => {
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process with an error
  });

// Routes
app.use("/api/schools", schoolRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the School Management API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
