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
            "hero.title": "AlphaLLM",
            "hero.subtitle": "Advanced AI for your Discord server",
            "hero.invite": "Invite Bot",
            "hero.learn": "Learn More",
            "stats.servers": "Servers",
            "stats.users": "Users",
            "stats.uptime": "Uptime",
            "stats.messages": "Messages Processed",
            "stats.images": "Images Generated",
            "stats.free": "100% Free",
            "features.title": "Features",
            "features.ai.title": "Conversational AI",
            "features.ai.description": "Chat with an advanced AI capable of understanding context and generating relevant responses.",
            "features.image.title": "Image Generation",
            "features.image.description": "Create unique images from simple text descriptions.",
            "features.search.title": "Search",
            "features.search.description": "Quickly find information and answers with our integrated AI search engine.",
            "team.title": "Our Team",
            "team.Yoann": "Founder & Lead Developer",
            "team.Lucky": "Web Developer & UI/UX",
            "team.470M": "Moderator & Support",
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
            "footer.legal": "Legal",
            "footer.terms": "Terms of Service",
            "footer.privacy": "Privacy Policy",
            "footer.rights": "All rights reserved.",
            "footer.by": "by",
            "404.title": "404",
            "404.subtitle": "Oops! This page has vanished into the void...",
            "404.home": "Back to Home"
        },
        fr: {
            "nav.home": "Accueil",
            "nav.docs": "Documentation",
            "nav.status": "Statut",
            "nav.support": "Support",
            "hero.title": "AlphaLLM",
            "hero.subtitle": "L'IA avancée pour votre serveur Discord",
            "hero.invite": "Inviter le bot",
            "hero.learn": "En savoir plus",
            "stats.servers": "Serveurs",
            "stats.users": "Utilisateurs",
            "stats.uptime": "Disponibilité",
            "stats.messages": "Messages traités",
            "stats.images": "Images générées",
            "stats.free": "100% gratuit",
            "features.title": "Fonctionnalités",
            "features.ai.title": "IA Conversationnelle",
            "features.ai.description": "Discutez avec une IA avancée capable de comprendre le contexte et de générer des réponses pertinentes.",
            "features.image.title": "Génération d'Images",
            "features.image.description": "Créez des images uniques à partir de simples descriptions textuelles.",
            "features.search.title": "Recherche",
            "features.search.description": "Trouvez rapidement des informations et des réponses grâce à notre moteur de recherche IA intégré.",
            "team.title": "Notre Équipe",
            "team.Yoann": "Fondateur & Développeur Principal",
            "team.Lucky": "Développeur Web & UI/UX",
            "team.470M": "Modérateur & Support",
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
            "footer.legal": "Juridique",
            "footer.terms": "Conditions d'utilisation",
            "footer.privacy": "Politique de confidentialité",
            "footer.rights": "Tous droits réservés.",
            "404.title": "404",
            "404.subtitle": "Oups ! Cette page a disparu dans le vide...",
            "404.home": "Retour à l'accueil"
        },
        de: {
            "nav.home": "Startseite",
            "nav.docs": "Dokumentation",
            "nav.commands": "Befehle",
            "nav.status": "Status",
            "nav.support": "Support",
            "hero.title": "AlphaLLM",
            "hero.subtitle": "Fortgeschrittene KI für deinen Discord-Server",
            "hero.invite": "Bot einladen",
            "hero.learn": "Mehr erfahren",
            "stats.servers": "Server",
            "stats.users": "Benutzer",
            "stats.uptime": "Betriebszeit",
            "stats.messages": "Verarbeitete Nachrichten",
            "stats.images": "Generierte Bilder",
            "stats.free": "100% kostenlos",
            "features.title": "Funktionen",
            "features.ai.title": "Konversations-KI",
            "features.ai.description": "Chatte mit einer fortschrittlichen KI, die Kontext versteht und relevante Antworten generiert.",
            "features.image.title": "Bilderzeugung",
            "features.image.description": "Erstelle einzigartige Bilder aus einfachen Textbeschreibungen.",
            "features.search.title": "Suche",
            "features.search.description": "Finde schnell Informationen und Antworten mit unserer integrierten KI-Suchmaschine.",
            "team.title": "Unser Team",
            "team.Yoann": "Gründer & Hauptentwickler",
            "team.Lucky": "Webentwickler & UI/UX",
            "team.470M": "Moderator & Support",
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
            "footer.rights": "Alle Rechte vorbehalten.",
            "footer.by": "von",
            "404.title": "404",
            "404.subtitle": "Ups! Diese Seite ist im Nichts verschwunden...",
            "404.home": "Zurück zur Startseite"
        },
        es: {
            "nav.home": "Inicio",
            "nav.docs": "Documentación",
            "nav.commands": "Comandos",
            "nav.status": "Estado",
            "nav.support": "Soporte",
            "hero.title": "AlphaLLM",
            "hero.subtitle": "IA avanzada para tu servidor de Discord",
            "hero.invite": "Invitar bot",
            "hero.learn": "Saber más",
            "stats.servers": "Servidores",
            "stats.users": "Usuarios",
            "stats.uptime": "Tiempo activo",
            "stats.messages": "Mensajes procesados",
            "stats.images": "Imágenes generadas",
            "stats.free": "100% gratis",
            "features.title": "Características",
            "features.ai.title": "IA Conversacional",
            "features.ai.description": "Chatea con una IA avanzada capaz de entender el contexto y generar respuestas relevantes.",
            "features.image.title": "Generación de imágenes",
            "features.image.description": "Crea imágenes únicas a partir de simples descripciones textuales.",
            "features.search.title": "Búsqueda",
            "features.search.description": "Encuentra rápidamente información y respuestas con nuestro motor de búsqueda de IA integrado.",
            "team.title": "Nuestro Equipo",
            "team.Yoann": "Fundador y Desarrollador Principal",
            "team.Lucky": "Desarrollador Web y UI/UX",
            "team.470M": "Moderador y Soporte",
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
            "footer.legal": "Legal",
            "footer.terms": "Términos de servicio",
            "footer.privacy": "Política de privacidad",
            "footer.rights": "Todos los derechos reservados.",
            "footer.by": "por",
            "404.title": "404",
            "404.subtitle": "¡Ups! Esta página se ha desvanecido en el vacío...",
            "404.home": "Volver al inicio"
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