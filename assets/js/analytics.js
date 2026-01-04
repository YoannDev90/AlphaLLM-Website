/**
 * Analytics Privacy-Friendly pour AlphaLLM Website
 * Intégration Plausible Analytics uniquement
 */

class PrivacyAnalytics {
  constructor() {
    this.initialized = false;
    this.userId = this.generateUserId();
    this.sessionId = this.generateSessionId();
    this.init();
  }

  init() {
    if (this.initialized) {return;}

    // Attendre que Plausible soit disponible
    this.waitForPlausible().then(() => {
      this.setupCustomEvents();
      this.trackInitialLoad();
      this.trackThemeChanges();
      this.trackUserInteractions();
      this.trackPerformanceMetrics();
      this.trackErrorEvents();
      this.initialized = true;
    });
  }

  waitForPlausible() {
    return new Promise((resolve) => {
      const checkPlausible = () => {
        if (typeof plausible !== 'undefined') {
          resolve();
        } else {
          setTimeout(checkPlausible, 100);
        }
      };
      checkPlausible();
    });
  }

  generateUserId() {
    // Plausible ne tracke pas les utilisateurs individuellement par défaut
    // On génère un ID anonyme seulement pour les métriques internes
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  setupCustomEvents() {
    // Plausible supporte les événements personnalisés
    // Les événements sont automatiquement trackés par Plausible
  }

  trackInitialLoad() {
    // Plausible tracke automatiquement les pageviews
    // On peut ajouter des propriétés personnalisées si nécessaire
    if (typeof plausible !== 'undefined') {
      plausible('pageview', {
        props: {
          theme: this.getCurrentTheme(),
          language: this.getCurrentLanguage(),
          device: this.getDeviceCategory()
        }
      });
    }
  }

  trackThemeChanges() {
    // Écouter les changements de thème
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          this.trackCustomEvent('theme_change', {
            theme: newTheme,
            previous_theme: mutation.oldValue
          });
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['data-theme']
    });
  }

  trackUserInteractions() {
    // Track des clics sur les boutons importants
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-track]');
      if (target) {
        const trackData = target.getAttribute('data-track');
        this.trackCustomEvent('button_click', {
          button_name: trackData,
          page: window.location.pathname
        });
      }

      // Track des liens externes
      if (e.target.closest('a[href^="http"]')) {
        const link = e.target.closest('a');
        if (!link.href.includes(window.location.hostname)) {
          this.trackCustomEvent('external_link_click', {
            link_url: link.href,
            link_text: link.textContent.trim()
          });
        }
      }
    });

    // Track du temps passé sur la page (toutes les 30 secondes)
    let startTime = Date.now();
    let interactionCount = 0;

    const trackInteractions = () => {
      interactionCount++;
    };

    document.addEventListener('click', trackInteractions);
    document.addEventListener('scroll', trackInteractions);
    document.addEventListener('keydown', trackInteractions);

    // Envoyer le temps passé toutes les 30 secondes
    setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      this.trackCustomEvent('time_engagement', {
        time_spent: timeSpent,
        interactions: interactionCount,
        page: window.location.pathname
      });
    }, 30000);

    // Track avant de quitter la page
    window.addEventListener('beforeunload', () => {
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      this.trackCustomEvent('page_exit', {
        total_time: totalTime,
        final_interactions: interactionCount
      });
    });
  }

  trackPerformanceMetrics() {
    // Track des métriques de performance (simplifiées pour privacy)
    if ('PerformanceObserver' in window) {
      try {
        // Track du Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.trackCustomEvent('web_vitals_lcp', {
            value: Math.round(lastEntry.startTime),
            rating: this.getWebVitalRating('LCP', lastEntry.startTime)
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Track du First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.trackCustomEvent('web_vitals_fid', {
              value: Math.round(entry.processingStart - entry.startTime),
              rating: this.getWebVitalRating('FID', entry.processingStart - entry.startTime)
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Track du Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Envoyer CLS après 5 secondes
        setTimeout(() => {
          this.trackCustomEvent('web_vitals_cls', {
            value: Math.round(clsValue * 1000) / 1000,
            rating: this.getWebVitalRating('CLS', clsValue)
          });
        }, 5000);

      } catch (error) {
        console.warn('Performance tracking not fully supported:', error);
      }
    }

    // Track des infos de device (anonymes)
    this.trackCustomEvent('device_info', {
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_pixel_ratio: window.devicePixelRatio,
      device_category: this.getDeviceCategory()
    });
  }

  trackErrorEvents() {
    // Intégration avec le système d'erreur tracking existant
    if (window.errorTracker) {
      const originalTrackError = window.errorTracker.trackError;
      window.errorTracker.trackError = (error) => {
        // Appeler la méthode originale
        originalTrackError.call(window.errorTracker, error);

        // Track dans Plausible
        this.trackCustomEvent('javascript_error', {
          type: error.type || 'unknown',
          message: error.message?.substring(0, 100),
          filename: error.filename,
          lineno: error.lineno,
          page: window.location.pathname
        });
      };
    }
  }

  // Méthodes utilitaires
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  getCurrentLanguage() {
    return localStorage.getItem('language') || 'fr';
  }

  getDeviceCategory() {
    const width = window.innerWidth;
    if (width < 768) {return 'mobile';}
    if (width < 1024) {return 'tablet';}
    return 'desktop';
  }

  getWebVitalRating(metric, value) {
    switch (metric) {
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    default:
      return 'unknown';
    }
  }

  // Méthode principale pour tracker des événements personnalisés
  trackCustomEvent(eventName, properties = {}) {
    if (typeof plausible !== 'undefined') {
      plausible(eventName, { props: properties });
    } else {
      // Fallback: stocker localement si Plausible n'est pas disponible
      console.log('Plausible event:', eventName, properties);
    }
  }

  // Méthode pour tracker les conversions (invitations bot, etc.)
  trackConversion(conversionType, value = null) {
    this.trackCustomEvent('conversion', {
      type: conversionType,
      value: value
    });
  }

  // Méthode pour obtenir des insights anonymes (si nécessaire)
  getAnonymousInsights() {
    return {
      theme: this.getCurrentTheme(),
      language: this.getCurrentLanguage(),
      device: this.getDeviceCategory(),
      sessionId: this.sessionId
      // Pas d'IP, pas de cookies, pas de fingerprinting
    };
  }
}

// Initialisation globale
const privacyAnalytics = new PrivacyAnalytics();

// Exports pour utilisation dans les modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PrivacyAnalytics;
}

// Pour le navigateur global
if (typeof window !== 'undefined') {
  window.PrivacyAnalytics = PrivacyAnalytics;
  window.privacyAnalytics = privacyAnalytics;
}