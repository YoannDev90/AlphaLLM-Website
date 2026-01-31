/**
 * Lazy Loading pour les images
 * Améliore les performances en chargeant les images seulement quand elles sont visibles
 */

class LazyLoader {
  constructor() {
    this.images = [];
    this.observer = null;
    this.init();
  }

  init() {
    // Vérifier le support du navigateur
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px', // Commencer le chargement 50px avant que l'image soit visible
        threshold: 0.01
      });

      this.observeImages();
    } else {
      // Fallback pour les navigateurs sans IntersectionObserver
      this.loadAllImages();
    }
  }

  observeImages() {
    // Sélectionner toutes les images avec data-src
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      this.observer.observe(img);
    });
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    const srcset = img.getAttribute('data-srcset');
    const sizes = img.getAttribute('data-sizes');
    if (srcset) {
      img.srcset = srcset;
      img.removeAttribute('data-srcset');
    }
    if (sizes) {
      img.sizes = sizes;
      img.removeAttribute('data-sizes');
    }
    if (src) {
      img.src = src;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
      this.observer.unobserve(img);
    }
  }

  loadAllImages() {
    // Fallback: charger toutes les images immédiatement
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      this.loadImage(img);
    });
  }
}

// Initialisation
new LazyLoader();