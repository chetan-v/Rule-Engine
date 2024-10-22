class ASTNode {
  constructor(type, value = null) {
    this.type = type; // 'operator' (AND/OR) or 'operand' (age, salary, etc.)
    this.value = value; // e.g., 30 for age > 30
    this.left = null; // Reference to left node (if operator)
    this.right = null; // Reference to right node (if operator)
  }
}

module.exports = ASTNode;
