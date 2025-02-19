import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        ignores: ["dist", "node_modules"],
    },
    {
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            parser: tsParser,
            globals: {
                ...Object.fromEntries(
                    Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
                ),
            },
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        },
    },
];
