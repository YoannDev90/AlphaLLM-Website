# Configuration des services externes

Ce guide explique comment configurer les différents services externes utilisés par le site AlphaLLM (Plausible Analytics, Search Console, etc.).

## � Plausible Analytics

### Configuration actuelle

Plausible Analytics est déjà configuré pour le domaine `alphallm.tech` avec les paramètres suivants :

- **Domaine** : `alphallm.tech`
- **Script** : Chargé automatiquement dans `index.html`
- **Configuration** : Privacy-friendly, pas de cookies
- **Événements** : Thème, langue, interactions utilisateur

### Changer de domaine

Si vous changez de domaine :

1. Allez sur [Plausible](https://plausible.io/)
2. Ajoutez votre nouveau domaine dans votre compte
3. Mettez à jour dans `index.html` :
```html
<script defer data-domain="votre-nouveau-domaine.com" src="https://plausible.io/js/script.js"></script>
```

4. Mettez à jour dans `seo-config.js` :
```javascript
plausible: {
  domain: 'votre-nouveau-domaine.com',
  // autres configurations...
}
```

### Avantages de Plausible
- **RGPD compliant** : Pas de cookies, données anonymisées
- **Léger** : Script de seulement 1KB
- **Respect vie privée** : Pas de suivi inter-sites
- **Open source** : Code auditable

## 🔍 Google Search Console

### 1. Ajouter le site

1. Allez sur [Google Search Console](https://search.google.com/search-console)
2. Cliquez sur "Ajouter une propriété"
3. Choisissez "URL prefix" et entrez : `https://alphallm.tech`
4. Cliquez sur "Continuer"

### 2. Vérifier la propriété

Choisissez la méthode de vérification HTML tag :

1. Copiez le code de vérification
2. Dans `index.html`, remplacez `YOUR_GOOGLE_SITE_VERIFICATION_CODE` :
```html
<meta name="google-site-verification" content="CODE_DE_VERIFICATION_ICI">
```

### 3. Soumettre le sitemap

1. Dans Search Console, allez dans "Sitemaps"
2. Entrez `sitemap.xml`
3. Cliquez sur "Soumettre"

## 🐦 Twitter (X) pour Twitter Cards

### 1. Créer un compte développeur Twitter

1. Allez sur [Twitter Developer](https://developer.twitter.com/)
2. Créez un compte développeur
3. Créez une application

### 2. Configurer les Twitter Cards

Dans `index.html`, mettez à jour :

```html
<meta name="twitter:site" content="@votre_compte_twitter">
<meta name="twitter:creator" content="@votre_compte_twitter">
```

## 📘 Bing Webmaster Tools

### 1. Ajouter le site

1. Allez sur [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Cliquez sur "Ajouter un site"
3. Entrez `https://alphallm.tech`

### 2. Vérifier la propriété

1. Choisissez "HTML Meta Tag"
2. Copiez le code de vérification
3. Dans `index.html`, remplacez `YOUR_BING_VERIFICATION_CODE` :
```html
<meta name="msvalidate.01" content="CODE_DE_VERIFICATION_BING">
```

### 3. Soumettre le sitemap

1. Dans Bing Webmaster, allez dans "Sitemaps"
2. Soumettez `https://alphallm.tech/sitemap.xml`

## 🔗 Discord pour les liens sociaux

### Mettre à jour les liens Discord

Dans `seo-config.js`, mettez à jour :

```javascript
socialLinks: {
  discord: 'https://discord.gg/VOTRE_CODE_INVITATION',
  // ...
}

## 🖼️ Images et médias sociaux

### Bannière Open Graph

La bannière SVG est déjà créée dans `assets/images/banner.svg`. Pour la personnaliser :

1. Modifiez le fichier SVG selon vos besoins
2. Assurez-vous que les dimensions restent 1200x630px
3. Testez avec [Open Graph Preview](https://www.opengraph.xyz/)

### Favicon et icônes

Les favicons sont dans `assets/images/`. Pour les régénérer :

1. Utilisez [Favicon Generator](https://favicon.io/favicon-generator/)
2. Remplacez les fichiers existants
3. Mettez à jour les références dans `index.html`

## 🧪 Tests de validation

### Valider les données structurées

Utilisez [Google's Rich Results Test](https://search.google.com/test/rich-results) :
1. Entrez l'URL de votre site
2. Vérifiez que tous les schémas sont valides

### Tester les métadonnées sociales

- **Facebook** : [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter** : [Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn** : [Post Inspector](https://www.linkedin.com/post-inspector/)

### Vérifier le SEO

Utilisez [Google PageSpeed Insights](https://pagespeed.web.dev/) pour vérifier :
- Performance
- SEO
- Accessibilité
- Bonnes pratiques

## 📈 Monitoring et maintenance

### Plausible Analytics
- Vérifiez régulièrement les rapports de performance
- Surveillez les Core Web Vitals
- Analysez le trafic et les conversions
- Respect de la vie privée des utilisateurs

### Google Search Console
- Vérifiez les erreurs d'indexation
- Surveillez les performances de recherche
- Soumettez de nouvelles pages au sitemap

### Mises à jour régulières
- Mettez à jour les dates dans `sitemap.xml`
- Vérifiez la validité des liens externes
- Testez les fonctionnalités après les mises à jour

## 🚨 Dépannage

### Analytics ne fonctionne pas
1. Vérifiez que le domaine est correct dans Plausible
2. Assurez-vous que le script est chargé dans index.html
3. Vérifiez la console du navigateur pour les erreurs

### Search Console ne valide pas
1. Vérifiez que la balise meta est bien placée dans `<head>`
2. Assurez-vous qu'il n'y a pas d'espaces supplémentaires
3. Attendez quelques minutes et réessayez

### Problèmes de Twitter Cards
1. Vérifiez que le compte Twitter existe
2. Assurez-vous que l'image fait moins de 5MB
3. Testez avec l'outil de validation Twitter

---

*Configuration terminée ? Testez tout avec les outils de validation ci-dessus !*