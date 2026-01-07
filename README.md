# AlphaLLM Website

Site web officiel d'AlphaLLM, un bot Discord conversationnel multimodèle IA avec génération d'images.

## 📋 À propos du projet

AlphaLLM-Website est le site vitrine du bot Discord AlphaLLM. Le site propose :

- Une présentation des fonctionnalités du bot (chat IA, génération d'images)
- Une liste complète des modèles de texte et d'images supportés
- Une documentation d'utilisation complète
- Une page de statut en temps réel
- Un centre de support
- Les mentions légales et conditions d'utilisation

## 🚀 Technologies utilisées

- HTML5 / CSS3 / JavaScript (ES6+)
- **Build System**: Node.js, npm, Terser, CleanCSS
- **Testing**: Tests automatisés, ESLint, Lighthouse CI
- **CI/CD**: GitHub Actions avec déploiement automatique
- Animations CSS avancées
- Design responsive
- Thème sombre/clair dynamique
- Internationalisation (i18n) - Support de 2 langues (Français, Anglais)
- Compatibilité PWA (Progressive Web App)
- Lazy loading des images
- Service Worker pour le cache
- Monitoring d'erreurs JavaScript

## 🔧 Structure du projet

```text
AlphaLLM-Website/
├── assets/
│ ├── css/
│ │ ├── main.css
│ │ ├── index.css
│ │ ├── legals.css
│ │ ├── status.css
│ │ ├── styles.css
│ │ └── support.css
│ ├── js/
│ │ ├── early-i18n.js
│ │ ├── error-tracking.js
│ │ ├── i18n.js
│ │ ├── main.js
│ │ └── status.js
│ └── images/
│ ├── models/
│ ├── site.webmanifest
│ ├── logo.webp
│ └── favicon.ico
├── langs/
│ ├── en.json
│ └── fr.json
├── index.html
├── download.html
├── status.html
├── support.html
├── legals.html
├── 404.html
├── github-link.html
├── invite-link.html
├── robots.txt
├── sitemap.xml
├── CNAME
├── ERROR_TRACKING.md
├── build.js
├── package.json
├── .eslintrc.js
└── README.md
```

## 🚀 Déploiement

### GitHub Pages (Automatisé)
Le déploiement est entièrement automatisé via GitHub Actions :
1. **Tests automatisés** : Linting, tests unitaires, tests d'intégration
2. **Audit de performance** : Lighthouse CI avec seuils de qualité
3. **Build optimisé** : Minification et compression automatique
4. **Déploiement** : Publication automatique sur alphallm.tech

### Déploiement manuel
```bash
# Build pour la production
npm run build

# Test localement
npm run dev

# Pousser sur main pour déclencher le déploiement
git add .
git commit -m "New features"
git push origin main
```

### Métriques de qualité
- **Performance** : Score Lighthouse ≥ 80
- **Accessibilité** : Score Lighthouse ≥ 90  
- **Bonnes pratiques** : Score Lighthouse ≥ 90
- **SEO** : Score Lighthouse ≥ 90
- **PWA** : Score Lighthouse ≥ 80

### Variables d'environnement
Le site utilise les endpoints suivants (configurables dans `config.js`) :
- API Status: `https://alphallm-api.onrender.com/status`
- API Resources: `https://alphallm-api.onrender.com/resources`

## 📊 Fonctionnalités

- **Page de statut temps réel** avec graphiques Chart.js
- **Internationalisation** complète (FR/EN)
- **Thème sombre/clair** avec toggle automatique
- **Design responsive** optimisé pour mobile
- **PWA** avec service worker et manifest
- **SEO optimisé** avec meta tags et sitemap
- **Performance** avec compression et cache
- **Lazy loading** des images pour des chargements plus rapides
- **Monitoring d'erreurs** JavaScript automatique
- **Build system** automatisé avec minification
- **Tests automatisés** pour la qualité du code
- **Accessibilité** WCAG 2.1 AA compliant

## 🔧 Scripts disponibles

```bash
# Installation des dépendances
npm install

# Build de production (minification, optimisation)
npm run build

# Serveur de développement local
npm run dev

# Linting du code JavaScript
npm run lint

# Tests automatisés
npm run test

# Analyse de la taille du bundle
npm run analyze

# Nettoyage du dossier dist
npm run clean
```

## 🏗️ Architecture technique

### Build System
- **Minification** automatique des JS/CSS avec Terser et CleanCSS
- **Optimisation** des assets pour la production
- **Rapports** de build détaillés
- **ESLint** pour la qualité du code

### Performance
- **Lazy loading** des images avec IntersectionObserver
- **Service Worker** pour le cache hors ligne
- **Compression** Gzip/Brotli recommandée
- **Code splitting** et optimisation du bundle

### Tests
- **Tests unitaires** automatisés
- **Tests d'intégration** pour les fonctionnalités principales
- **Tests d'accessibilité** intégrés
- **Rapports de couverture** (à implémenter)

## 🤝 Contribution

Nous accueillons les contributions ! Voir le [guide de contribution](CONTRIBUTING.md) pour :

- **Démarrage** : Installation et configuration
- **Standards de code** : Conventions JavaScript, CSS, HTML
- **Processus** : Branches, commits, pull requests
- **Tests** : Automatisés et manuels
- **Outils** : Extensions VS Code, commandes utiles

### Signaler un bug
[Créer une issue](https://github.com/YoannDev90/AlphaLLM-Website/issues/new?template=bug_report.md)

### Proposer une fonctionnalité
[Créer une issue](https://github.com/YoannDev90/AlphaLLM-Website/issues/new?template=feature_request.md)

## 🔍 SEO

Le site inclut une optimisation SEO complète :

### Optimisations SEO
- **Métadonnées complètes** : Open Graph, Twitter Cards, Schema.org
- **Données structurées** : FAQ, HowTo, Organization, SoftwareApplication
- **Sitemap avancé** : Images, langues, priorités
- **Robots.txt optimisé** : Règles spécifiques par bot
- **URLs canoniques** : Évite le duplicate content
- **Multilingue** : Support FR/EN avec hreflang

### Configuration des services externes
Voir le [guide de configuration](EXTERNAL_SERVICES_SETUP.md) pour :
- Google Search Console
- Twitter Cards
- Bing Webmaster Tools
- Validation et tests
