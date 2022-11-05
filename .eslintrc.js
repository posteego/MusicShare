// eslint-disable-next-line no-undef
module.exports = {
  "env": {
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended"
  ],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jest"
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ],
        "paths": [
          "src",
          "node_modules"
        ]
      }
    }
  },
  "rules": {
    "camelcase": "off",
    "func-names": "warn",
    "no-nested-ternary": "warn",
    "import/extensions": "off",
    "import/no-absolute-path": "off",
    "import/no-cycle": "warn",
    "import/no-extraneous-dependencies": [
      "off",
      {
        "packageDir": "./"
      }
    ],
    "import/no-unresolved": "error",
    "jest/no-unresolved": "error",
    "jest/consistent-test-it": [
      "error",
      {
        "fn": "test",
        "withinDescribe": "test"
      }
    ],
    "react/jsx-filename-extension": [1, { "extensions ": [".js", ".jsx"] }],
    "max-len": "warn",
    "no-extra-parens": ["error", "all", {
      "enforceForArrowConditionals": false,
      "ignoreJSX": "multi-line",
      "nestedBinaryExpressions": false
    }],
    "no-process-env": "warn",
    "no-undef": "warn",
    "no-underscore-dangle": ["warn", {
      "allow": ["_id", "_created", "_updated", "_creator"]
    }],
    "no-unused-vars": ["error", {
      "args": "after-used",
      "argsIgnorePattern": "^_",
      "ignoreRestSiblings": true,
      "vars": "all"
    }],
    "react/destructuring-assignment": "warn",
    "react/forbid-prop-types": "warn",
    "react/function-component-definition": [
      "warn",
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
    "react/jsx-one-expression-per-line": "off",
    "react/no-array-index-key": "warn",
    "react/prefer-stateless-function": "warn",
    "react/prop-types": "warn",
    "react/sort-comp": "warn",
    "react/no-unescaped-entities": "warn",
    "import/no-named-as-default": "off",
    "react/jsx-props-no-spreading": "off",
    "arrow-parens": [
      "error",
      "as-needed",
      {
        "requireForBlockBody": true
      }
    ],
    "react/jsx-fragments": "off"
  }
};
