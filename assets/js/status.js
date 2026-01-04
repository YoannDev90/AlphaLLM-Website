/**
 * Status.js - Script pour la page de statut du bot
 * Récupère les statuts des bots via l'API
 */

// Configuration de l'API
const API_ENDPOINT = CONFIG.API.BASE_URL + CONFIG.API.STATUS_ENDPOINT;
const RESOURCES_ENDPOINT = CONFIG.API.BASE_URL + CONFIG.API.RESOURCES_ENDPOINT;

// Variables pour les graphiques
let realtimeCpuRamChart;
let dailyCpuRamChart;

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
    
  // Désactiver et animer le bouton
  const refreshButton = document.getElementById('refresh-status');
  if (refreshButton) {
    refreshButton.disabled = true;
    refreshButton.classList.add('refreshing');
  }
}

/**
 * Affiche un indicateur de chargement pour les ressources
 */
function showResourcesLoadingIndicator() {
  // Afficher le texte d'actualisation
  const refreshText = document.getElementById('resources-refresh-status-text');
  if (refreshText) {
    refreshText.style.display = 'inline';
  }
    
  // Masquer l'horodatage pendant l'actualisation
  const updateTime = document.getElementById('resources-update-time');
  if (updateTime) {
    updateTime.style.opacity = '0.5';
  }
    
  // Désactiver et animer le bouton
  const refreshButton = document.getElementById('refresh-resources');
  if (refreshButton) {
    refreshButton.disabled = true;
    refreshButton.classList.add('refreshing');
  }
}

/**
 * Met à jour les graphiques des ressources
 */
