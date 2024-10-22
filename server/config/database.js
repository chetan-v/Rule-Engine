const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:password@db:5432/rule_engine",
  {
    dialect: "postgres",
    logging: false, // Disable logging to keep the console clean
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Error connecting to the database:", err));

module.exports = sequelize;
