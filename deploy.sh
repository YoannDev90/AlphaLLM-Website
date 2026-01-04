#!/usr/bin/env bash

# Script de déploiement pour AlphaLLM Website
# Utilisation: ./deploy.sh [environment]
# Environment: production (défaut) ou staging

set -e

ENVIRONMENT=${1:-production}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 Déploiement AlphaLLM Website - Environment: $ENVIRONMENT"

# Vérifications pré-déploiement
echo "📋 Vérifications pré-déploiement..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Vérifier git
if ! command -v git &> /dev/null; then
    echo "❌ git n'est pas installé"
    exit 1
fi

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ package.json non trouvé. Êtes-vous dans le bon répertoire ?"
    exit 1
fi

# Vérifier l'état de git
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Le répertoire git n'est pas propre. Commitez vos changements d'abord."
    echo "Fichiers modifiés:"
    git status --porcelain
    exit 1
fi

echo "✅ Vérifications passées"

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci

# Linting
echo "🔍 Linting du code..."
npm run lint

# Tests
echo "🧪 Exécution des tests..."
npm run test

# Build
echo "🏗️  Build de production..."
npm run build

# Tests Lighthouse (si lhci installé)
if command -v lhci &> /dev/null; then
    echo "🏮 Tests Lighthouse..."
    npx lhci autorun --config=.lighthouserc.json
else
    echo "⚠️  Lighthouse CI non installé, tests de performance ignorés"
fi

# Déploiement selon l'environnement
case $ENVIRONMENT in
    production)
        echo "🌐 Déploiement en production..."

        # Vérifier la branche
        CURRENT_BRANCH=$(git branch --show-current)
        if [ "$CURRENT_BRANCH" != "main" ]; then
            echo "⚠️  Vous n'êtes pas sur la branche main. Continuation..."
        fi

        # Push vers GitHub (déclenche GitHub Actions)
        echo "📤 Push vers GitHub..."
        git push origin main

        echo "✅ Déploiement déclenché !"
        echo "🔗 Vérifiez le statut sur: https://github.com/YoannDev90/AlphaLLM-Website/actions"
        ;;

    staging)
        echo "🧪 Déploiement en staging..."

        # Créer une branche staging si elle n'existe pas
        if ! git show-ref --verify --quiet refs/heads/staging; then
            git checkout -b staging
        else
            git checkout staging
            git merge main
        fi

        # Build avec configuration staging
        echo "🏗️  Build staging..."
        npm run build

        # Push de la branche staging
        git add -f dist/
        git commit -m "chore: build staging $(date +%Y-%m-%d_%H-%M-%S)" || true
        git push origin staging

        echo "✅ Staging déployé sur la branche staging"
        ;;

    local)
        echo "🏠 Déploiement local..."

        # Démarrer le serveur local
        echo "🌐 Démarrage du serveur local sur http://localhost:8000"
        npm run dev
        ;;

    *)
        echo "❌ Environment inconnu: $ENVIRONMENT"
        echo "Environnements disponibles: production, staging, local"
        exit 1
        ;;
esac

echo ""
echo "🎉 Déploiement terminé avec succès !"
echo ""

# Instructions post-déploiement
case $ENVIRONMENT in
    production)
        echo "📋 Prochaines étapes:"
        echo "1. Vérifier le déploiement sur https://alphallm.tech"
        echo "2. Vérifier les métriques Lighthouse"
        echo "3. Tester les fonctionnalités principales"
        echo "4. Monitorer les erreurs via les outils de logging"
        ;;
    staging)
        echo "📋 Prochaines étapes:"
        echo "1. Tester l'application sur la branche staging"
        echo "2. Valider avec l'équipe QA"
        echo "3. Merger vers main quand prêt"
        ;;
    local)
        echo "📋 L'application est disponible sur http://localhost:8000"
        ;;
esac