function updateResourcesCharts(data) {
  console.log('Mise à jour des graphiques avec les données:', data);
    
  // Vérifier si les éléments canvas existent
  const realtimeCanvas = document.getElementById('realtime-cpu-ram-chart');
  const dailyCanvas = document.getElementById('daily-cpu-ram-chart');
    
  if (!realtimeCanvas || !dailyCanvas) {
    console.warn('Éléments canvas non trouvés, réessai dans 100ms');
    setTimeout(() => updateResourcesCharts(data), 100);
    return;
  }

  // Vérifier si Chart.js est disponible
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js n\'est pas encore chargé, réessai dans 100ms');
    setTimeout(() => updateResourcesCharts(data), 100);
    return;
  }

  // Préparer les données pour les graphiques
  const realtimeLabels = data.realtime.map(d => {
    const date = new Date(d.timestamp);
    return date.toLocaleTimeString(document.documentElement.lang || 'fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  });
  const realtimeCpu = data.realtime.map(d => d.cpu_percent);
  const realtimeRam = data.realtime.map(d => d.memory_percent);

  console.log('Données temps réel préparées:', { labels: realtimeLabels.length, cpu: realtimeCpu.length, ram: realtimeRam.length });

  const dailyLabels = data.daily.map(d => {
    const date = new Date(d.timestamp);
    return date.toLocaleTimeString(document.documentElement.lang || 'fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  });
  const dailyCpu = data.daily.map(d => d.cpu_percent);
  const dailyRam = data.daily.map(d => d.memory_percent);

  console.log('Données quotidiennes préparées:', { labels: dailyLabels.length, cpu: dailyCpu.length, ram: dailyRam.length });

  // Créer ou mettre à jour le graphique temps réel CPU + RAM
  const realtimeCtx = document.getElementById('realtime-cpu-ram-chart').getContext('2d');
  if (realtimeCpuRamChart) {
    console.log('Mise à jour du graphique temps réel existant');
    realtimeCpuRamChart.data.labels = realtimeLabels;
    realtimeCpuRamChart.data.datasets[0].data = realtimeCpu;
    realtimeCpuRamChart.data.datasets[1].data = realtimeRam;
    realtimeCpuRamChart.update();
  } else {
    console.log('Création du graphique temps réel');
    realtimeCpuRamChart = new Chart(realtimeCtx, {
      type: 'line',
      data: {
        labels: realtimeLabels,
        datasets: [{
          label: 'CPU %',
          data: realtimeCpu,
          borderColor: 'rgba(52, 152, 219, 1)',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
          yAxisID: 'y'
        }, {
          label: 'RAM %',
          data: realtimeRam,
          borderColor: 'rgba(155, 89, 182, 1)',
          backgroundColor: 'rgba(155, 89, 182, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
          yAxisID: 'y1'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  return `CPU: ${context.parsed.y.toFixed(1)}%`;
                } else {
                  return `RAM: ${context.parsed.y.toFixed(1)}%`;
                }
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Temps'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'CPU %'
            },
            beginAtZero: true,
            max: 100
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'RAM %'
            },
            beginAtZero: true,
            max: 100,
            grid: {
              drawOnChartArea: false
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }

  // Créer ou mettre à jour le graphique quotidien CPU + RAM
  const dailyCtx = document.getElementById('daily-cpu-ram-chart').getContext('2d');
  if (dailyCpuRamChart) {
    dailyCpuRamChart.data.labels = dailyLabels;
    dailyCpuRamChart.data.datasets[0].data = dailyCpu;
    dailyCpuRamChart.data.datasets[1].data = dailyRam;
    dailyCpuRamChart.update();
  } else {
    dailyCpuRamChart = new Chart(dailyCtx, {
      type: 'line',
      data: {
        labels: dailyLabels,
        datasets: [{
          label: 'CPU %',
          data: dailyCpu,
          borderColor: 'rgba(46, 204, 113, 1)',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
          yAxisID: 'y'
        }, {
          label: 'RAM %',
          data: dailyRam,
          borderColor: 'rgba(230, 126, 34, 1)',
          backgroundColor: 'rgba(230, 126, 34, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
          yAxisID: 'y1'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  return `CPU: ${context.parsed.y.toFixed(1)}%`;
                } else {
                  return `RAM: ${context.parsed.y.toFixed(1)}%`;
                }
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Heure'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'CPU %'
            },
            beginAtZero: true,
            max: 100
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'RAM %'
            },
            beginAtZero: true,
            max: 100,
            grid: {
              drawOnChartArea: false
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }
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
    const fetchPromise = fetch(`${API_ENDPOINT}`);
        
    const response = await Promise.race([fetchPromise, timeoutPromise]);
        
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        
    const data = await response.json();
    console.log(data);
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
      en: 'Error loading bot statuses'
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
          en: 'Offline'
        };
        statusElement.textContent = fallbackTexts[currentLang] || fallbackTexts.fr;
      }
    }
  });
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
 * Récupère les données de ressources depuis l'API
 */
async function fetchResourcesData() {
  try {
    // Créer une promesse de timeout de 5 secondes
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: La requête a pris trop de temps')), 5000);
    });

    // Faire la requête avec le timeout
    const fetchPromise = fetch(RESOURCES_ENDPOINT);
        
    const response = await Promise.race([fetchPromise, timeoutPromise]);
        
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        
    const data = await response.json();
    console.log('Resources data:', data);
    return {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: data
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données de ressources:', error);
        
    // Gestion spécifique pour les erreurs
    let errorMessage = error.message;
    if (error.message.includes('NetworkError') || error.message.includes('Mixed Content')) {
      errorMessage = 'Impossible de charger les données de ressources: problème de sécurité HTTPS/HTTP.';
    } else if (error.message.includes('Timeout')) {
      errorMessage = 'Délai d\'attente dépassé: les services semblent indisponibles.';
    }
        
    return {
      status: 'error',
      error: errorMessage,
      timestamp: new Date().toISOString(),
      data: null
    };
  }
}

/**
 * Récupère et met à jour les ressources système
 */
async function fetchAndUpdateResources() {
  // Afficher un indicateur de chargement
  showResourcesLoadingIndicator();
    
  try {
    const result = await fetchResourcesData();
        
    if (result.status === 'success' && result.data) {
      updateResourcesCharts(result.data);
      hideResourcesErrorMessage();
    } else {
      throw new Error(result.error || 'Erreur inconnue');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des ressources:', error);
    showResourcesErrorMessage(error.message);
  } finally {
    hideResourcesLoadingIndicator();
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
    if (!botNameElement) {return;}
        
    const botName = botNameElement.textContent.trim();
    const botData = apiData[botName];
        
    let statusClass, statusI18nKey;
        
    // Si aucune donnée n'est disponible pour ce bot, il est considéré comme offline
    if (!botData) {
      console.warn(`Aucune donnée disponible pour le bot: ${botName} - considéré comme offline`);
      statusClass = 'offline';
      statusI18nKey = 'status.offline';
    } else {
      // botData est maintenant toujours une chaîne représentant le statut
      const status = botData;
            
      // Déterminer le statut et la classe CSS
      switch (status.toLowerCase()) {
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
    }
        
    // Mettre à jour le statut du bot
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
          'status.online': { fr: 'En ligne', en: 'Online' },
          'status.offline': { fr: 'Hors ligne', en: 'Offline' },
          'status.degraded': { fr: 'Dégradé', en: 'Degraded' },
          'status.unknown': { fr: 'Inconnu', en: 'Unknown' }
        };
        const currentLang = document.documentElement.lang || 'fr';
        const fallbackText = fallbackTexts[statusI18nKey];
        statusElement.textContent = (fallbackText && fallbackText[currentLang]) || fallbackText?.fr || 'Unknown';
      }
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

/**
 * Cache l'indicateur de chargement pour les ressources
 */
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
 * Cache l'indicateur de chargement pour les ressources
 */
function hideResourcesLoadingIndicator() {
  // Masquer le texte d'actualisation
  const refreshText = document.getElementById('resources-refresh-status-text');
  if (refreshText) {
    refreshText.style.display = 'none';
  }
    
  // Restaurer l'opacité de l'horodatage
  const updateTime = document.getElementById('resources-update-time');
  if (updateTime) {
    updateTime.style.opacity = '1';
  }
    
  // Réactiver le bouton de refresh
  const refreshButton = document.getElementById('refresh-resources');
  if (refreshButton) {
    refreshButton.disabled = false;
    refreshButton.classList.remove('refreshing');
  }
}

/**
 * Affiche un message d'erreur pour les ressources
 */
function showResourcesErrorMessage(message) {
  let errorElement = document.getElementById('resources-error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = 'resources-error-message';
    errorElement.className = 'error-message';
        
    // Insérer le message d'erreur dans la section des ressources
    const resourcesSection = document.querySelector('.system-resources');
    if (resourcesSection) {
      const chartsContainer = resourcesSection.querySelector('.charts-container');
      if (chartsContainer) {
        chartsContainer.parentNode.insertBefore(errorElement, chartsContainer);
      }
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
      fr: 'Erreur lors du chargement des ressources',
      en: 'Error loading system resources'
    };
    const prefix = errorPrefixFallback[currentLang] || errorPrefixFallback.fr;
    errorText = `${prefix}: ${message}`;
  }
    
  errorElement.textContent = errorText;
  errorElement.style.display = 'block';
}

/**
 * Cache le message d'erreur pour les ressources
 */
function hideResourcesErrorMessage() {
  const errorElement = document.getElementById('resources-error-message');
  if (errorElement) {
    errorElement.style.display = 'none';
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
 * Met à jour l'horodatage de la dernière mise à jour
 */
function updateStatusTime() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  };
  const formattedDate = now.toLocaleDateString(document.documentElement.lang || 'fr-FR', options);
  document.getElementById('update-time').textContent = formattedDate;
}

/**
 * Met à jour l'horodatage de la dernière mise à jour des ressources
 */
function updateResourcesTime() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  };
  const formattedDate = now.toLocaleDateString(document.documentElement.lang || 'fr-FR', options);
  document.getElementById('resources-update-time').textContent = formattedDate;
}

// Rafraîchissement automatique toutes les 60 secondes
setInterval(() => {
  fetchAndUpdateBotsStatus();
  updateStatusTime();
}, 60000);

// Rafraîchissement automatique des ressources toutes les secondes
setInterval(() => {
  fetchAndUpdateResources();
  updateResourcesTime();
}, 1000);

/**
 * Initialise la page au chargement
 */
function initStatusPage() {
  console.log('Initialisation de la page status...');
    
  // Vérifier que tous les éléments nécessaires sont présents
  const realtimeCanvas = document.getElementById('realtime-cpu-ram-chart');
  const dailyCanvas = document.getElementById('daily-cpu-ram-chart');
    
  if (!realtimeCanvas || !dailyCanvas) {
    console.warn('Éléments canvas non trouvés, attente...');
    setTimeout(initStatusPage, 500);
    return;
  }
    
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js non chargé, attente...');
    setTimeout(initStatusPage, 500);
    return;
  }
    
  console.log('Tous les éléments chargés, démarrage...');
    
  // Charger les données initiales des bots
  fetchAndUpdateBotsStatus();
  updateStatusTime();
    
  // Charger les données initiales des ressources
  fetchAndUpdateResources();
  updateResourcesTime();
    
  // Configurer les event listeners pour les boutons de refresh
  const refreshStatusButton = document.getElementById('refresh-status');
  if (refreshStatusButton) {
    refreshStatusButton.addEventListener('click', function() {
      fetchAndUpdateBotsStatus();
      updateStatusTime();
    });
  }
    
  const refreshResourcesButton = document.getElementById('refresh-resources');
  if (refreshResourcesButton) {
    refreshResourcesButton.addEventListener('click', function() {
      fetchAndUpdateResources();
      updateResourcesTime();
    });
  }
}

/**
 * Toggle une section repliable
 */
function toggleCollapsible(headerElement) {
  const section = headerElement.closest('.collapsible-section');
  const content = section.querySelector('.collapsible-content');
  const toggle = headerElement.querySelector('.collapsible-toggle');
    
  if (content.classList.contains('collapsed')) {
    content.classList.remove('collapsed');
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    content.classList.add('collapsed');
    toggle.setAttribute('aria-expanded', 'false');
  }
}

// Initialiser quand tout est chargé
window.addEventListener('load', function() {
  // Petit délai supplémentaire pour s'assurer que tout est prêt
  setTimeout(initStatusPage, 100);
});