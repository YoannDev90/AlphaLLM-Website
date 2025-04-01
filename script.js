document.addEventListener("DOMContentLoaded", () => {
    console.log("Le DOM est chargé, initialisation du script...");

    const themeToggle = document.getElementById("themeToggle");
    const langBtns = document.querySelectorAll(".lang-btn");
    const body = document.body;
    let themeClickCount = 2;

    console.log("Éléments initiaux récupérés:", { themeToggle, langBtns, body });

    function switchTheme() {
        themeClickCount += 1;
        console.log("Changement de thème, compteur:", themeClickCount);

        if (themeClickCount === 1) {
            body.classList.remove('amoled', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            console.log("Thème clair activé");
        } else if (themeClickCount === 2) {
            body.classList.add('dark');
            body.classList.remove('amoled');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            console.log("Thème sombre activé");
        } else if (themeClickCount === 3) {
            body.classList.add('amoled');
            body.classList.remove('dark');
            themeToggle.innerHTML = '<i class="fas fa-star"></i>';
            themeClickCount = 0;
            console.log("Thème AMOLED activé");
        }

        localStorage.setItem("theme", body.className);
        console.log("Thème sauvegardé dans localStorage:", body.className);
    }

    const storedTheme = localStorage.getItem("theme");
    console.log("Thème récupéré depuis localStorage:", storedTheme);

    if (storedTheme) {
        body.className = storedTheme;
        console.log("Application du thème stocké:", storedTheme);
        if (body.classList.contains('dark')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeClickCount = 2;
            console.log("Thème sombre détecté, mise à jour du compteur et de l'icône");
        } else if (body.classList.contains('amoled')) {
            themeToggle.innerHTML = '<i class="fas fa-star"></i>';
            themeClickCount = 3;
            console.log("Thème AMOLED détecté, mise à jour du compteur et de l'icône");
        }
    }

    themeToggle.addEventListener("click", switchTheme);
    console.log("Écouteur d'événements ajouté pour le bouton de thème");

    langBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            console.log("Changement de langue demandé:", lang);
            localStorage.setItem("lang", lang);
            loadLanguage(lang);
        });
    });
    console.log("Écouteurs d'événements ajoutés pour les boutons de langue");

    function loadLanguage(lang) {
        console.log("Chargement de la langue:", lang);
        console.time("Chargement de la langue");
        fetch(`lang/${lang}.json?v=${Date.now()}`, {mode: 'cors'})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Données de langue chargées:", data);
                updateContent(data);
                highlightActiveLang(lang);
                console.timeEnd("Chargement de la langue");
            })
            .catch(error => {
                console.error("Erreur lors du chargement de la langue:", error);
                if (lang !== "fr") {
                    console.log("Tentative de chargement de la langue par défaut (fr)");
                    loadLanguage("fr");
                }
            });
    }

    function updateContent(data) {
        Object.keys(data).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = data[id];
                console.log(`Texte mis à jour pour l'élément #${id}:`, data[id]);
            } else {
                console.warn(`Élément #${id} non trouvé dans le DOM`);
            }
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const langDropdown = document.getElementById("langDropdown");
        const dropdownMenu = document.getElementById("dropdownMenu");
        
        const availableLangs = [
            { code: "fr", flag: "https://flagcdn.com/fr.svg", name: "Français" },
            { code: "en", flag: "https://flagcdn.com/us.svg", name: "English" },
            { code: "de", flag: "https://flagcdn.com/de.svg", name: "Deutsch" },
            { code: "es", flag: "https://flagcdn.com/es.svg", name: "Español" },
            { code: "it", flag: "https://flagcdn.com/it.svg", name: "Italiano" },
            { code: "ru", flag: "https://flagcdn.com/ru.svg", name: "Русский" },
            { code: "zh", flag: "https://flagcdn.com/cn.svg", name: "中文" },
            { code: "pt", flag: "https://flagcdn.com/pt.svg", name: "Português" },
            { code: "ar", flag: "https://flagcdn.com/sa.svg", name: "العربية" }
        ];
    
        function populateDropdown() {
            dropdownMenu.innerHTML = ""; // Clear previous items
            const storedLang = localStorage.getItem("lang") || "fr";
    
            // Reorder languages to show the stored language first
            const reorderedLangs = [
                ...availableLangs.filter(lang => lang.code === storedLang),
                ...availableLangs.filter(lang => lang.code !== storedLang)
            ];
    
            reorderedLangs.slice(0, 3).forEach(lang => {
                const button = document.createElement("button");
                button.className = "lang-btn";
                button.dataset.lang = lang.code;
                button.innerHTML = `<img src="${lang.flag}" alt="${lang.name}" width="30"> ${lang.name}`;
                button.addEventListener("click", () => {
                    localStorage.setItem("lang", lang.code);
                    loadLanguage(lang.code);
                });
                dropdownMenu.appendChild(button);
            });
    
            // Add a button to expand the full list of languages
            const expandButton = document.createElement("button");
            expandButton.textContent = "Voir toutes les langues";
            expandButton.addEventListener("click", () => {
                dropdownMenu.innerHTML = ""; // Clear previous items
                reorderedLangs.forEach(lang => {
                    const button = document.createElement("button");
                    button.className = "lang-btn";
                    button.dataset.lang = lang.code;
                    button.innerHTML = `<img src="${lang.flag}" alt="${lang.name}" width="30"> ${lang.name}`;
                    button.addEventListener("click", () => {
                        localStorage.setItem("lang", lang.code);
                        loadLanguage(lang.code);
                    });
                    dropdownMenu.appendChild(button);
                });
            });
            dropdownMenu.appendChild(expandButton);
        }
    
        langDropdown.addEventListener("click", () => {
            dropdownMenu.classList.toggle("active");
        });
    
        populateDropdown();
    });    

    function highlightActiveLang(lang) {
        console.log("Mise en évidence de la langue active:", lang);
        langBtns.forEach(btn => {
            btn.classList.remove("active");
            console.log(`Classe 'active' retirée du bouton ${btn.dataset.lang}`);
        });
        const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add("active");
            console.log(`Classe 'active' ajoutée au bouton ${lang}`);
        } else {
            console.warn(`Bouton pour la langue ${lang} non trouvé`);
        }
    }

    const storedLang = localStorage.getItem("lang") || "fr";
    console.log("Langue récupérée depuis localStorage ou par défaut:", storedLang);
    loadLanguage(storedLang);
});

console.log("Script chargé et prêt à être exécuté");
