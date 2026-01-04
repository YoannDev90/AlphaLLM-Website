# Guide de contribution

Bienvenue dans le projet AlphaLLM Website ! Nous sommes ravis que vous souhaitiez contribuer. Ce guide vous explique comment participer efficacement.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 16+ et npm
- Git
- Un éditeur de code (VS Code recommandé)

### Installation
```bash
# Cloner le repository
git clone https://github.com/YoannDev90/AlphaLLM-Website.git
cd AlphaLLM-Website

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Tests locaux
```bash
# Linting
npm run lint

# Tests automatisés
npm run test

# Build de production
npm run build
```

## 📝 Processus de contribution

### 1. Choisir une tâche
- Vérifier les [issues](https://github.com/YoannDev90/AlphaLLM-Website/issues) ouvertes
- Les issues labellisées `good first issue` sont idéales pour débuter
- Les issues `help wanted` recherchent activement des contributeurs

### 2. Créer une branche
```bash
# Créer et basculer sur une nouvelle branche
git checkout -b feature/ma-nouvelle-fonctionnalite

# Ou pour corriger un bug
git checkout -b fix/mon-correctif
```

### 3. Développement
- Suivre les [standards de code](#standards-de-code)
- Écrire des tests pour les nouvelles fonctionnalités
- Tester localement avant de pousser

### 4. Commit et Push
```bash
# Ajouter les fichiers modifiés
git add .

# Commit avec un message descriptif
git commit -m "feat: ajouter la fonctionnalité X

- Description détaillée des changements
- Impact sur les performances
- Tests ajoutés"

# Pousser la branche
git push origin feature/ma-nouvelle-fonctionnalite
```

### 5. Pull Request
- Créer une PR depuis votre branche vers `main`
- Remplir le template de PR
- Attendre la revue de code
- Corriger les retours si nécessaire

## 🎯 Standards de code

### JavaScript
- Utiliser ES6+ (const/let, arrow functions, etc.)
- Pas de `var`, préférer `const` et `let`
- Noms de variables/fonctions en camelCase
- Noms de classes en PascalCase
- Commentaires JSDoc pour les fonctions publiques

### CSS
- Utilisation de variables CSS pour les couleurs et dimensions
- Classes en kebab-case
- Commentaires pour séparer les sections
- Mobile-first responsive design

### HTML
- Utiliser la sémantique appropriée
- Attributs d'accessibilité (`aria-*`, `alt`, etc.)
- `data-i18n` pour l'internationalisation

### Git
- Messages de commit en anglais
- Format: `type: description` (feat, fix, docs, style, refactor, test, chore)
- Branches descriptives (`feature/`, `fix/`, `docs/`)

## 🧪 Tests

### Tests automatisés
Le projet inclut des tests pour :
- Fonctionnalités JavaScript (configuration, error tracking, etc.)
- Accessibilité (labels, navigation clavier)
- Performance (chargement, taille du bundle)
- PWA (service worker, manifest)

### Tests manuels
Avant de soumettre une PR :
- ✅ Responsive design sur mobile/tablette/desktop
- ✅ Navigation clavier complète
- ✅ Lecteurs d'écran compatibles
- ✅ Thème sombre/clair fonctionnel
- ✅ Internationalisation correcte
- ✅ Performance acceptable (Lighthouse ≥ 80)

## 🔧 Outils de développement

### Extensions VS Code recommandées
- ESLint
- Prettier
- Live Server
- GitLens
- Bracket Pair Colorizer

### Commandes utiles
```bash
# Analyse du bundle
npm run analyze

# Serveur de développement avec rechargement
npm run dev

# Linting automatique
npm run lint

# Build optimisé
npm run build
```

## 📚 Architecture

### Structure des fichiers
```
assets/
├── css/          # Styles CSS
├── js/           # JavaScript
└── images/       # Images et assets

langs/            # Fichiers d'internationalisation
*.html            # Pages HTML
```

### Patterns utilisés
- **Modules JavaScript** : Import/export ES6
- **Configuration centralisée** : `config.js`
- **Service Worker** : Cache et PWA
- **Error tracking** : Monitoring des erreurs
- **Lazy loading** : Performance des images

## 🚨 Signaler un bug

1. Vérifier qu'il n'existe pas déjà dans les [issues](https://github.com/YoannDev90/AlphaLLM-Website/issues)
2. Créer une nouvelle issue avec :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Environnement (navigateur, OS, etc.)
   - Screenshots si pertinent

## 💡 Proposer une fonctionnalité

1. Vérifier qu'elle n'existe pas déjà
2. Créer une issue avec le label `enhancement`
3. Décrire :
   - Le besoin utilisateur
   - Solution proposée
   - Bénéfices et impacts
   - Complexité estimée

## 📞 Support

- **Documentation** : Ce fichier et le README principal
- **Issues GitHub** : Pour bugs et demandes de fonctionnalités
- **Discord** : [Serveur AlphaLLM](https://discord.gg/QGvyrUgwdK) pour discussions générales

## 🙏 Code de conduite

- Respecter tous les contributeurs
- Être constructif dans les retours
- Maintenir un environnement inclusif
- Signaler tout comportement inapproprié

---

Merci de contribuer à AlphaLLM Website ! 🎉