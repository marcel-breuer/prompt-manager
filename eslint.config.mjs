import eslintJs from "@eslint/js";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  eslintRecommended: eslintJs.configs.recommended,
});

const eslintConfig = [
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
    // Removed "plugin:@next/next/recommended",
    // Removed "plugin:@next/next/core-web-vitals"
  ),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
      "@typescript-eslint": typescriptPlugin,
    },
    settings: {
      react: {
        version: "19.2.4", // Explicitly set React version
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      // Manually added Next.js specific rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    files: ["next-sitemap.config.js", "scripts/migrate.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "no-undef": "off", // Allow undefined globals for CommonJS environment
      "no-unused-vars": "warn", // Warn for unused vars in these scripts
      "@typescript-eslint/no-require-imports": "off", // Allow require() in CommonJS scripts
    }
  }
];

export default eslintConfig;
