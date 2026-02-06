import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: {
            globals: globals.node
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports
        },
        rules: {
            'no-duplicate-imports': 'error',
            'no-self-compare': 'error',
            'no-template-curly-in-string': 'warn',
            'no-unreachable-loop': 'error',
            camelcase: ['error', { properties: 'always' }],
            curly: 'error',
            'default-case': 'error',
            'default-case-last': 'error',
            'default-param-last': 'error',
            eqeqeq: 'error',
            'max-depth': ['error', 4],
            'no-console': 'warn',
            'no-else-return': 'error',
            'no-empty-function': 'error',
            'no-lonely-if': 'error',
            'no-unneeded-ternary': 'error',
            'no-var': 'error',
            'no-warning-comments': 'warn',
            'prefer-promise-reject-errors': 'error',
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_'
                }
            ]
        }
    }
];
