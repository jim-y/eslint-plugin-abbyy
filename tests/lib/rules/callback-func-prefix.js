const rule = require('../../../lib/rules/callback-func-prefix');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({})

ruleTester.run('callback-func-prefix', rule, {
  valid: [{
    code: 'function onHandleClick() {}'
  }],
  invalid: [{
    code: "const finish = () => {}",
    parserOptions: { ecmaVersion: 2016 },
    errors: [{ messageId: 'cb-func-prefix-error' }]
  }]
})