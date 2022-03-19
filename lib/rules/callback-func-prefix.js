const rulePrefix = ["is", "pre", "on", "post", "get", "set"];
const isValidName = (name, { prefix, exclude }) => {
  const isValid = (prefix) => name.indexOf(prefix) === 0;
  return exclude.some(isValid) || prefix.some(isValid);
};

module.exports = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: 'Matches the prefix of a callback function',
      recommended: true,
      url: 'to-be-added',
    }
  },
  create: function (context) {
    const { options } = context;
    const { include = [], exclude = [] } = options[0] || {};
    return {
      Identifier: (node) => {
        console.log(JSON.stringify(node, null, 2));
        if (node.parent.init && 
          node.parent.init.type === "ArrowFunctionExpression"
          // You can add more checks here
        ) {
       
        const { name } = node;
        const allPrefix = [...include, ...rulePrefix].sort();
        // Sorting is optional
        
        if (!isValidName(name, { prefix: allPrefix, exclude })) {
          context.report({ node, message: `${name} should start with ${allPrefix.join(", ")}.` });
        }
       }
      },
    };
  }
}