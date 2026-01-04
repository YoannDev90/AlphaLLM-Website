/**
 * Service Worker pour AlphaLLM Website
 * Cache des ressources statiques et gestion hors ligne
 */

const CACHE_NAME = CONFIG.CACHE.VERSION;
const STATIC_CACHE = 'static-' + CACHE_NAME;
const API_CACHE = 'api-' + CACHE_NAME;

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/status.html',
  '/download.html',
  '/support.html',
  '/legals.html',
  '/404.html',
  '/assets/css/main.css',
  '/assets/css/index.css',
  '/assets/css/status.css',
  '/assets/css/legals.css',
  '/assets/css/support.css',
  '/assets/js/config.js',
  '/assets/js/early-i18n.js',
  '/assets/js/main.js',
  '/assets/js/i18n.js',
  '/assets/js/status.js',
  '/assets/images/logo.webp',
  '/assets/images/favicon.ico',
  '/langs/fr.json',
  '/langs/en.json',
  '/robots.txt',
  '/sitemap.xml'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installation');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
            console.log('[SW] Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Stratégie Cache First pour les ressources statiques
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            // Cache la réponse pour les futures requêtes
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
        .catch(() => {
          // Fallback pour les ressources critiques
          if (request.url.includes('/index.html') || request.url === CONFIG.SITE.BASE_URL + '/') {
            return caches.match('/index.html');
          }
        })
    );
  }

  // Stratégie Network First pour l'API
  else if (url.origin === CONFIG.API.BASE_URL) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache les réponses API réussies
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(API_CACHE).then((cache) => {
              // Ajouter un timestamp pour l'expiration
              const responseWithTimestamp = new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: {
                  ...Object.fromEntries(responseClone.headers.entries()),
                  'sw-cache-timestamp': Date.now().toString()
                }
              });
              cache.put(request, responseWithTimestamp);
            });
          }
          return response;
        })
        .catch(() => {
          // Retourner les données cachées si l'API est indisponible
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              // Vérifier si les données ne sont pas trop vieilles (5 minutes max)
              const cacheTimestamp = cachedResponse.headers.get('sw-cache-timestamp');
              if (cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < 300000) {
                return cachedResponse;
              }
            }
            // Retourner une réponse d'erreur
            return new Response(JSON.stringify({
              error: 'Service indisponible',
              offline: true
            }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
  }

  // Pour les autres ressources, stratégie par défaut
  else {
    event.respondWith(
      fetch(request).catch(() => {
        // Page 404 pour les ressources non trouvées
        return caches.match('/404.html');
      })
    );
  }
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});