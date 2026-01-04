/**
 * Error Tracking pour AlphaLLM Website
 * Capture et rapporte les erreurs JavaScript
 */

class ErrorTracker {
  constructor() {
    this.errors = [];
    this.maxErrors = 10;
    this.init();
  }

  init() {
    // Capture des erreurs JavaScript non gérées
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Capture des erreurs de promesse non gérées
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'unhandled_promise_rejection',
        message: event.reason?.message || event.reason,
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Capture des erreurs de performance
    if ('PerformanceObserver' in window) {
      try {
        // Erreurs de ressources (images, scripts qui ne chargent pas)
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.transferSize === 0 && entry.decodedBodySize === 0) {
              this.trackError({
                type: 'resource_load_error',
                message: `Failed to load resource: ${entry.name}`,
                resource: entry.name,
                timestamp: new Date().toISOString(),
                url: window.location.href
              });
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });

        // Grandes tâches de layout/paint (pour détecter les problèmes de performance)
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 100) { // Plus de 100ms
              this.trackError({
                type: 'long_task',
                message: `Long task detected: ${entry.duration}ms`,
                duration: entry.duration,
                timestamp: new Date().toISOString(),
                url: window.location.href
              });
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('PerformanceObserver not fully supported:', e);
      }
    }
  }

  trackError(error) {
    // Limiter le nombre d'erreurs stockées
    if (this.errors.length >= this.maxErrors) {
      this.errors.shift();
    }

    this.errors.push(error);
    console.error('[ErrorTracker]', error);

    // Envoi à un service de monitoring (optionnel)
    this.reportError(error);
  }

  reportError(_error) {
    // Ici vous pourriez envoyer les erreurs à un service comme Sentry, LogRocket, etc.
    // Pour l'instant, on les stocke seulement localement

    // Exemple d'envoi à une API (commenté)
    /*
    fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(error)
    }).catch(err => console.warn('Failed to report error:', err));
    */
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }

  // Méthode pour tracker manuellement des erreurs
  trackCustomError(message, extraData = {}) {
    this.trackError({
      type: 'custom_error',
      message,
      ...extraData,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  }
}

// Initialisation globale
const errorTracker = new ErrorTracker();

// Exports pour utilisation dans les modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ErrorTracker;
}

// Pour le navigateur global
if (typeof window !== 'undefined') {
  window.ErrorTracker = ErrorTracker;
  window.errorTracker = errorTracker;
}