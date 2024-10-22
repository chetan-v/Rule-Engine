require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const ruleRoutes = require("./routes/rules");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use("/api/rules", ruleRoutes);

// Test database connection and start the server
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    app.listen(5000, () =>
      console.log("Server is running on port 3000 another")
    );
  })
  .catch((err) => console.error("Error connecting to the database:", err));
