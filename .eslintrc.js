const ERROR = "error"
const READONLY = "readonly"
const OFF = "off"

module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    babelOptions: {
      configFile: "babel.config.js",
    },
  },
  extends: [
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
    "prettier/babel",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["react", "jsx-a11y"],
  globals: {
    Atomics: READONLY,
    SharedArrayBuffer: READONLY,

    // framework
    Undernet: "writable",

    // tests
    should: READONLY,
    expect: READONLY,
    mount: READONLY,
    shallow: READONLY,
    chai: READONLY,
  },
  rules: {
    // errors
    "for-direction": ERROR,
    "getter-return": ERROR,
    "no-async-promise-executor": ERROR,
    "no-await-in-loop": ERROR,
    "no-compare-neg-zero": ERROR,
    "no-cond-assign": [ERROR, "always"],
    "no-constant-condition": [ERROR, { checkLoops: true }],
    "no-debugger": ERROR,
    "no-dupe-args": ERROR,
    "no-dupe-keys": ERROR,
    "no-duplicate-case": ERROR,
    "no-ex-assign": ERROR,
    "no-extra-boolean-cast": ERROR,
    "no-func-assign": ERROR,
    "no-inner-declarations": ERROR,
    "no-obj-calls": ERROR,
    "no-irregular-whitespace": ERROR,
    "no-misleading-character-class": ERROR,
    "no-sparse-arrays": ERROR,
    "no-prototype-builtins": ERROR,
    "no-unexpected-multiline": ERROR,
    "no-unreachable": ERROR,
    "no-unsafe-finally": ERROR,
    "no-unsafe-negation": ERROR,
    "valid-typeof": ERROR,
    "use-isnan": ERROR,
    "require-atomic-updates": ERROR,

    // best practices
    "accessor-pairs": ERROR,
    "array-callback-return": ERROR,
    "block-scoped-var": ERROR,
    "class-methods-use-this": OFF,
    complexity: OFF,
    "consistent-return": OFF,
    curly: OFF,
    "default-case": ERROR,
    "dot-location": OFF,
    "dot-notation": ERROR,
    eqeqeq: ERROR,
    "guard-for-in": ERROR,
    "max-classes-per-file": ERROR,
    "no-alert": OFF,
    "no-caller": ERROR,
    "no-case-declarations": ERROR,
    "no-div-regex": ERROR,
    "no-else-return": ERROR,
    "no-empty-function": OFF,
    "no-empty-pattern": ERROR,
    "no-eq-null": ERROR,
    "no-eval": ERROR,
    "no-extend-native": ERROR,
    "no-extra-bind": ERROR,
    "no-extra-label": OFF,
    "no-fallthrough": ERROR,
    "no-floating-decimal": ERROR,
    "no-global-assign": ERROR,
    "no-console": OFF,
  },
}
