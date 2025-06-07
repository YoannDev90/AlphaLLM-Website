document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour l'heure du dernier rafraîchissement
    updateLastUpdated();
    
    // Initialiser les graphiques
    initCharts();
    initPingChart();
    
    // Simuler des données en temps réel (pour la démo)
    simulateRealTimeData();
    
    // Bouton de rafraîchissement
    document.getElementById('refresh-status').addEventListener('click', function() {
        this.classList.add('rotating');
        setTimeout(() => {
            this.classList.remove('rotating');
            updateStatusData();
            updateLastUpdated();
        }, 1000);
    });
    
    // Formulaire d'abonnement aux notifications
    document.getElementById('notification-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('notification-email').value;
        if (email && validateEmail(email)) {
            showNotification('success', 'Vous êtes maintenant abonné aux notifications de statut!');
            this.reset();
        } else {
            showNotification('error', 'Veuillez entrer une adresse email valide.');
        }
    });
});

// Mettre à jour l'heure du dernier rafraîchissement
function updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    document.getElementById('last-updated').textContent = `Dernière mise à jour : ${dateString} ${timeString}`;
}

// Initialiser les graphiques
function initCharts() {
    // Graphique de disponibilité
    const uptimeCtx = document.getElementById('uptimeChart').getContext('2d');
    const uptimeData = generateUptimeData();
    
    new Chart(uptimeCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => `Jour ${i+1}`),
            datasets: [{
                label: 'Disponibilité (%)',
                data: uptimeData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 1,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
            },
            scales: {
                y: {
                    min: 95,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    display: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Générer des données de disponibilité
function generateUptimeData() {
    const data = [];
    for (let i = 0; i < 30; i++) {
        // La plupart des jours ont 100% de disponibilité
        let value = 100;
        
        // Simuler une petite interruption
        if (i === 22) {
            value = 99.4;
        } else if (i === 23) {
            value = 99.8;
        }
        
        data.push(value);
    }
    return data;
}

// Simuler des mises à jour de données en temps réel
function simulateRealTimeData() {
    setInterval(() => {
        // Simuler de légères variations dans les temps de ping
        updatePing('main-ping', randomVariation(32, 5));
        updatePing('db-ping', randomVariation(18, 3));
        updatePing('ai-ping', randomVariation(78, 15));
        updatePing('image-ping', randomVariation(125, 25));
        
        // Simuler des changements dans l'utilisation des ressources
        updateResourceUsage('cpu-usage', randomVariation(45, 10));
        updateResourceUsage('memory-usage', randomVariation(68, 5));
        updateResourceUsage('network-usage', randomVariation(32, 8));
    }, 5000);
}

// Générer une variation aléatoire autour d'une valeur
function randomVariation(baseValue, range) {
    return Math.max(1, Math.min(999, Math.round(baseValue + (Math.random() * range * 2) - range)));
}

// Mettre à jour l'affichage du ping
function updatePing(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        // Animation de changement de valeur
        element.classList.add('value-change');
        setTimeout(() => {
            element.textContent = value;
            element.classList.remove('value-change');
        }, 200);
    }
}

// Mettre à jour l'utilisation des ressources
function updateResourceUsage(elementId, percentage) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.width = `${percentage}%`;
        element.querySelector('span').textContent = `${percentage}%`;
        
        // Changer la couleur en fonction du pourcentage
        if (percentage > 80) {
            element.style.backgroundColor = 'var(--error-color)';
        } else if (percentage > 60) {
            element.style.backgroundColor = 'var(--warning-color)';
        } else {
            element.style.backgroundColor = 'var(--success-color)';
        }
    }
}

// Simuler une mise à jour des données de statut
function updateStatusData() {
    // Animer les cartes d'état
    document.querySelectorAll('.status-item').forEach((item, index) => {
        item.classList.add('update-pulse');
        setTimeout(() => {
            item.classList.remove('update-pulse');
        }, 1000 + (index * 100));
    });
    
    // Simuler un changement de statut aléatoire (pour démonstration)
    const statuses = ['main', 'database', 'ai', 'image'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // 90% chance que tout soit OK
    if (Math.random() > 0.9) {
        simulateIssue(randomStatus);
    } else {
        // Remettre tous les services en ligne
        statuses.forEach(status => {
            const statusElement = document.querySelector(`#${status}-status .status-badge`);
            if (statusElement && !statusElement.classList.contains('online')) {
                statusElement.classList.remove('degraded', 'offline');
                statusElement.classList.add('online');
                statusElement.textContent = getTranslatedText('status.operational', 'Opérationnel');
            }
        });
    }
}

// Simuler un problème pour un service
function simulateIssue(serviceType) {
    const statusElement = document.querySelector(`#${serviceType}-status .status-badge`);
    if (statusElement) {
        const issueType = Math.random() > 0.3 ? 'degraded' : 'offline';
        
        statusElement.classList.remove('online');
        statusElement.classList.add(issueType);
        
        if (issueType === 'degraded') {
            statusElement.textContent = getTranslatedText('status.degraded', 'Performance dégradée');
        } else {
            statusElement.textContent = getTranslatedText('status.offline', 'Hors ligne');
        }
    }
}

// Fonction d'aide pour la traduction
function getTranslatedText(key, fallback) {
    // Cette fonction devrait être remplacée par votre système de traduction
    return fallback;
}

// Afficher une notification
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    
    const icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add(type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle');
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

let pingChart = null;

function initPingChart() {
    const ctx = document.getElementById('pingChart').getContext('2d');
    
    const timeLabels = Array.from({length: 24}, (_, i) => `${i}:00`);
    const dataset = {
        label: 'Latence (ms)',
        data: generatePingData(24),
        borderColor: '#00ff9d',
        backgroundColor: createGradient(ctx),
        fill: true,
        tension: 0.4
    };

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [dataset]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Ping (ms)'
                    }
                }
            }
        }
    });
}

function generatePingData(points) {
    return Array.from({length: points}, () => Math.floor(Math.random() * 100) + 20);
}

function createGradient(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300); // Augmenté pour le nouveau height
    gradient.addColorStop(0, 'rgba(0, 255, 157, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 255, 157, 0)');
    return gradient;
}

// Initialiser le graphique au chargement
document.addEventListener('DOMContentLoaded', initPingChart);