const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Rule name
  ast: { type: mongoose.Schema.Types.Mixed, required: true }, // Store the AST as a flexible object
});

module.exports = mongoose.model("Rule", RuleSchema);
