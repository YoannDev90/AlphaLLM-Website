/**
 * Script de détection précoce de la langue pour éviter le flash de contenu en français
 * Ce script se charge avant le DOM pour définir immédiatement l'attribut lang
 */

(function() {
  'use strict';
  
  // Méthodes de gestion des cookies
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  function setCookie(name, value, days = 365 * 10) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
  
  // Langues supportées
  const supportedLanguages = ['fr', 'en'];
  
  // Détecter la langue
  let detectedLanguage = 'fr'; // Par défaut
  
  // 1. Vérifier les cookies en priorité
  const cookieLang = getCookie('user_language');
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    detectedLanguage = cookieLang;
  } else {
    // 2. Vérifier localStorage (migration)
    try {
      const storedLang = localStorage.getItem('language');
      if (storedLang && supportedLanguages.includes(storedLang)) {
        detectedLanguage = storedLang;
        // Migrer vers les cookies
        setCookie('user_language', storedLang);
        localStorage.removeItem('language');
      } else {
        // 3. Détecter la langue du navigateur
        const browserLang = navigator.language.split('-')[0];
        if (supportedLanguages.includes(browserLang)) {
          detectedLanguage = browserLang;
        }
      }
    } catch (e) {
      // Si localStorage n'est pas disponible, continuer avec la langue par défaut
    }
  }
  
  // Sauvegarder la langue détectée
  setCookie('user_language', detectedLanguage);
  
  // Définir immédiatement l'attribut lang du document
  document.documentElement.setAttribute('lang', detectedLanguage);
  
  // Stocker la langue détectée pour le système i18n principal
  window.earlyDetectedLanguage = detectedLanguage;
  
})();
