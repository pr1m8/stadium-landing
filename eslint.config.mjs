import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    // Next.js specific rules
    plugins: {
      "@next/next": nextPlugin,
    },
    languageOptions: {
      globals: {
        React: "readonly",
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    // TypeScript configuration
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "prefer-const": "warn",
    },
  },
  {
    // Server-only override for lib/server/
    files: ["src/lib/server/**/*.{ts,tsx}"],
    languageOptions: {
      env: {
        node: true,
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    // External services override
    files: ["src/lib/external-services/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        console: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
  prettierConfig,
];
