/**
 * Status.js - Script pour la page de statut du bot
 * Génère des valeurs aléatoires pour la latence et le statut des bots
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    updateStatusTime();
    updateBotsStatus();
    
    // Événement pour le bouton de rafraîchissement
    document.getElementById('refresh-status').addEventListener('click', function() {
        this.classList.add('rotating');
        updateStatusTime();
        updateBotsStatus();
        
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
 * Met à jour les statuts et valeurs de latence de tous les bots
 */
function updateBotsStatus() {
    const botItems = document.querySelectorAll('.bot-item');
    
    botItems.forEach(bot => {
        // Définir des probabilités pour différents états
        // 80% en ligne, 15% dégradé, 5% hors ligne
        const statusRandom = Math.random() * 100;
        let statusClass, statusText, latency;
        
        if (statusRandom < 85) {
            // En ligne - latence entre 20ms et 60ms
            statusClass = 'online';
            statusText = document.documentElement.lang === 'en' ? 'Online' : 'En ligne';
            latency = Math.floor(Math.random() * 40) + 20;
        } else if (statusRandom < 95) {
            // Dégradé - latence entre 80ms et 180ms
            statusClass = 'degraded';
            statusText = document.documentElement.lang === 'en' ? 'Degraded' : 'Dégradé';
            latency = Math.floor(Math.random() * 100) + 80;
        } else {
            // Hors ligne
            statusClass = 'offline';
            statusText = document.documentElement.lang === 'en' ? 'Offline' : 'Hors ligne';
            latency = '--';
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
            pingElement.appendChild(pingIcon); // Remettre l'icône
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
 * Fonction pour simuler une requête API 
 * (À remplacer par une vraie API si disponible)
 */
async function fetchStatusData() {
    // Simulation d'un délai de réponse API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 'success',
                timestamp: new Date().toISOString(),
                bots: [
                    { name: 'AlphaLLM', status: 'online', latency: 32 },
                    { name: 'Logger', status: 'online', latency: 28 },
                    // Ajoutez d'autres bots si nécessaire
                ]
            });
        }, 800);
    });
}

// Rafraîchissement automatique toutes les 60 secondes
setInterval(() => {
    updateBotsStatus();
    updateStatusTime();
}, 60000);