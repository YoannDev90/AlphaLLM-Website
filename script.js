// Gestion des thèmes
const themeToggle = document.getElementById('themeToggle');
const themes = ['light-theme', 'dark-theme', 'amoled-theme'];

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme.includes('dark') || theme === 'amoled-theme' 
    ? 'fas fa-moon' 
    : 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.value.match(/theme-\w+/)?.[0] || 'light-theme';
  const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
  const nextTheme = themes[nextIndex];
  
  document.body.className = nextTheme;
  localStorage.setItem('theme', nextTheme);
  updateThemeIcon(nextTheme);
});

// Gestion des langues
const languageSelect = document.getElementById('language-select');
let translations = {};

async function loadLanguage(lang) {
  try {
    const response = await fetch(`/lang/${lang}.json`);
    translations = await response.json();
    applyTranslations();
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  } catch (error) {
    console.error('Error loading language:', error);
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = translations[key] || element.textContent;
  });
}

// Chargement initial
document.addEventListener('DOMContentLoaded', async () => {
  // Thème
  const savedTheme = localStorage.getItem('theme') || 'light-theme';
  document.body.className = savedTheme;
  updateThemeIcon(savedTheme);

  // Langue
  const userLanguage = localStorage.getItem('language') || navigator.language.split('-')[0] || 'en';
  await loadLanguage(userLanguage);
  languageSelect.value = userLanguage;
});

// Changement de langue
languageSelect.addEventListener('change', (e) => {
  loadLanguage(e.target.value);
});
