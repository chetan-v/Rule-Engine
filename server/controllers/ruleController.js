const ASTNode = require("../models/astNode");
const Rule = require("../models/Rule");
const { combineASTs, evaluateAST } = require("../services/astService");

// Create a new rule
exports.createRule = async (req, res) => {
  const { ruleString, ast } = req.body;

  try {
    const rule = await Rule.create({ ruleString, ast });
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: "Failed to create rule." });
  }
};

// Combine multiple rules into a single AST
exports.combineRules = async (req, res) => {
  const { ruleASTs, operator } = req.body;

  try {
    const combinedAST = combineASTs(ruleASTs, operator);
    res.status(200).json(combinedAST);
  } catch (error) {
    res.status(500).json({ error: "Failed to combine rules." });
  }
};

// Evaluate the rule's AST against input data
exports.evaluateRule = async (req, res) => {
  const { ast, inputData } = req.body;

  try {
    const result = evaluateAST(ast, inputData);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Failed to evaluate rule." });
  }
};
