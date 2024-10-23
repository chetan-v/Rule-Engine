// Tokenize the rule string
// Tokenize the rule string
const createRule = (ruleString) => {
  // Improved regex to match parentheses, operators, values, and quoted strings
  const tokens = ruleString.match(/\(|\)|AND|OR|[<>=]+|\w+|'[^']*'/g);
  if (!tokens) return null; // If tokenization fails, return null
  return parseExpression(tokens);
};

// Parse the expression recursively
const parseExpression = (tokens) => {
  const parseAndOr = () => {
    let left = parseComparison(); // Start by parsing a comparison

    // Loop to check for AND/OR operators
    while (tokens.length > 0 && (tokens[0] === "AND" || tokens[0] === "OR")) {
      const operator = tokens.shift(); // Get the operator
      const right = parseComparison(); // Parse the next comparison
      left = { type: "operator", value: operator, left, right }; // Create the operator node
    }
    return left; // Return the combined expression
  };

  const parseComparison = () => {
    if (tokens[0] === "(") {
      tokens.shift(); // Remove opening parenthesis
      const expr = parseAndOr(); // Recursively parse the expression within parentheses
      if (tokens[0] === ")") tokens.shift(); // Remove closing parenthesis
      return expr;
    } else {
      const left = tokens.shift(); // Left side of the comparison
      const operator = tokens.shift(); // Operator (e.g., >, <, =)
      let right = tokens.shift(); // Right side of the comparison

      // Check if the right value is quoted
      if (right.startsWith("'") && right.endsWith("'")) {
        right = right.slice(1, -1); // Remove quotes
      }
      return { type: "operand", left, operator, right }; // Return the operand node
    }
  };

  return parseAndOr(); // Start parsing with the AND/OR expression
};

// Combine multiple rules using AND by default
const combineRules = (rules, operator = "AND") => {
  return rules.reduce((combined, rule) => {
    if (!combined) return rule;
    return { type: "operator", value: operator, left: combined, right: rule };
  }, null);
};

// Evaluate the rule
const evaluateRule = (ast, data) => {
  if (ast.type === "operator") {
    const leftResult = evaluateRule(ast.left, data);
    const rightResult = evaluateRule(ast.right, data);

    // Handle AND/OR operators
    return ast.value === "AND"
      ? leftResult && rightResult
      : leftResult || rightResult;
  } else if (ast.type === "operand") {
    const value = data[ast.left]; // Get the value from the data

    // Ensure comparison on the right side is done properly (cast to number if necessary)
    let rightValue = ast.right;
    if (!isNaN(rightValue)) {
      rightValue = parseFloat(rightValue);
    }

    switch (ast.operator) {
      case ">":
        return value > rightValue;
      case "<":
        return value < rightValue;
      case "=":
        return value === rightValue;
      default:
        return false;
    }
  }
};

module.exports = { createRule, combineRules, evaluateRule };
