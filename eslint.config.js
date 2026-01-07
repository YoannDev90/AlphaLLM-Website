import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        confirm: 'readonly',
        Event: 'readonly',
        performance: 'readonly',
        EventSource: 'readonly',

        // Modern browser APIs
        MutationObserver: 'readonly',
        IntersectionObserver: 'readonly',
        PerformanceObserver: 'readonly',

        // Third-party libraries
        Chart: 'readonly',

        // Project globals
        CONFIG: 'readonly',
        config: 'readonly',
        errorTracker: 'readonly',

        // Service Worker globals
        self: 'readonly',
        caches: 'readonly',
        clients: 'readonly',

        // Node.js globals pour les scripts de build
        process: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        global: 'readonly'
      }
    },
    rules: {
      // Règles de base
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // Autoriser console.log pour le debugging
      'no-debugger': 'warn',

      // Bonnes pratiques
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',

      // Style
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // Performance
      'no-loop-func': 'warn',

      // Compatibilité navigateurs
      'compat/compat': 'off' // Désactivé car nous supportons les navigateurs modernes
    }
  }
];