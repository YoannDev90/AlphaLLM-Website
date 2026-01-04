/**
 * Configuration centralisée pour AlphaLLM Website
 * Toutes les constantes et URLs sont définies ici
 */

const CONFIG = {
  // URLs de l'API
  API: {
    BASE_URL: 'https://api.alphallm.tech',
    STATUS_ENDPOINT: '/status',
    RESOURCES_ENDPOINT: '/resources'
  },

  // URLs du site
  SITE: {
    BASE_URL: 'https://alphallm.tech',
    NAME: 'AlphaLLM',
    DESCRIPTION: 'Free Advanced AI Discord Bot: Chat, Images and Translation'
  },

  // Configuration i18n
  I18N: {
    SUPPORTED_LANGUAGES: ['fr', 'en'],
    DEFAULT_LANGUAGE: 'fr',
    COOKIE_NAME: 'user_language',
    COOKIE_DURATION: 365 * 10 // 10 ans
  },

  // Configuration PWA
  PWA: {
    NAME: 'AlphaLLM',
    SHORT_NAME: 'AlphaLLM',
    DESCRIPTION: 'AI Discord Bot Status & Information',
    THEME_COLOR: '#6366f1',
    BACKGROUND_COLOR: '#0f0f0f'
  },

  // Configuration des graphiques
  CHARTS: {
    REALTIME_UPDATE_INTERVAL: 30000, // 30 secondes
    DAILY_UPDATE_INTERVAL: 300000, // 5 minutes
    MAX_DATA_POINTS: 50
  },

  // Configuration du cache
  CACHE: {
    VERSION: 'v1.0.0',
    MAX_AGE: 31536000 // 1 an en secondes
  },

  // URLs externes
  EXTERNAL: {
    DISCORD_INVITE: 'https://discord.com/oauth2/authorize?client_id=1286951908786962442',
    GITHUB_REPO: 'https://github.com/YoannDev90/AlphaLLM-Website',
    FONT_AWESOME: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    CHART_JS: 'https://cdn.jsdelivr.net/npm/chart.js'
  }
};

// Exports pour utilisation dans les modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

// Pour le navigateur global
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}