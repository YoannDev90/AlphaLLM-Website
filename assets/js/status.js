/**
 * Status.js - Script pour la page de statut du bot
 * Récupère les statuts et latences des bots via l'API
 */

// Configuration de l'API
const API_ENDPOINT = 'alphallm-api.onrender.com/status';

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    updateStatusTime();
    fetchAndUpdateBotsStatus();
    
    // Événement pour le bouton de rafraîchissement
    document.getElementById('refresh-status').addEventListener('click', function() {
        this.disabled = true;
        this.classList.add('refreshing');
        updateStatusTime();
        fetchAndUpdateBotsStatus();
    });
    
    // Événement pour le bouton de retour en haut
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

/**
 * Met à jour l'horodatage de la dernière mise à jour
 */
function updateStatusTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    const formattedDate = now.toLocaleDateString(document.documentElement.lang || 'fr-FR', options);
    document.getElementById('update-time').textContent = formattedDate;
}

/**
 * Récupère les données de statut depuis l'API avec un timeout de 5 secondes
 */
async function fetchStatusData() {
    try {
        // Créer une promesse de timeout de 5 secondes
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout: La requête a pris trop de temps')), 5000);
        });

        // Faire la requête avec le timeout
        const fetchPromise = fetch(`https://${API_ENDPOINT}`);
        
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data)
        return {
            status: 'success',
            timestamp: new Date().toISOString(),
            bots: data
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        
        // Gestion spécifique pour les erreurs de mixed content et timeout
        let errorMessage = error.message;
        if (error.message.includes('NetworkError') || error.message.includes('Mixed Content')) {
            errorMessage = 'Impossible de charger les données: problème de sécurité HTTPS/HTTP.';
        } else if (error.message.includes('Timeout')) {
            errorMessage = 'Délai d\'attente dépassé: les services semblent indisponibles.';
        }
        
        return {
            status: 'error',
            error: errorMessage,
            timestamp: new Date().toISOString(),
            bots: null
        };
    }
}

/**
 * Récupère et met à jour les statuts des bots depuis l'API
 */
