document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour l'heure du dernier rafraîchissement
    updateLastUpdated();
    
    // Initialiser les graphiques
    initCharts();
    
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
                    min: 97,
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
    
    // Graphique de charge
    const loadCtx = document.getElementById('loadChart').getContext('2d');
    
    new Chart(loadCtx, {
        type: 'line',
        data: {
            labels: ['8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '00h', '02h', '04h', '06h'],
            datasets: [
                {
                    label: 'CPU',
                    data: [25, 32, 48, 35, 40, 52, 75, 65, 38, 30, 22, 45],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Mémoire',
                    data: [45, 50, 55, 60, 68, 65, 70, 75, 60, 55, 50, 68],
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
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

// Valider le format de l'email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    // Status dashboard functionality
    updateStatus();
    setInterval(updateStatus, 60000); // Update status every minute
    
    function updateStatus() {
        const statusIndicators = document.querySelectorAll('.status-indicator');
        const latencyElements = document.querySelectorAll('.latency-value');
        const uptimeElements = document.querySelectorAll('.uptime-value');
        const lastUpdatedElement = document.getElementById('last-updated');
        
        // In a real implementation, you would fetch this data from your API
        // This is just a simulation
        const services = [
            { name: 'main-bot', status: getRandomStatus(), latency: getRandomLatency() },
            { name: 'api', status: getRandomStatus(0.95), latency: getRandomLatency() },
            { name: 'database', status: getRandomStatus(0.98), latency: getRandomLatency() },
            { name: 'website', status: 'operational', latency: getRandomLatency(50) }
        ];
        
        // Update status indicators
        statusIndicators.forEach((indicator, index) => {
            if (index < services.length) {
                const status = services[index].status;
                indicator.className = 'status-indicator';
                indicator.classList.add(status);
                
                const statusText = indicator.nextElementSibling;
                if (statusText) {
                    statusText.textContent = capitalizeFirstLetter(status);
                    statusText.className = status + '-text';
                }
            }
        });
        
        // Update latency values
        latencyElements.forEach((element, index) => {
            if (index < services.length) {
                element.textContent = services[index].latency + ' ms';
            }
        });
        
        // Update uptime values (this would be fetched from your server in a real implementation)
        const uptime = '99.98%';
        uptimeElements.forEach(element => {
            element.textContent = uptime;
        });
        
        // Update last updated time
        if (lastUpdatedElement) {
            const now = new Date();
            lastUpdatedElement.textContent = now.toLocaleTimeString();
        }
    }
    
    function getRandomStatus(operationalChance = 0.9) {
        const random = Math.random();
        
        if (random < operationalChance) {
            return 'operational';
        } else if (random < operationalChance + 0.08) {
            return 'degraded';
        } else {
            return 'outage';
        }
    }
    
    function getRandomLatency(max = 200) {
        return Math.floor(Math.random() * max) + 20;
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Incident history toggle
    const incidentHistoryBtn = document.getElementById('incident-history-btn');
    const incidentHistory = document.getElementById('incident-history');
    
    if (incidentHistoryBtn && incidentHistory) {
        incidentHistoryBtn.addEventListener('click', function() {
            incidentHistory.classList.toggle('expanded');
            
            const btnText = incidentHistoryBtn.querySelector('span');
            const btnIcon = incidentHistoryBtn.querySelector('i');
            
            if (incidentHistory.classList.contains('expanded')) {
                btnText.textContent = 'Hide Incident History';
                btnIcon.className = 'fas fa-chevron-up';
            } else {
                btnText.textContent = 'Show Incident History';
                btnIcon.className = 'fas fa-chevron-down';
            }
        });
    }
});