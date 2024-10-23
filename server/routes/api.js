const express = require("express");
const router = express.Router();
const Rule = require("../models/Rule");
const {
  createRule,
  combineRules,
  evaluateRule,
} = require("../utils/astParser");

// Route to create a rule
router.post("/create-rule", async (req, res) => {
  try {
    const { name, ruleString } = req.body;

    // Validate input
    if (!name || !ruleString) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Parse the rule string into an AST
    const ast = createRule(ruleString);

    // If AST parsing fails, return an error
    if (!ast) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid rule string format" });
    }

    // Create a new Rule document and save it to MongoDB
    const rule = new Rule({ name, ast });
    await rule.save();

    res.json({ success: true, rule });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to combine multiple rules
// Route to combine rules
router.post("/combine-rules", async (req, res) => {
  try {
    const { newName, oldRuleName, newRuleString } = req.body;

    // Validate input
    if (!newName || !oldRuleName || !newRuleString) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Find the existing rule by its name
    const existingRule = await Rule.findOne({ name: oldRuleName });

    // If no rule is found, return an error
    if (!existingRule) {
      return res
        .status(404)
        .json({ success: false, error: "Existing rule not found" });
    }

    // Parse the new rule string into an AST
    const newAst = createRule(newRuleString);

    // If AST parsing fails, return an error
    if (!newAst) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid new rule string format" });
    }

    // Combine the existing rule AST with the new AST
    const combinedAst = combineRules([existingRule.ast, newAst]);

    // Create a new Rule document with the combined AST
    const combinedRule = new Rule({ name: newName, ast: combinedAst });
    await combinedRule.save();

    res.json({ success: true, rule: combinedRule });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to evaluate a rule against data
router.post("/evaluate-rule", async (req, res) => {
  try {
    const { ruleName, data } = req.body;

    // Validate input
    if (!ruleName) {
      return res
        .status(400)
        .json({ success: false, error: "Rule name is required" });
    }

    if (!data) {
      return res
        .status(400)
        .json({ success: false, error: "Data is required for evaluation" });
    }

    // Find the rule by its name from the database
    const rule = await Rule.findOne({ name: ruleName });
    if (!rule) {
      return res.status(404).json({ success: false, error: "Rule not found" });
    }
    console.log(rule.ast);

    // Evaluate the AST against the provided data
    const result = evaluateRule(rule.ast, data);
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
