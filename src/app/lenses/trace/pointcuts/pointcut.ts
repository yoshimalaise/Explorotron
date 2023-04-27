export const pointcut = (name, node) => {
  if (
    name === 'read' &&
    (node.type === 'Identifier' ||
      node.type === 'ForStatement' ||
      node.type === 'ExpressionStatement' ||
      node.type === 'UpdateExpression' ||
      node.type === 'UnaryExpression')
  ) {
    return true;
  } else if (
    name === 'write' &&
    (node.type === 'Identifier' ||
      node.type === 'AssignmentExpression' ||
      node.type === 'ExpressionStatement' ||
      node.type === 'ForOfStatement' ||
      node.type === 'ForInStatement' ||
      node.type === 'ForStatement' ||
      node.type === 'VariableDeclarator' ||
      node.type === 'VariableDeclaration' ||
      node.type === 'UpdateExpression')
    // ||
    // node.type === "FunctionDeclaration"
  ) {
    return true;
  } else if (
    name === 'enter' &&
    node.type === 'BlockStatement'
  ) {
    return true;
  }
}