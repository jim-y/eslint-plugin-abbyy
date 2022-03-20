# eslint-plugin-abbyy

eslint plugin abbyy

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-abbyy`:

```sh
npm install eslint-plugin-abbyy --save-dev
```

## Usage

Add `abbyy` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "abbyy"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "abbyy/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here

## Helpful resources

[AST Explorer](https://astexplorer.net/)
[Scope Explorer](http://mazurov.github.io/escope-demo/)
[ESLint - Working with Rules](https://eslint.org/docs/developer-guide/working-with-rules)
[ESLint - RuleTester](https://eslint.org/docs/developer-guide/nodejs-api#ruletester)
[estree](https://github.com/estree/estree)
[esquery - Selectors](https://github.com/estools/esquery)
[ESLint - core rules for inspiration](https://github.com/eslint/eslint/tree/main/lib/rules)
[jspath](https://github.com/dfilatov/jspath)




