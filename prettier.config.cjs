// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  printWidth: 100,
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  trailingComma: 'all',
  useTabs: false,
  importOrderParserPlugins: ['typescript', 'jsx'],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/types(.*)$',
    '^@/components(.*)$',
    '^@/context(.*)$',
    '^@/hooks(.*)$',
    '^@/util(.*)$',
    '^@/libs(.*)$',
    '^@/styles(.*)$',
    '',
    '^[./]',
    '^[../]',
    '',
  ],
}
