document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
    
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      const isOpen = navLinks.classList.contains('active');
            
      // Mise à jour de l'aria-expanded
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            
      if (isOpen) {
        icon.className = 'fas fa-times';
        mobileMenuBtn.setAttribute('aria-label', 'Fermer le menu');
      } else {
        icon.className = 'fas fa-bars';
        mobileMenuBtn.setAttribute('aria-label', 'Ouvrir le menu');
      }
    });
  }
    
  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
    
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
        
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
    
  // Footer year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
    
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elementsToAnimate = document.querySelectorAll('.slide-in');
        
    elementsToAnimate.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight - 50;
            
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
      }
    });
  };
    
  // Run animation on initial load
  animateOnScroll();
    
  // Run animation on scroll
  window.addEventListener('scroll', animateOnScroll);
    
  // FAQ functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const isActive = question.classList.contains('active');
            
      // Close all other questions
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
      });
            
      // Toggle current question
      if (!isActive) {
        question.classList.add('active');
      }
    });
  });
    
  // Handle legals navigation
  const legalsNavItems = document.querySelectorAll('.legals-nav-item');
    
  if (legalsNavItems.length > 0) {
    // Set active nav item based on hash
    const hash = window.location.hash || '#terms';
    updateActiveNavItem(hash);

    // Handle nav item clicks
    legalsNavItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const hash = e.target.getAttribute('href');
        updateActiveNavItem(hash);
      });
    });
  }
});

function updateActiveNavItem(hash) {
  const legalsNavItems = document.querySelectorAll('.legals-nav-item');
  legalsNavItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === hash) {
      item.classList.add('active');
    }
  });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[SW] Enregistré avec succès:', registration.scope);

        // Vérifier les mises à jour
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nouvelle version disponible
                if (confirm('Une nouvelle version est disponible. Recharger la page ?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log('[SW] Échec de l\'enregistrement:', error);
      });
  });

  // ===================================================
  // Dark Mode Toggle
  // ===================================================

  class DarkModeManager {
    constructor() {
      this.theme = localStorage.getItem('theme') || 'dark';
      this.init();
    }

    init() {
      this.applyTheme();
      this.createToggleButton();
      this.bindEvents();
    }

    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);

      // Mettre à jour l'icône du bouton si elle existe
      const toggleBtn = document.querySelector('.theme-toggle');
      if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
      }
    }

    createToggleButton() {
      // Créer le bouton de toggle s'il n'existe pas
      if (!document.querySelector('.theme-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Basculer le thème');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';

        // L'ajouter dans le header
        const header = document.querySelector('header .container');
        if (header) {
          header.appendChild(toggleBtn);
        }
      }
    }

    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme();

      // Animation de transition
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    }

    bindEvents() {
      document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-toggle')) {
          this.toggleTheme();
        }
      });

      // Support du raccourci clavier (Ctrl/Cmd + Shift + D)
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
  }

  // Initialiser le gestionnaire de thème
  const darkModeManager = new DarkModeManager();
}