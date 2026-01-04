/**
 * Tests automatisés pour AlphaLLM Website
 * Tests unitaires et d'intégration pour les fonctionnalités principales
 */

class TestRunner {
  constructor() {
    this.tests = [];
    this.results = { passed: 0, failed: 0, errors: [] };
  }

  // Enregistrer un test
  test(name, fn) {
    this.tests.push({ name, fn });
  }

  // Exécuter tous les tests
  async run() {
    console.log('🧪 Démarrage des tests AlphaLLM Website...\n');

    for (const test of this.tests) {
      try {
        await test.fn();
        console.log(`✅ ${test.name}`);
        this.results.passed++;
      } catch (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
        this.results.failed++;
        this.results.errors.push({ test: test.name, error: error.message });
      }
    }

    this.printSummary();
  }

  printSummary() {
    const total = this.results.passed + this.results.failed;
    const successRate = ((this.results.passed / total) * 100).toFixed(1);

    console.log('\n📊 Résumé des tests:');
    console.log(`   Total: ${total}`);
    console.log(`   Réussis: ${this.results.passed}`);
    console.log(`   Échoués: ${this.results.failed}`);
    console.log(`   Taux de succès: ${successRate}%`);

    if (this.results.errors.length > 0) {
      console.log('\n❌ Erreurs détaillées:');
      this.results.errors.forEach(error => {
        console.log(`   ${error.test}: ${error.error}`);
      });
    }

    console.log('\n' + (this.results.failed === 0 ? '🎉 Tous les tests sont passés !' : '⚠️  Certains tests ont échoué.'));
  }
}

// Tests pour les fonctionnalités principales
const runner = new TestRunner();

// Test de la configuration
runner.test('Configuration loading', () => {
  if (typeof config === 'undefined') {
    throw new Error('Configuration non chargée');
  }
  if (!config.api) {
    throw new Error('API endpoints manquants');
  }
  if (!config.pwa) {
    throw new Error('Configuration PWA manquante');
  }
});

// Test du système d'erreurs
runner.test('Error tracking system', () => {
  if (typeof errorTracker === 'undefined') {
    throw new Error('ErrorTracker non initialisé');
  }
  if (typeof errorTracker.trackError !== 'function') {
    throw new Error('Méthode trackError manquante');
  }
  if (typeof errorTracker.getErrors !== 'function') {
    throw new Error('Méthode getErrors manquante');
  }
});

// Test du Service Worker
runner.test('Service Worker registration', async () => {
  return new Promise((resolve, reject) => {
    if (!('serviceWorker' in navigator)) {
      reject(new Error('Service Worker non supporté'));
      return;
    }

    navigator.serviceWorker.getRegistrations().then(registrations => {
      if (registrations.length === 0) {
        reject(new Error('Aucun Service Worker enregistré'));
        return;
      }

      const sw = registrations.find(reg => reg.scope.includes('sw.js'));
      if (!sw) {
        reject(new Error('Service Worker sw.js non trouvé'));
        return;
      }

      resolve();
    }).catch(reject);
  });
});

// Test de l'accessibilité
runner.test('Accessibility features', () => {
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
      throw new Error(`Bouton sans label d'accessibilité: ${button.outerHTML}`);
    }
  }

  const links = document.querySelectorAll('a');
  for (const link of links) {
    if (!link.getAttribute('href')) {
      throw new Error(`Lien sans href: ${link.outerHTML}`);
    }
  }
});

// Test du lazy loading
runner.test('Lazy loading system', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length === 0) {
    console.warn('Aucune image avec lazy loading trouvée');
    return;
  }

  for (const img of lazyImages) {
    if (!img.getAttribute('data-src')) {
      throw new Error(`Image sans attribut data-src: ${img.outerHTML}`);
    }
  }
});

// Test de l'internationalisation
runner.test('Internationalization', () => {
  const i18nElements = document.querySelectorAll('[data-i18n]');
  if (i18nElements.length === 0) {
    throw new Error('Aucun élément i18n trouvé');
  }

  // Vérifier que les clés existent dans les fichiers de langue
  const lang = localStorage.getItem('language') || 'fr';
  if (!['fr', 'en'].includes(lang)) {
    throw new Error(`Langue non supportée: ${lang}`);
  }
});

// Test des performances
runner.test('Performance metrics', async () => {
  return new Promise((resolve, _reject) => {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver non supporté');
      resolve();
      return;
    }

    // Mesurer le temps de chargement
    const loadTime = performance.now();
    if (loadTime > 3000) { // Plus de 3 secondes
      console.warn(`Temps de chargement élevé: ${loadTime.toFixed(2)}ms`);
    }

    // Vérifier la taille du bundle (estimée)
    const resources = performance.getEntriesByType('resource');
    let totalSize = 0;
    resources.forEach(resource => {
      if (resource.transferSize) {
        totalSize += resource.transferSize;
      }
    });

    if (totalSize > 2 * 1024 * 1024) { // Plus de 2MB
      console.warn(`Taille totale élevée: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    }

    resolve();
  });
});

// Test du PWA
runner.test('PWA features', () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker non supporté (requis pour PWA)');
  }

  const manifest = document.querySelector('link[rel="manifest"]');
  if (!manifest) {
    throw new Error('Manifest PWA manquant');
  }

  // Vérifier les meta tags PWA
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (!themeColor) {
    console.warn('Meta theme-color manquant');
  }
});

// Test de la sécurité
runner.test('Security headers', () => {
  // Vérifier CSP (si présent)
  const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!csp) {
    console.warn('CSP non configuré');
  }

  // Vérifier les liens externes sécurisés
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  for (const link of externalLinks) {
    if (!link.href.startsWith('https://')) {
      console.warn(`Lien non HTTPS: ${link.href}`);
    }
  }
});

// Fonction utilitaire pour simuler des événements
function simulateEvent(element, eventName, options = {}) {
  const event = new Event(eventName, { bubbles: true, ...options });
  element.dispatchEvent(event);
}

// Test des interactions utilisateur
runner.test('User interactions', () => {
  // Test du menu mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    const initialState = mobileMenuBtn.getAttribute('aria-expanded');
    simulateEvent(mobileMenuBtn, 'click');
    const newState = mobileMenuBtn.getAttribute('aria-expanded');

    if (initialState === newState) {
      throw new Error('Le bouton du menu mobile ne change pas d\'état');
    }
  }

  // Test du bouton "retour en haut"
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    // Simuler un scroll
    window.scrollTo(0, 500);
    simulateEvent(window, 'scroll');

    if (!backToTopBtn.classList.contains('visible')) {
      console.warn('Le bouton "retour en haut" ne s\'affiche pas après scroll');
    }
  }
});

// Exécuter les tests quand le DOM est chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => runner.run(), 1000); // Attendre que tout soit initialisé
  });
} else {
  setTimeout(() => runner.run(), 1000);
}

// Exporter pour utilisation dans d'autres contextes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestRunner;
}

// Rendre disponible globalement pour les tests manuels
if (typeof window !== 'undefined') {
  window.TestRunner = TestRunner;
  window.testRunner = runner;
}