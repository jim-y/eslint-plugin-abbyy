/* eslint-disable eslint-plugin/no-only-tests */
const rule = require('../../../lib/rules/no-multi-hook-export');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2017
    }
});

ruleTester.run('no-multi-hook-export', rule, {
    valid: [
        {
            name: 'should allow one hook export',
            code: `
              export function useTheme() {
                const [state, setState] = useState();
                return state;
              }
            `,
            filename: 'useTheme.ts'
        },
        {
            name: 'should allow one default hook export',
            code: `
              export default function useTheme() {
                const [state, setState] = useState();
                return state;
              }
            `,
            filename: 'useTheme.ts'
        },
        {
            name: 'should allow one default hook export (fn expr)',
            code: `
              const useTheme = () => {
                const [state, setState] = useState();
                return state;
              }
              export default useTheme;
            `,
            filename: 'useTheme.ts'
        },
        {
            name: 'should allow exporting multiple functions if not a custom hook file',
            code: `
              export function useSomething() {
                const [state, setState] = useState();
                return state;
              }
            `,
            filename: 'runtime-utils.ts'
        },
        {
            name: 'should allow one hook export and arbitrary other exports',
            code: `
              export function useTheme() {}
              export function notAHook() {}
              export class MyClass {}
              export default 1;
            `,
            filename: 'useTheme.ts',
            errors: [{ messageId: 'no-extra-export' }]
        },
        {
            name: 'should allow one hook function expression export and arbitrary other exports',
            code: `
              const useTheme = () => {}
              export { useTheme }
              export class MyClass {}
              export default 1;
            `,
            filename: 'useTheme.ts',
            errors: [{ messageId: 'no-extra-export' }]
        },
        {
            name: 'should allow one hook function declaration export and arbitrary other exports',
            code: `
              function useTheme() {}
              class MyClass {}
              export { useTheme, MyClass }
              export default 1;
            `,
            filename: 'useTheme.ts',
            errors: [{ messageId: 'no-extra-export' }]
        }
    ],
    invalid: [
        {
            name: 'should NOT allow multiple function declaration exports',
            code: `
              export function useTheme() {}
              export function useThemeProvider() {}
            `,
            filename: 'useTheme.ts',
            errors: [{ messageId: 'no-extra-export' }]
        },
        {
            name: 'should NOT allow multiple function expression exports',
            code: `
              export const useTheme = () => {}
              export const useThemeProvider = () => {}
            `,
            filename: 'useTheme.ts',
            errors: [{ messageId: 'no-extra-export' }]
        },
        {
            name: 'should NOT allow multiple mixed type function exports',
            code: `
              export const useTheme = () => {}
              export function useThemeProvider() {}
            `,
            filename: 'useTheme.ts',
            errors: [{ messageId: 'no-extra-export' }]
        },
        {
            name: 'should NOT allow multiple mixed barrell exports',
            code: `
              const useTheme = () => {}
              function useThemeProvider() {}
              export { useTheme, useThemeProvider }
            `,
            filename: 'useTheme.ts',
            errors: [{ messageId: 'no-extra-export' }]
        }
    ]
});