async function fetchAndUpdateBotsStatus() {
    // Afficher un indicateur de chargement
    showLoadingIndicator();
    
    try {
        const result = await fetchStatusData();
        
        if (result.status === 'success' && result.bots) {
            updateBotsStatusFromAPI(result.bots);
            hideErrorMessage();
        } else {
            throw new Error(result.error || 'Erreur inconnue');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des statuts:', error);
        showErrorMessage(error.message);
        // En cas d'erreur, on peut garder les anciens statuts ou afficher des statuts d'erreur
        setAllBotsToError();
    } finally {
        hideLoadingIndicator();
    }
}

/**
 * Met à jour les statuts des bots avec les données de l'API
 */
function updateBotsStatusFromAPI(apiData) {
    const botItems = document.querySelectorAll('.bot-item');
    
    botItems.forEach(bot => {
        // Récupérer le nom du bot depuis l'élément h3 dans .bot-info
        const botNameElement = bot.querySelector('.bot-info h3');
        if (!botNameElement) return;
        
        const botName = botNameElement.textContent.trim();
        const botData = apiData[botName];
        
        let statusClass, statusI18nKey, latency;
        
        // Si aucune donnée n'est disponible pour ce bot, il est considéré comme offline
        if (!botData) {
            console.warn(`Aucune donnée disponible pour le bot: ${botName} - considéré comme offline`);
            statusClass = 'offline';
            statusI18nKey = 'status.offline';
            latency = '--';
        } else {
            // Déterminer le statut et la classe CSS
            switch (botData.status.toLowerCase()) {
                case 'online':
                    statusClass = 'online';
                    statusI18nKey = 'status.online';
                    break;
                case 'degraded':
                    statusClass = 'degraded';
                    statusI18nKey = 'status.degraded';
                    break;
                case 'offline':
                    statusClass = 'offline';
                    statusI18nKey = 'status.offline';
                    break;
                default:
                    statusClass = 'offline';
                    statusI18nKey = 'status.unknown';
            }
            
            // Formater la latence
            if (botData.ping === 0 || botData.status.toLowerCase() === 'offline') {
                latency = '--';
            } else {
                latency = Math.round(botData.ping);
            }
        }
        
        // Mettre à jour le statut du bot
        const statusDot = bot.querySelector('.status-dot');
        if (statusDot) {
            statusDot.className = 'status-dot ' + statusClass;
        }
        
        // Mettre à jour le texte de statut avec le système i18n
        const statusElement = bot.querySelector('.status');
        if (statusElement) {
            statusElement.className = 'status ' + statusClass;
            statusElement.setAttribute('data-i18n', statusI18nKey);
            
            // Utiliser le système i18n pour obtenir la traduction
            if (window.i18n && typeof window.i18n.translate === 'function') {
                const translatedText = window.i18n.translate(statusI18nKey);
                statusElement.textContent = translatedText;
            } else {
                // Fallback si i18n n'est pas encore chargé
                const fallbackTexts = {
                    'status.online': { fr: 'En ligne', en: 'Online', de: 'Online', es: 'En línea', pt: 'Online', nl: 'Online', it: 'Online' },
                    'status.offline': { fr: 'Hors ligne', en: 'Offline', de: 'Offline', es: 'Fuera de línea', pt: 'Offline', nl: 'Offline', it: 'Offline' },
                    'status.degraded': { fr: 'Dégradé', en: 'Degraded', de: 'Beeinträchtigt', es: 'Degradado', pt: 'Degradado', nl: 'Verslechterd', it: 'Degradato' },
                    'status.unknown': { fr: 'Inconnu', en: 'Unknown', de: 'Unbekannt', es: 'Desconocido', pt: 'Desconhecido', nl: 'Onbekend', it: 'Sconosciuto' }
                };
                const currentLang = document.documentElement.lang || 'fr';
                const fallbackText = fallbackTexts[statusI18nKey];
                statusElement.textContent = (fallbackText && fallbackText[currentLang]) || fallbackText?.fr || 'Unknown';
            }
        }
        
        // Mettre à jour la latence
        const pingElement = bot.querySelector('.ping');
        if (pingElement) {
            const pingIcon = pingElement.querySelector('i');
            pingElement.innerHTML = ''; // Effacer le contenu
            if (pingIcon) {
                pingElement.appendChild(pingIcon); // Remettre l'icône
            }
            pingElement.appendChild(document.createTextNode(' ' + (latency === '--' ? latency : latency + 'ms')));
        }
        
        // Application d'effets visuels pour la mise à jour
        bot.classList.add('updating');
        setTimeout(() => {
            bot.classList.remove('updating');
        }, 500);
    });
    
    // Mettre à jour la traduction après avoir changé les statuts
    if (window.i18n && typeof window.i18n.updatePageTranslations === 'function') {
        window.i18n.updatePageTranslations();
    }
}

// Ajouter une classe CSS pour l'effet de chargement
document.head.insertAdjacentHTML('beforeend', `
<style>
.refreshing {
    opacity: 0.6;
    cursor: not-allowed !important;
}

.refreshing::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 30%, rgba(var(--color-primary-rgb), 0.3) 50%, transparent 70%);
    animation: shimmer 1.5s infinite;
    border-radius: inherit;
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.updating {
    animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

/* Pour l'affichage d'erreurs et le chargement */
.error-message {
    background-color: rgba(231, 76, 60, 0.1);
    border-left: 4px solid #e74c3c;
    padding: 1rem;
    margin: 1rem 0;
    color: #e74c3c;
    border-radius: 4px;
}

.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(var(--color-primary-rgb), 0.1);
    border-left-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Indicateur de chargement pour le bouton refresh */
.refresh-loading {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.refresh-loading::after {
    content: '';
    width: 12px;
    height: 12px;
    border: 2px solid transparent;
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
</style>
`);

/**
 * Affiche un indicateur de chargement
 */
function showLoadingIndicator() {
    // Afficher le texte d'actualisation
    const refreshText = document.getElementById('refresh-status-text');
    if (refreshText) {
        refreshText.style.display = 'inline';
    }
    
    // Masquer l'horodatage pendant l'actualisation
    const updateTime = document.getElementById('update-time');
    if (updateTime) {
        updateTime.style.opacity = '0.5';
    }
}

/**
 * Cache l'indicateur de chargement
 */
function hideLoadingIndicator() {
    // Masquer le texte d'actualisation
    const refreshText = document.getElementById('refresh-status-text');
    if (refreshText) {
        refreshText.style.display = 'none';
    }
    
    // Restaurer l'opacité de l'horodatage
    const updateTime = document.getElementById('update-time');
    if (updateTime) {
        updateTime.style.opacity = '1';
    }
    
    // Réactiver le bouton de refresh
    const refreshButton = document.getElementById('refresh-status');
    if (refreshButton) {
        refreshButton.disabled = false;
        refreshButton.classList.remove('refreshing');
    }
}

/**
 * Affiche un message d'erreur
 */
function showErrorMessage(message) {
    let errorElement = document.getElementById('error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'error-message';
        errorElement.className = 'error-message';
        
        // Insérer le message d'erreur après l'indicateur de chargement ou le bouton
        const loadingIndicator = document.getElementById('loading-indicator');
        const refreshButton = document.getElementById('refresh-status');
        const insertAfter = loadingIndicator || refreshButton;
        
        if (insertAfter && insertAfter.parentNode) {
            insertAfter.parentNode.insertBefore(errorElement, insertAfter.nextSibling);
        }
    }
    
    // Utiliser le système i18n pour le message d'erreur
    let errorText;
    if (window.i18n && typeof window.i18n.translate === 'function') {
        const errorPrefix = window.i18n.translate('status.error.loadingFailed');
        errorText = `${errorPrefix}: ${message}`;
    } else {
        // Fallback avec traductions intégrées
        const currentLang = document.documentElement.lang || 'fr';
        const errorPrefixFallback = {
            fr: 'Erreur lors du chargement des statuts',
            en: 'Error loading bot statuses',
            de: 'Fehler beim Laden der Bot-Status',
            es: 'Error cargando estados de bots',
            pt: 'Erro ao carregar status dos bots',
            nl: 'Fout bij laden bot statussen',
            it: 'Errore caricamento stati bot'
        };
        const prefix = errorPrefixFallback[currentLang] || errorPrefixFallback.fr;
        errorText = `${prefix}: ${message}`;
    }
    
    errorElement.textContent = errorText;
    errorElement.style.display = 'block';
}

/**
 * Cache le message d'erreur
 */
function hideErrorMessage() {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Met tous les bots en état offline en cas de problème avec l'API
 */
function setAllBotsToError() {
    const botItems = document.querySelectorAll('.bot-item');
    
    botItems.forEach(bot => {
        const statusDot = bot.querySelector('.status-dot');
        if (statusDot) {
            statusDot.className = 'status-dot offline';
        }
        
        const statusElement = bot.querySelector('.status');
        if (statusElement) {
            statusElement.className = 'status offline';
            statusElement.setAttribute('data-i18n', 'status.offline');
            
            // Utiliser le système i18n pour obtenir la traduction
            if (window.i18n && typeof window.i18n.translate === 'function') {
                const translatedText = window.i18n.translate('status.offline');
                statusElement.textContent = translatedText;
            } else {
                // Fallback
                const currentLang = document.documentElement.lang || 'fr';
                const fallbackTexts = {
                    fr: 'Hors ligne',
                    en: 'Offline',
                    de: 'Offline',
                    es: 'Fuera de línea',
                    pt: 'Offline',
                    nl: 'Offline',
                    it: 'Offline'
                };
                statusElement.textContent = fallbackTexts[currentLang] || fallbackTexts.fr;
            }
        }
        
        const pingElement = bot.querySelector('.ping');
        if (pingElement) {
            const pingIcon = pingElement.querySelector('i');
            pingElement.innerHTML = '';
            if (pingIcon) {
                pingElement.appendChild(pingIcon);
            }
            pingElement.appendChild(document.createTextNode(' --'));
        }
    });
}

// Rafraîchissement automatique toutes les 60 secondes
setInterval(() => {
    fetchAndUpdateBotsStatus();
    updateStatusTime();
}, 60000);