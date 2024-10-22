const ASTNode = require("../models/astNode");

// Combine two or more ASTs using AND/OR logic
function combineASTs(astArray, operator = "AND") {
  let root = astArray[0];
  for (let i = 1; i < astArray.length; i++) {
    const newNode = new ASTNode("operator", operator);
    newNode.left = root;
    newNode.right = astArray[i];
    root = newNode;
  }
  return root;
}

// Evaluate AST against input data
function evaluateAST(ast, data) {
  if (ast.type === "operand") {
    return evaluateCondition(ast, data);
  }

  const leftResult = evaluateAST(ast.left, data);
  const rightResult = evaluateAST(ast.right, data);

  if (ast.value === "AND") {
    return leftResult && rightResult;
  }
  if (ast.value === "OR") {
    return leftResult || rightResult;
  }
  return false;
}

function evaluateCondition(ast, data) {
  const { value, key, comparator } = ast; // Assuming ast has fields like key, value, comparator (e.g., age > 30)
  switch (comparator) {
    case ">":
      return data[key] > value;
    case "<":
      return data[key] < value;
    case "=":
      return data[key] === value;
    default:
      return false;
  }
}

module.exports = { combineASTs, evaluateAST };
