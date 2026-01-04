module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Règles de base
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'off', // Autoriser console.log pour le debugging
    'no-debugger': 'warn',

    // Bonnes pratiques
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-multiple-empty-lines': ['error', { max: 2 }],

    // Style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],

    // Performance
    'no-loop-func': 'warn',

    // Accessibilité (si applicable)
    'no-alert': 'warn',
  },
  globals: {
    // Variables globales du navigateur
    'window': 'readonly',
    'document': 'readonly',
    'navigator': 'readonly',
    'console': 'readonly',
    'fetch': 'readonly',
    'IntersectionObserver': 'readonly',
    'PerformanceObserver': 'readonly',
    'localStorage': 'readonly',
    'sessionStorage': 'readonly',

    // APIs modernes
    'URL': 'readonly',
    'URLSearchParams': 'readonly',
    'FormData': 'readonly',
    'Headers': 'readonly',

    // Variables globales du projet
    'errorTracker': 'readonly',
    'config': 'readonly',
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.min.js',
  ],
};