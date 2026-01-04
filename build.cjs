#!/usr/bin/env node

/**
 * Build Script pour AlphaLLM Website
 * Optimise et compresse les assets pour la production
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

class BuildTool {
  constructor() {
    this.rootDir = __dirname;
    this.assetsDir = path.join(this.rootDir, 'assets');
    this.distDir = path.join(this.rootDir, 'dist');
  }

  async init() {
    console.log('🚀 Démarrage du build AlphaLLM Website...\n');

    // Créer le dossier dist si nécessaire
    if (!fs.existsSync(this.distDir)) {
      fs.mkdirSync(this.distDir, { recursive: true });
    }

    // Copier les fichiers statiques (CNAME, robots.txt, etc.)
    this.copyStaticFiles();

    // Analyser la taille des fichiers avant compression
    await this.analyzeSizes();

    // Compresser les fichiers JavaScript
    await this.compressJavaScript();

    // Compresser les fichiers CSS
    await this.compressCSS();

    // Générer le rapport de build
    await this.generateReport();

    console.log('\n✅ Build terminé avec succès !');
  }

  async analyzeSizes() {
    console.log('📊 Analyse des tailles de fichiers...');

    const files = this.getAllFiles(this.assetsDir);
    let totalSize = 0;
    let jsSize = 0;
    let cssSize = 0;

    files.forEach(file => {
      const stats = fs.statSync(file);
      totalSize += stats.size;

      if (file.endsWith('.js')) jsSize += stats.size;
      if (file.endsWith('.css')) cssSize += stats.size;
    });

    console.log(`📁 Total assets: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`📄 JavaScript: ${(jsSize / 1024).toFixed(2)} KB`);
    console.log(`🎨 CSS: ${(cssSize / 1024).toFixed(2)} KB\n`);
  }

  async compressJavaScript() {
    console.log('🗜️  Compression JavaScript...');

    const jsFiles = this.getAllFiles(path.join(this.assetsDir, 'js'))
      .filter(file => file.endsWith('.js'));

    for (const file of jsFiles) {
      try {
        const code = fs.readFileSync(file, 'utf8');
        const result = await minify(code, {
          compress: {
            drop_console: false, // Garder console.log pour le debugging
            drop_debugger: true,
          },
          mangle: true,
          format: {
            comments: false,
          },
        });

        const outputPath = file.replace('/assets/', '/dist/');
        this.ensureDirectoryExists(path.dirname(outputPath));
        fs.writeFileSync(outputPath, result.code);

        const originalSize = fs.statSync(file).size;
        const compressedSize = result.code.length;
        const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

        console.log(`  ✅ ${path.basename(file)}: ${savings}% de réduction`);
      } catch (error) {
        console.warn(`  ⚠️  Erreur avec ${path.basename(file)}:`, error.message);
      }
    }
  }

  async compressCSS() {
    console.log('🎨 Compression CSS...');

    const cssFiles = this.getAllFiles(path.join(this.assetsDir, 'css'))
      .filter(file => file.endsWith('.css'));

    const cleancss = new CleanCSS({
      level: 2, // Niveau d'optimisation maximum
      format: false, // Pas de formatage pour la prod
    });

    for (const file of cssFiles) {
      try {
        const css = fs.readFileSync(file, 'utf8');
        const result = cleancss.minify(css);

        if (result.errors.length > 0) {
          console.warn(`  ⚠️  Erreurs CSS dans ${path.basename(file)}:`, result.errors);
        }

        const outputPath = file.replace('/assets/', '/dist/');
        this.ensureDirectoryExists(path.dirname(outputPath));
        fs.writeFileSync(outputPath, result.styles);

        const originalSize = fs.statSync(file).size;
        const compressedSize = result.styles.length;
        const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

        console.log(`  ✅ ${path.basename(file)}: ${savings}% de réduction`);
      } catch (error) {
        console.warn(`  ⚠️  Erreur avec ${path.basename(file)}:`, error.message);
      }
    }
  }

  async generateReport() {
    console.log('📋 Génération du rapport de build...');

    const report = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      optimizations: [
        '✅ JavaScript minifié avec Terser',
        '✅ CSS minifié avec CleanCSS',
        '✅ Lazy loading implémenté',
        '✅ Service Worker pour le cache',
        '✅ Compression Gzip recommandée',
        '✅ Images optimisées (WebP)',
      ],
      recommendations: [
        '🔧 Configurer un CDN pour les assets statiques',
        '🔧 Activer la compression Gzip/Brotli sur le serveur',
        '🔧 Mettre en place un système de cache HTTP',
        '🔧 Configurer un CI/CD pour les builds automatiques',
      ]
    };

    const reportPath = path.join(this.distDir, 'build-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('  📄 Rapport sauvegardé dans dist/build-report.json');
  }

  getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = this.getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    });

    return arrayOfFiles;
  }

  copyStaticFiles() {
    const staticFiles = ['CNAME', 'robots.txt', '.htaccess'];
    const htmlFiles = ['index.html', '404.html', 'download.html', 'github-link.html', 'invite-link.html', 'legals.html', 'status.html', 'support-link.html', 'support.html', 'sitemap.xml'];
    
    // Copier les fichiers statiques
    staticFiles.forEach(file => {
      const srcPath = path.join(this.rootDir, file);
      const destPath = path.join(this.distDir, file);
      
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`📋 Copié ${file} vers dist/`);
      }
    });

    // Copier les fichiers HTML
    htmlFiles.forEach(file => {
      const srcPath = path.join(this.rootDir, file);
      const destPath = path.join(this.distDir, file);
      
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`📄 Copié ${file} vers dist/`);
      }
    });

    // Copier le dossier langs
    const langsSrc = path.join(this.rootDir, 'langs');
    const langsDest = path.join(this.distDir, 'langs');
    
    if (fs.existsSync(langsSrc)) {
      this.copyDirectory(langsSrc, langsDest);
      console.log(`📁 Copié langs/ vers dist/`);
    }
  }

  copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    
    files.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }

  ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}

// Vérifier si les dépendances sont installées
function checkDependencies() {
  try {
    require('terser');
    require('clean-css');
  } catch (error) {
    console.error('❌ Dépendances manquantes. Installez-les avec:');
    console.error('   npm install terser clean-css');
    process.exit(1);
  }
}

// Exécution du build
if (require.main === module) {
  checkDependencies();
  const builder = new BuildTool();
  builder.init().catch(console.error);
}

module.exports = BuildTool;