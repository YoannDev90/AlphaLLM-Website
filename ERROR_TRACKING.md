# Error Tracking System

## Vue d'ensemble

Le système de suivi d'erreurs JavaScript capture automatiquement les erreurs non gérées, les rejets de promesses non gérées, les erreurs de chargement de ressources et les tâches longues qui pourraient affecter les performances.

## Fonctionnalités

### Capture automatique
- **Erreurs JavaScript** : Capture toutes les erreurs non gérées avec stack trace
- **Promesses rejetées** : Capture les promesses rejetées non gérées
- **Erreurs de ressources** : Détecte les ressources qui ne se chargent pas (images, scripts, etc.)
- **Tâches longues** : Identifie les tâches de plus de 100ms qui pourraient bloquer l'interface

### Stockage local
- Stocke jusqu'à 10 erreurs récentes en mémoire
- Console logging pour le développement
- API prête pour l'intégration avec des services externes

## Utilisation

### Initialisation automatique
Le système s'initialise automatiquement lors du chargement de la page :

```javascript
// Le script error-tracking.js s'initialise automatiquement
// Une instance globale 'errorTracker' est disponible
```

### Tracking manuel d'erreurs
Vous pouvez tracker manuellement des erreurs personnalisées :

```javascript
// Erreur personnalisée
errorTracker.trackCustomError('User action failed', {
  action: 'invite_bot',
  userId: '12345'
});

// Erreur avec contexte supplémentaire
errorTracker.trackCustomError('API call failed', {
  endpoint: '/api/status',
  method: 'GET',
  responseStatus: 500
});
```

### Accès aux erreurs
```javascript
// Récupérer toutes les erreurs capturées
const errors = errorTracker.getErrors();
console.log('Captured errors:', errors);

// Vider le cache d'erreurs
errorTracker.clearErrors();
```

## Intégration avec des services externes

Le système est prêt pour l'intégration avec des services de monitoring comme :

- **Sentry** : Service de monitoring d'erreurs complet
- **LogRocket** : Monitoring avec session replay
- **Bugsnag** : Tracking d'erreurs avec alerting
- **Rollbar** : Monitoring d'erreurs en temps réel

### Exemple d'intégration avec Sentry

```javascript
// Dans error-tracking.js, modifier la méthode reportError
reportError(error) {
  // Envoi à Sentry
  if (window.Sentry) {
    window.Sentry.captureException(new Error(error.message), {
      extra: error
    });
  }

  // Ou envoi à une API personnalisée
  fetch('/api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(error)
  }).catch(err => console.warn('Failed to report error:', err));
}
```

## Données capturées

Chaque erreur contient :

```javascript
{
  type: 'javascript_error', // Type d'erreur
  message: 'Error message', // Message d'erreur
  filename: 'file.js', // Fichier source (pour les erreurs JS)
  lineno: 42, // Numéro de ligne
  colno: 15, // Numéro de colonne
  stack: '...', // Stack trace complet
  timestamp: '2024-01-01T12:00:00.000Z', // Timestamp ISO
  userAgent: 'Mozilla/5.0...', // User agent du navigateur
  url: 'https://alphallm.tech/page' // URL actuelle
}
```

## Configuration

### Limite d'erreurs
Par défaut, seules les 10 dernières erreurs sont conservées :

```javascript
// Modifier la limite (dans error-tracking.js)
this.maxErrors = 50; // Conserver 50 erreurs
```

### Seuils de performance
Les tâches longues sont détectées au-delà de 100ms :

```javascript
// Modifier le seuil (dans error-tracking.js)
if (entry.duration > 500) { // 500ms au lieu de 100ms
```

## Debugging

### Console logging
Toutes les erreurs sont automatiquement loggées dans la console :

```
[ErrorTracker] {
  type: 'javascript_error',
  message: 'Cannot read property of undefined',
  // ... autres propriétés
}
```

### Inspection en développement
```javascript
// Dans la console du navigateur
errorTracker.getErrors(); // Voir toutes les erreurs
errorTracker.clearErrors(); // Vider pour les tests
```

## Sécurité

- Aucune donnée sensible n'est collectée automatiquement
- Les stack traces sont utiles pour le debugging mais peuvent être filtrées
- Prêt pour la conformité RGPD (données anonymes)
- Pas d'envoi automatique à des services externes sans configuration explicite

## Performance

- Impact minimal sur les performances (< 1KB gzippé)
- Utilise les APIs natives du navigateur (PerformanceObserver, etc.)
- Capture passive - n'interfère pas avec le code existant
- Lazy loading des fonctionnalités non supportées