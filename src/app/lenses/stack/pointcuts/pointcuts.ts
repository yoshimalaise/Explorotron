export const pointcut = (name, node) => name === "apply" && node.type === "CallExpression";