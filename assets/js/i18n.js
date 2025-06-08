/**
 * Système i18n pour charger les traductions depuis des fichiers distincts
 */

// Attendre que le document soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  
  class I18nManager {
    constructor() {
      this.currentLanguage = 'fr'; // Langue par défaut
      this.translations = {};
      this.supportedLanguages = ['fr', 'en', 'de', 'es', 'pt', 'nl', 'it'];
      this.init();
    }

    async init() {
      try {
        // Détecter la langue du navigateur
        const browserLang = navigator.language.split('-')[0];
        
        // Vérifier si la langue du navigateur est supportée
        if (this.supportedLanguages.includes(browserLang)) {
          this.currentLanguage = browserLang;
        } else {
          this.currentLanguage = 'fr';
        }
        
        // Vérifier si une langue est stockée dans localStorage
        const storedLang = localStorage.getItem('language');
        
        if (storedLang && this.supportedLanguages.includes(storedLang)) {
          this.currentLanguage = storedLang;
        }
        
        // Charger les traductions pour la langue actuelle
        const loadSuccess = await this.loadTranslations(this.currentLanguage);
        
        // Appliquer les traductions à la page
        this.updatePageTranslations();
        
        // Initialiser les sélecteurs de langue
        this.initLanguageSelectors();
        
      } catch (error) {
        // Silencieux en production
      }
    }

    async loadTranslations(lang) {
      try {
        // Essayer d'abord avec un chemin relatif à partir de la racine
        const url = 'langs/' + lang + '.json';
        const response = await fetch(url);

        if (!response.ok) {
          // Essayer avec un autre chemin si le premier échoue
          const altResponse = await fetch('/langs/' + lang + '.json');
          
          if (!altResponse.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          
          this.translations = await altResponse.json();
        } else {
          this.translations = await response.json();
        }
        
        return true;
      } catch (error) {
        // Dernier essai avec un chemin relatif au document actuel
        try {
          const lastResponse = await fetch('../langs/' + lang + '.json');

          if (!lastResponse.ok) {
            throw new Error(`Erreur HTTP: ${lastResponse.status}`);
          }
          
          this.translations = await lastResponse.json();
          return true;
        } catch (lastError) {
          // Si la langue demandée n'est pas disponible, charger le français par défaut
          if (lang !== 'fr') {
            return this.loadTranslations('fr');
          }
          
          return false;
        }
      }
    }

    async changeLanguage(lang) {
      if (!this.supportedLanguages.includes(lang)) {
        return false;
      }
      
      try {
        const previousLang = this.currentLanguage;
        
        const success = await this.loadTranslations(lang);
        if (success) {
          this.currentLanguage = lang;
          localStorage.setItem('language', lang);
          
          // Mettre à jour l'attribut lang du document HTML
          document.documentElement.setAttribute('lang', lang);
          
          // Appliquer les traductions
          this.updatePageTranslations();
          
          // Mettre à jour les sélecteurs UI pour refléter la langue actuelle
          this.updateLanguageSelectors(lang);
          
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    }

    updatePageTranslations() {
      // Sélectionner tous les éléments avec l'attribut data-i18n
      const elements = document.querySelectorAll('[data-i18n]');
      
      let translatedCount = 0;
      let missingCount = 0;
      
      elements.forEach((element, index) => {
        const key = element.getAttribute('data-i18n');
        
        // Si la clé contient des points, il s'agit d'une clé imbriquée
        if (key.includes('.')) {
          const keyParts = key.split('.');
          let value = this.translations;
          
          // Naviguer dans l'objet de traduction
          for (const part of keyParts) {
            if (value && typeof value === 'object' && part in value) {
              value = value[part];
            } else {
              value = null;
              break;
            }
          }
          
          if (value !== null) {
            element.innerHTML = value;
            translatedCount++;
          } else {
            missingCount++;
          }
        } else if (this.translations[key]) {
          element.innerHTML = this.translations[key];
          translatedCount++;
        } else {
          missingCount++;
        }
        
        // Gérer les attributs comme placeholder, title, alt, etc.
        const attributes = element.getAttributeNames().filter(attr => attr.startsWith('data-i18n-attr-'));
        
        attributes.forEach(attr => {
          const attributeName = attr.replace('data-i18n-attr-', '');
          const translationKey = element.getAttribute(attr);
          
          if (this.translations[translationKey]) {
            element.setAttribute(attributeName, this.translations[translationKey]);
          }
        });
      });
    }
    
    updateLanguageSelectors(lang) {
      // Mettre à jour les sélecteurs UI pour refléter la langue actuelle
      const langSelectors = document.querySelectorAll('.language-selector');
      
      langSelectors.forEach((selector, index) => {
        if (selector.tagName === 'SELECT') {
          selector.value = lang;
        }
      });
      
      // Mettre à jour les boutons de langue
      const langButtons = document.querySelectorAll('[data-lang]');
      langButtons.forEach(button => {
        const buttonLang = button.getAttribute('data-lang');
        if (buttonLang === lang) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
      
      // Mise à jour du texte affiché dans le sélecteur de langue (si présent)
      const currentLangDisplay = document.querySelector('.current-lang');
      if (currentLangDisplay) {
        // Map des noms de langues
        const langNames = {
          'fr': 'Français',
          'en': 'English',
          'de': 'Deutsch',
          'es': 'Español',
          'pt': 'Português',
          'nl': 'Nederlands',
          'it': 'Italiano'
        };
        currentLangDisplay.textContent = langNames[lang] || langNames['fr'];
      }
    }

    initLanguageSelectors() {
      // Initialiser les sélecteurs de langue (dropdown, boutons, etc.)
      const langSelectors = document.querySelectorAll('.language-selector');
      
      langSelectors.forEach((selector, index) => {
        // S'assurer que la valeur actuelle est correctement définie
        if (selector.tagName === 'SELECT') {
          // Définir la valeur du select sur la langue actuelle
          selector.value = this.currentLanguage;
          
          // Ajouter l'écouteur d'événement
          selector.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            this.changeLanguage(selectedLang);
          });
        } else if (selector.hasAttribute('data-lang')) {
          // Pour les boutons avec data-lang
          const lang = selector.getAttribute('data-lang');
          
          // Ajouter la classe active au bouton de la langue actuelle
          if (lang === this.currentLanguage) {
            selector.classList.add('active');
          } else {
            selector.classList.remove('active');
          }
          
          // Ajouter l'écouteur d'événement
          selector.addEventListener('click', () => {
            this.changeLanguage(lang);
          });
        }
      });
      
      // Initialiser les boutons de changement de langue (pour la rétrocompatibilité)
      const langButtons = document.querySelectorAll('[data-lang]:not(.language-selector)');
      
      langButtons.forEach((button, index) => {
        const lang = button.getAttribute('data-lang');
        
        // Ajouter la classe active au bouton de la langue actuelle
        if (lang === this.currentLanguage) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
        
        // Ajouter l'écouteur d'événement
        button.addEventListener('click', () => {
          this.changeLanguage(lang);
        });
      });
    }
    
    // Méthode utilitaire pour obtenir une traduction par son code
    translate(key, defaultText = '') {
      // Vérifier si la clé contient des points (clé imbriquée)
      if (key.includes('.')) {
        const keyParts = key.split('.');
        let value = this.translations;
        
        // Naviguer dans l'objet de traduction
        for (const part of keyParts) {
          if (value && typeof value === 'object' && part in value) {
            value = value[part];
          } else {
            return defaultText;
          }
        }
        
        return value || defaultText;
      }
      
      // Clé simple
      return this.translations[key] || defaultText;
    }
  }
  
  // Initialiser l'instance i18n globale
  window.i18n = new I18nManager();
});