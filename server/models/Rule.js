const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rule = sequelize.define(
  "Rule",
  {
    ruleString: {
      type: DataTypes.STRING, // Stores the rule as a string (e.g., "age > 30 AND department = 'Sales'")
      allowNull: false,
    },
    ast: {
      type: DataTypes.JSONB, // Stores the rule's AST in JSON format
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Rule;
