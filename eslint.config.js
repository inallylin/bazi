import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import stylisticPlugin from "@stylistic/eslint-plugin"

// ── 共用規則 ──────────────────────────────────────────────────────────────────
const sharedTsRules = {
  "eqeqeq": ["error", "allow-null"],
  "comma-dangle": ["error", "never"],
  "@typescript-eslint/consistent-type-imports": "error",
  "@typescript-eslint/no-empty-interface": "off",
  "@typescript-eslint/no-unused-vars": ["error", {
    caughtErrorsIgnorePattern: "^_",
    argsIgnorePattern: "^_"
  }],
  "@typescript-eslint/explicit-module-boundary-types": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-empty-object-type": "off",
  "@typescript-eslint/no-non-null-assertion": "off",
  "prefer-const": "off",
  "no-bitwise": ["error", { allow: [], int32Hint: false }],

  // stylistic
  "@stylistic/indent": ["error", 2],
  "@stylistic/quotes": ["error", "single"],
  "@stylistic/semi": ["error", "never"],
  "@stylistic/comma-dangle": "off",
  "@stylistic/arrow-parens": "off",
  "@stylistic/brace-style": "off",
  "@stylistic/space-before-function-paren": "off",
  "@stylistic/operator-linebreak": "off",
  "@stylistic/jsx-indent-props": "off",
}

export default [
  // ── 全域 ignore ──────────────────────────────────────────────────────────────
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "eslint.config.js"
    ],
  },

  // ── src + tests：純 TS 檔案 ───────────────────────────────────────────────────
  {
    files: ["src/**/*.ts", "tests/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@stylistic": stylisticPlugin
    },
    rules: sharedTsRules
  }
]
