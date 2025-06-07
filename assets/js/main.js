document.addEventListener('DOMContentLoaded', function() {
    // Theme toggling
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;
    
    // Update icon based on current theme
    updateThemeIcon();
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'amoled-theme');
            localStorage.setItem('theme', 'amoled-theme');
        } else {
            body.classList.replace('amoled-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
        
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        if (body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-moon';
        } else if (body.classList.contains('light-theme')) {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-star';
        }
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
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