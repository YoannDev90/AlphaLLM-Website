/**
 * Status.js - Script pour la page de statut du bot
 * Récupère les statuts et latences des bots via l'API
 */

// Configuration de l'API
const API_ENDPOINT = 'https://alphallm-api.onrender.com/status';

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    updateStatusTime();
    fetchAndUpdateBotsStatus();
    
    // Événement pour le bouton de rafraîchissement
    document.getElementById('refresh-status').addEventListener('click', function() {
        this.classList.add('rotating');
        updateStatusTime();
        fetchAndUpdateBotsStatus();
        
        // Retirer la classe après l'animation
        setTimeout(() => {
            this.classList.remove('rotating');
        }, 1000);
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
 * Récupère les données de statut depuis l'API
 */
async function fetchStatusData() {
    try {
        const response = await fetch(`https://${API_ENDPOINT}`);
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
        
        // Gestion spécifique pour les erreurs de mixed content
        let errorMessage = error.message;
        if (error.message.includes('NetworkError') || error.message.includes('Mixed Content')) {
            errorMessage = 'Impossible de charger les données: problème de sécurité HTTPS/HTTP.';
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
        
        if (!botData) {
            console.warn(`Données non trouvées pour le bot: ${botName}`);
            return;
        }
        
        let statusClass, statusText, latency;
        
        // Déterminer le statut et la classe CSS
        switch (botData.status.toLowerCase()) {
            case 'online':
                statusClass = 'online';
                statusText = document.documentElement.lang === 'en' ? 'Online' : 'En ligne';
                break;
            case 'degraded':
                statusClass = 'degraded';
                statusText = document.documentElement.lang === 'en' ? 'Degraded' : 'Dégradé';
                break;
            case 'offline':
                statusClass = 'offline';
                statusText = document.documentElement.lang === 'en' ? 'Offline' : 'Hors ligne';
                break;
            default:
                statusClass = 'offline';
                statusText = document.documentElement.lang === 'en' ? 'Unknown' : 'Inconnu';
        }
        
        // Formater la latence
        if (botData.ping === 0 || botData.status.toLowerCase() === 'offline') {
            latency = '--';
        } else {
            latency = Math.round(botData.ping);
        }
        
        // Mettre à jour le statut du bot
        const statusDot = bot.querySelector('.status-dot');
        if (statusDot) {
            statusDot.className = 'status-dot ' + statusClass;
        }
        
        // Mettre à jour le texte de statut
        const statusElement = bot.querySelector('.status');
        if (statusElement) {
            statusElement.className = 'status ' + statusClass;
            statusElement.textContent = statusText;
            
            // Mise à jour des attributs i18n si nécessaire
            if (statusClass === 'online') {
                statusElement.setAttribute('data-i18n', 'status.online');
            } else if (statusClass === 'degraded') {
                statusElement.setAttribute('data-i18n', 'status.degraded');
            } else {
                statusElement.setAttribute('data-i18n', 'status.offline');
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
    if (typeof updateTranslations === 'function') {
        updateTranslations();
    }
}

// Ajouter une classe CSS pour l'animation de rotation
document.head.insertAdjacentHTML('beforeend', `
<style>
.rotating {
    animation: rotate 1s linear;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
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
</style>
`);

/**
 * Affiche un indicateur de chargement
 */
function showLoadingIndicator() {
    let loadingIndicator = document.getElementById('loading-indicator');
    if (!loadingIndicator) {
        loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loading-indicator';
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = '<div class="loading-spinner"></div>';
        
        // Insérer l'indicateur après le bouton de rafraîchissement
        const refreshButton = document.getElementById('refresh-status');
        if (refreshButton && refreshButton.parentNode) {
            refreshButton.parentNode.insertBefore(loadingIndicator, refreshButton.nextSibling);
        }
    }
    loadingIndicator.style.display = 'flex';
}

/**
 * Cache l'indicateur de chargement
 */
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
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
    
    const currentLang = document.documentElement.lang || 'fr';
    const errorText = currentLang === 'en' 
        ? `Error loading bot statuses: ${message}` 
        : `Erreur lors du chargement des statuts: ${message}`;
    
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
 * Met tous les bots en état d'erreur en cas de problème avec l'API
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
            const errorText = document.documentElement.lang === 'en' ? 'Error' : 'Erreur';
            statusElement.className = 'status offline';
            statusElement.textContent = errorText;
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