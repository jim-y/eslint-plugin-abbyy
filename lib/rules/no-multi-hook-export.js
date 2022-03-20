/* eslint-disable node/no-unpublished-require */
const path = require('path');

module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        docs: {
            description: 'Checks if only one custom hook is exported per file',
            recommended: true,
            url: 'to-be-added'
        },
        messages: {
            'no-extra-export':
                'Only one hook export is allowed in a custom hook file'
        }
    },
    create: function (context) {
        const fileName = path.parse(context.getFilename()).name;
        const isCustomHook = isHook(fileName);
        let hookExportCount = 0;

        function isHook(text) {
            if (!text.startsWith('use')) return false;
            if (text.length === 3) return false;
            if (text[3] === text[3].toUpperCase()) return true;
            return false;
        }

        function isHookExport(node) {
            const declaration = node.declaration;
            const isFunctionDeclaration =
                declaration.type === 'FunctionDeclaration' &&
                declaration.id &&
                isHook(declaration.id.name);
            const isFunctionExpression =
                declaration.declarations &&
                declaration.declarations.filter((_declaration) => {
                    return (
                        _declaration.id.type === 'Identifier' &&
                        isHook(_declaration.id.name) &&
                        _declaration.init.type === 'ArrowFunctionExpression'
                    );
                }).length > 0;
            return isFunctionDeclaration || isFunctionExpression;
        }

        function countHookSpecifiers(node) {
            const hookAlikeSpecifiers = node.specifiers.filter((specifier) => {
                return (
                    specifier.local.type === 'Identifier' &&
                    isHook(specifier.local.name)
                );
            });
            if (hookAlikeSpecifiers.length > 0) {
                const variables = context.getScope().variables;
                return hookAlikeSpecifiers.filter((hookAlikeSpecifier) => {
                    return (
                        variables.findIndex((variable) => {
                            const variableNode = variable.defs[0].node;
                            let isFunction = false;
                            if (variableNode.init) {
                                isFunction =
                                    variableNode.init.type ===
                                        'ArrowFunctionExpression' ||
                                    variableNode.init.type ===
                                        'FunctionExpression';
                            } else if (variableNode.init == null) {
                                isFunction =
                                    variableNode.type === 'FunctionDeclaration';
                            }
                            return (
                                variable.name ===
                                    hookAlikeSpecifier.local.name && isFunction
                            );
                        }) > -1
                    );
                });
            } else {
                return 0;
            }
        }

        function makeCheck(node) {
            if (isCustomHook) {
                if (node.declaration != null && isHookExport(node)) {
                    hookExportCount++;
                } else if (node.specifiers && node.specifiers.length > 0) {
                    hookExportCount += countHookSpecifiers(node).length;
                }
            }
        }

        return {
            ExportNamedDeclaration: makeCheck,
            ExportDefaultDeclaration: makeCheck,
            'Program:exit': function (node) {
                if (hookExportCount > 1) {
                    context.report({
                        node,
                        messageId: 'no-extra-export'
                    });
                }
            }
        };
    }
};
