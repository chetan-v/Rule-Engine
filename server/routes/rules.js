const express = require("express");
const {
  createRule,
  combineRules,
  evaluateRule,
} = require("../controllers/ruleController");
const router = express.Router();

router.post("/create", createRule); // POST /api/rules/create
router.post("/combine", combineRules); // POST /api/rules/combine
router.post("/evaluate", evaluateRule); // POST /api/rules/evaluate

module.exports = router;
