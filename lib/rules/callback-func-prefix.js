const rulePrefix = ['is', 'handle', 'on', 'pre', 'post', 'get', 'set'];
const isValidName = (name, { prefix, exclude }) => {
    const isValid = (prefix) => name.indexOf(prefix) === 0;
    return exclude.some(isValid) || prefix.some(isValid);
};

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        docs: {
            description: 'Matches the prefix of a callback function',
            recommended: true,
            url: 'to-be-added'
        },
        messages: {
            'cb-func-prefix-error': '{{name}} should start with {{prefixes}}.'
        }
    },
    create: function (context) {
        const { options } = context;
        const { include = [], exclude = [] } = options[0] || {};
        return {
            Identifier: (node) => {
                if (
                    node.parent.init &&
                    node.parent.init.type === 'ArrowFunctionExpression'
                    // You can add more checks here
                ) {
                    const { name } = node;
                    const allPrefix = [...include, ...rulePrefix].sort();
                    // Sorting is optional

                    if (!isValidName(name, { prefix: allPrefix, exclude })) {
                        context.report({
                            node,
                            messageId: 'cb-func-prefix-error',
                            data: {
                                name,
                                prefixes: allPrefix.join(', ')
                            }
                        });
                    }
                }
            }
        };
    }
};
