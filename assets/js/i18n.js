document.addEventListener('DOMContentLoaded', function() {
    // Default language
    let currentLang = localStorage.getItem('lang') || 'fr';
    
    // Language data - this would be loaded from JSON files in a real implementation
    const translations = {
        en: {
            "nav.home": "Home",
            "nav.docs": "Documentation",
            "nav.commands": "Commands",
            "nav.status": "Status",
            "nav.support": "Support",
            "hero.title": "AlphaLLM Bot",
            "hero.subtitle": "Advanced AI for your Discord server",
            "hero.invite": "Invite Bot",
            "hero.learn": "Learn More",
            "stats.servers": "Servers",
            "stats.users": "Users",
            "stats.uptime": "Uptime",
            "features.title": "Features",
            "features.ai.title": "Conversational AI",
            "features.ai.description": "Chat with an advanced AI capable of understanding context and generating relevant responses.",
            "features.image.title": "Image Generation",
            "features.image.description": "Create unique images from simple text descriptions.",
            "features.translate.title": "Translation",
            "features.translate.description": "Instantly translate messages into more than 50 languages.",
            "features.code.title": "Code Assistance",
            "features.code.description": "Get help with your code, generate functions, and debug your programs.",
            "cta.title": "Ready to enhance your Discord server?",
            "cta.description": "Invite AlphaLLM now and discover all its features.",
            "cta.invite": "Add to Discord",
            "footer.product": "Product",
            "footer.documentation": "Documentation",
            "footer.status": "Status",
            "footer.commands": "Commands",
            "footer.resources": "Resources",
            "footer.support": "Support",
            "footer.discord": "Discord Server",
            "footer.dashboard": "Dashboard",
            "footer.legal": "Legal",
            "footer.terms": "Terms of Service",
            "footer.privacy": "Privacy Policy",
            "footer.cookies": "Cookie Policy",
            "footer.rights": "All rights reserved.",
            "footer.madeWith": "Made with",
            "footer.by": "by"
        },
        fr: {
            "nav.home": "Accueil",
            "nav.docs": "Documentation",
            "nav.commands": "Commandes",
            "nav.status": "Statut",
            "nav.support": "Support",
            "hero.title": "AlphaLLM Bot",
            "hero.subtitle": "L'IA avancée pour votre serveur Discord",
            "hero.invite": "Inviter le bot",
            "hero.learn": "En savoir plus",
            "stats.servers": "Serveurs",
            "stats.users": "Utilisateurs",
            "stats.uptime": "Disponibilité",
            "features.title": "Fonctionnalités",
            "features.ai.title": "IA Conversationnelle",
            "features.ai.description": "Discutez avec une IA avancée capable de comprendre le contexte et de générer des réponses pertinentes.",
            "features.image.title": "Génération d'Images",
            "features.image.description": "Créez des images uniques à partir de simples descriptions textuelles.",
            "features.translate.title": "Traduction",
            "features.translate.description": "Traduisez instantanément des messages dans plus de 50 langues.",
            "features.code.title": "Assistance Code",
            "features.code.description": "Obtenez de l'aide pour votre code, générez des fonctions et débogez vos programmes.",
            "cta.title": "Prêt à améliorer votre serveur Discord ?",
            "cta.description": "Invitez AlphaLLM dès maintenant et découvrez toutes ses fonctionnalités.",
            "cta.invite": "Ajouter à Discord",
            "footer.product": "Produit",
            "footer.documentation": "Documentation",
            "footer.status": "Statut",
            "footer.commands": "Commandes",
            "footer.resources": "Ressources",
            "footer.support": "Support",
            "footer.discord": "Serveur Discord",
            "footer.dashboard": "Tableau de bord",
            "footer.legal": "Juridique",
            "footer.terms": "Conditions d'utilisation",
            "footer.privacy": "Politique de confidentialité",
            "footer.cookies": "Politique de cookies",
            "footer.rights": "Tous droits réservés.",
            "footer.madeWith": "Fait avec",
            "footer.by": "par"
        },
        de: {
            "nav.home": "Startseite",
            "nav.docs": "Dokumentation",
            "nav.commands": "Befehle",
            "nav.status": "Status",
            "nav.support": "Support",
            "hero.title": "AlphaLLM Bot",
            "hero.subtitle": "Fortgeschrittene KI für deinen Discord-Server",
            "hero.invite": "Bot einladen",
            "hero.learn": "Mehr erfahren",
            "stats.servers": "Server",
            "stats.users": "Benutzer",
            "stats.uptime": "Betriebszeit",
            "features.title": "Funktionen",
            "features.ai.title": "Konversations-KI",
            "features.ai.description": "Chatte mit einer fortschrittlichen KI, die Kontext versteht und relevante Antworten generiert.",
            "features.image.title": "Bilderzeugung",
            "features.image.description": "Erstelle einzigartige Bilder aus einfachen Textbeschreibungen.",
            "features.translate.title": "Übersetzung",
            "features.translate.description": "Übersetze Nachrichten sofort in mehr als 50 Sprachen.",
            "features.code.title": "Code-Unterstützung",
            "features.code.description": "Erhalte Hilfe bei deinem Code, generiere Funktionen und debugge deine Programme.",
            "cta.title": "Bereit, deinen Discord-Server zu verbessern?",
            "cta.description": "Lade AlphaLLM jetzt ein und entdecke alle Funktionen.",
            "cta.invite": "Zu Discord hinzufügen",
            "footer.product": "Produkt",
            "footer.documentation": "Dokumentation",
            "footer.status": "Status",
            "footer.commands": "Befehle",
            "footer.resources": "Ressourcen",
            "footer.support": "Support",
            "footer.discord": "Discord-Server",
            "footer.dashboard": "Dashboard",
            "footer.legal": "Rechtliches",
            "footer.terms": "Nutzungsbedingungen",
            "footer.privacy": "Datenschutzrichtlinie",
            "footer.cookies": "Cookie-Richtlinie",
            "footer.rights": "Alle Rechte vorbehalten.",
            "footer.madeWith": "Erstellt mit",
            "footer.by": "von"
        },
        es: {
            "nav.home": "Inicio",
            "nav.docs": "Documentación",
            "nav.commands": "Comandos",
            "nav.status": "Estado",
            "nav.support": "Soporte",
            "hero.title": "AlphaLLM Bot",
            "hero.subtitle": "IA avanzada para tu servidor de Discord",
            "hero.invite": "Invitar bot",
            "hero.learn": "Saber más",
            "stats.servers": "Servidores",
            "stats.users": "Usuarios",
            "stats.uptime": "Tiempo activo",
            "features.title": "Características",
            "features.ai.title": "IA Conversacional",
            "features.ai.description": "Chatea con una IA avanzada capaz de entender el contexto y generar respuestas relevantes.",
            "features.image.title": "Generación de imágenes",
            "features.image.description": "Crea imágenes únicas a partir de simples descripciones textuales.",
            "features.translate.title": "Traducción",
            "features.translate.description": "Traduce instantáneamente mensajes a más de 50 idiomas.",
            "features.code.title": "Asistencia de código",
            "features.code.description": "Obtén ayuda con tu código, genera funciones y depura tus programas.",
            "cta.title": "¿Listo para mejorar tu servidor de Discord?",
            "cta.description": "Invita a AlphaLLM ahora y descubre todas sus funciones.",
            "cta.invite": "Añadir a Discord",
            "footer.product": "Producto",
            "footer.documentation": "Documentación",
            "footer.status": "Estado",
            "footer.commands": "Comandos",
            "footer.resources": "Recursos",
            "footer.support": "Soporte",
            "footer.discord": "Servidor de Discord",
            "footer.dashboard": "Panel de control",
            "footer.legal": "Legal",
            "footer.terms": "Términos de servicio",
            "footer.privacy": "Política de privacidad",
            "footer.cookies": "Política de cookies",
            "footer.rights": "Todos los derechos reservados.",
            "footer.madeWith": "Hecho con",
            "footer.by": "por"
        }
    };
    
    // Apply translations on page load
    applyTranslations();
    
    // Update current language display
    updateCurrentLangDisplay();
    
    // Setup language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            localStorage.setItem('lang', lang);
            currentLang = lang;
            applyTranslations();
            updateCurrentLangDisplay();
        });
    });
    
    // Apply translations to the page
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.innerHTML = translations[currentLang][key];
            }
        });
    }
    
    // Update current language display in dropdown
    function updateCurrentLangDisplay() {
        const currentLangElement = document.querySelector('.current-lang');
        if (currentLangElement) {
            currentLangElement.textContent = currentLang.toUpperCase();
        }
    }
});