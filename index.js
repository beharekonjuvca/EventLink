const express = require("express");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const organizationRoutes = require("./routes/organizationRoutes");
const adminRoutes = require("./routes/adminRoutes");
// Adjust the path as necessary

const app = express();

const sequelize = require("./config/db"); // Adjust the path as necessary

// Sync all models that are not already in the database
sequelize
  .sync()
  .then(() => {
    console.log(
      "Users table has been successfully created, if it does not exist"
    );
  })
  .catch((error) => {
    console.error("This error occurred", error);
  });

// Your server setup continues here...

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json()); // Middleware to parse JSON bodies

// Use organization routes
app.use("/api/organization", organizationRoutes);
// Use admin routes
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
