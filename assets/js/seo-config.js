/**
 * Configuration SEO pour AlphaLLM Website
 * Centralisation de tous les paramètres SEO
 */

const SEO_CONFIG = {
  // Informations générales du site
  site: {
    name: 'AlphaLLM',
    description: 'Free AI Discord bot for intelligent chat, image generation and real-time translation. Enhance your Discord server with advanced models like ChatGPT and Claude.',
    url: 'https://alphallm.tech',
    author: 'YoannDev90',
    language: 'fr',
    locale: 'fr_FR',
    alternateLocales: ['en_US'],
    keywords: [
      'AI Discord bot',
      'ChatGPT Discord',
      'Claude Discord',
      'image generation Discord',
      'translation bot',
      'free AI bot',
      'Discord automation',
      'AlphaLLM',
      'YoannDev90',
      'bot Discord IA',
      'génération d\'images Discord',
      'traduction Discord'
    ]
  },

  // Configuration Open Graph
  openGraph: {
    type: 'website',
    title: 'AlphaLLM - Free Advanced AI Discord Bot: Chat, Images & Translation',
    description: 'AI Discord bot for intelligent chat, image generation and real-time translation. Optimize your Discord server with ChatGPT, Claude and more!',
    image: 'https://alphallm.tech/assets/images/banner.svg',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: 'AlphaLLM Discord Bot - AI Chat, Image Generation, Translation',
    siteName: 'AlphaLLM',
    locale: 'fr_FR',
    alternateLocales: ['en_US']
  },

  // Configuration Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@alphallm_tech',
    creator: '@yoanndev90',
    title: 'AlphaLLM - Free Advanced AI Discord Bot',
    description: 'AI Discord bot for intelligent chat, image generation and real-time translation. Optimize your Discord server!',
    image: 'https://alphallm.tech/assets/images/banner.svg',
    imageAlt: 'AlphaLLM Discord Bot'
  },

  // Métadonnées SEO par page
  pages: {
    home: {
      title: 'AlphaLLM - Free Advanced AI Discord Bot: Chat, Images and Translation',
      description: 'Discover AlphaLLM, the free AI Discord bot for intelligent chat, image generation and real-time translation. Enhance your Discord server with advanced models like ChatGPT and Claude. Invite it now!',
      keywords: ['AI Discord bot', 'ChatGPT Discord', 'Claude Discord', 'image generation', 'translation bot', 'free AI bot'],
      ogTitle: 'AlphaLLM - Free Advanced AI Discord Bot: Chat, Images & Translation',
      ogDescription: 'AI Discord bot for intelligent chat, image generation and real-time translation. Optimize your Discord server with ChatGPT, Claude and more!',
      canonical: 'https://alphallm.tech/'
    },
    status: {
      title: 'AlphaLLM Status - Real-time Bot Monitoring and Statistics',
      description: 'Check AlphaLLM bot status in real-time. Monitor uptime, response times, and supported AI models. Get live statistics and performance metrics.',
      keywords: ['AlphaLLM status', 'bot monitoring', 'uptime', 'AI models status', 'Discord bot statistics'],
      ogTitle: 'AlphaLLM Status - Real-time Bot Monitoring',
      ogDescription: 'Monitor AlphaLLM bot status, uptime, and AI models in real-time. Live statistics and performance metrics.',
      canonical: 'https://alphallm.tech/status.html'
    },
    support: {
      title: 'AlphaLLM Support - Help and Documentation',
      description: 'Get help with AlphaLLM Discord bot. Find documentation, FAQs, troubleshooting guides, and contact support for assistance.',
      keywords: ['AlphaLLM support', 'help', 'documentation', 'FAQ', 'troubleshooting', 'contact'],
      ogTitle: 'AlphaLLM Support - Help & Documentation',
      ogDescription: 'Get help with AlphaLLM Discord bot. Documentation, FAQs, and support for all your questions.',
      canonical: 'https://alphallm.tech/support.html'
    },
    download: {
      title: 'Download AlphaLLM - Add AI Bot to Your Discord Server',
      description: 'Download and invite AlphaLLM to your Discord server. Free AI bot with chat, image generation, and translation capabilities.',
      keywords: ['download AlphaLLM', 'invite bot', 'add to Discord', 'Discord bot setup'],
      ogTitle: 'Download AlphaLLM - Add AI Bot to Discord',
      ogDescription: 'Invite AlphaLLM to your Discord server. Free AI bot with advanced chat and image generation.',
      canonical: 'https://alphallm.tech/download.html'
    }
  },

  // Données structurées Schema.org
  structuredData: {
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'AlphaLLM',
      'description': 'Free AI Discord bot for intelligent chat, image generation and translation.',
      'url': 'https://alphallm.tech/',
      'publisher': {
        '@type': 'Organization',
        'name': 'YoannDev90',
        'url': 'https://github.com/YoannDev90'
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://alphallm.tech/status.html',
        'query-input': 'required name=search'
      }
    },

    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'AlphaLLM',
      'url': 'https://alphallm.tech/',
      'logo': 'https://alphallm.tech/assets/images/logo.webp',
      'description': 'Free AI Discord bot for intelligent chat, image generation and translation',
      'foundingDate': '2024',
      'founder': {
        '@type': 'Person',
        'name': 'YoannDev90',
        'url': 'https://github.com/YoannDev90'
      },
      'sameAs': [
        'https://github.com/YoannDev90/AlphaLLM',
        'https://discord.gg/QGvyrUgwdK'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'technical support',
        'url': 'https://alphallm.tech/support.html'
      }
    },

    softwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'AlphaLLM',
      'description': 'Advanced AI Discord bot with chat, image generation, and translation capabilities',
      'url': 'https://alphallm.tech/',
      'applicationCategory': 'Bot',
      'operatingSystem': 'Discord',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'featureList': [
        'AI Chat with multiple models',
        'Image generation',
        'Real-time translation',
        'Multi-language support',
        'Free to use'
      ],
      'author': {
        '@type': 'Person',
        'name': 'YoannDev90',
        'url': 'https://github.com/YoannDev90'
      }
    },

    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is AlphaLLM?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'AlphaLLM is a free AI Discord bot that provides intelligent chat, image generation, and real-time translation capabilities. It supports multiple AI models including ChatGPT, Claude, Gemini, and more.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I invite AlphaLLM to my Discord server?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Click the "Invite Bot" button on our website or visit our Discord server. Follow the authorization process to add AlphaLLM to your server with the necessary permissions.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is AlphaLLM free to use?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, AlphaLLM is completely free to use. There are no premium features or paid tiers. All AI capabilities are available to everyone.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What AI models does AlphaLLM support?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'AlphaLLM supports multiple AI models including ChatGPT (GPT-3.5/4), Claude, Gemini, Llama, DeepSeek, Mistral, and many others for both text chat and image generation.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does AlphaLLM support multiple languages?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, AlphaLLM supports real-time translation between multiple languages. It can translate messages instantly in your Discord server.'
          }
        }
      ]
    }
  },

  // Configuration des liens externes
  socialLinks: {
    discord: 'https://discord.gg/QGvyrUgwdK',
    github: 'https://github.com/YoannDev90/AlphaLLM',
    twitter: 'https://twitter.com/alphallm_tech'
  },

  // Mots-clés pour le SEO local
  localSEO: {
    regions: ['France', 'Paris'],
    languages: ['French', 'English'],
    services: ['AI Chat', 'Image Generation', 'Translation', 'Discord Bot']
  }
};

// Fonctions utilitaires pour le SEO
const SEOUtils = {
  // Générer le titre SEO pour une page
  getPageTitle(pageKey, customTitle = '') {
    const page = SEO_CONFIG.pages[pageKey];
    return customTitle || page?.title || SEO_CONFIG.site.name;
  },

  // Générer la description SEO pour une page
  getPageDescription(pageKey, customDescription = '') {
    const page = SEO_CONFIG.pages[pageKey];
    return customDescription || page?.description || SEO_CONFIG.site.description;
  },

  // Générer l'URL canonique
  getCanonicalUrl(path = '') {
    return `${SEO_CONFIG.site.url}${path}`;
  },

  // Générer les métadonnées Open Graph
  getOpenGraphMeta(pageKey = 'home') {
    const page = SEO_CONFIG.pages[pageKey] || SEO_CONFIG.pages.home;
    return {
      'og:type': SEO_CONFIG.openGraph.type,
      'og:url': page.canonical,
      'og:title': page.ogTitle || page.title,
      'og:description': page.ogDescription || page.description,
      'og:image': SEO_CONFIG.openGraph.image,
      'og:image:width': SEO_CONFIG.openGraph.imageWidth,
      'og:image:height': SEO_CONFIG.openGraph.imageHeight,
      'og:image:alt': SEO_CONFIG.openGraph.imageAlt,
      'og:site_name': SEO_CONFIG.openGraph.siteName,
      'og:locale': SEO_CONFIG.openGraph.locale
    };
  },

  // Générer les métadonnées Twitter Cards
  getTwitterMeta(_pageKey = 'home') {
    return {
      'twitter:card': SEO_CONFIG.twitter.card,
      'twitter:site': SEO_CONFIG.twitter.site,
      'twitter:creator': SEO_CONFIG.twitter.creator,
      'twitter:title': SEO_CONFIG.twitter.title,
      'twitter:description': SEO_CONFIG.twitter.description,
      'twitter:image': SEO_CONFIG.twitter.image,
      'twitter:image:alt': SEO_CONFIG.twitter.imageAlt
    };
  },

  // Mettre à jour dynamiquement les métadonnées
  updateMetaTags(pageKey = 'home') {
    const page = SEO_CONFIG.pages[pageKey];
    if (!page) {return;}

    // Mettre à jour le titre
    document.title = page.title;

    // Mettre à jour la description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', page.description);
    }

    // Mettre à jour Open Graph
    const ogMeta = this.getOpenGraphMeta(pageKey);
    Object.entries(ogMeta).forEach(([property, content]) => {
      const meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      }
    });

    // Mettre à jour l'URL canonique
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', page.canonical);
    }
  }
};

// Exports pour utilisation dans les modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SEO_CONFIG, SEOUtils };
}

// Pour le navigateur global
if (typeof window !== 'undefined') {
  window.SEO_CONFIG = SEO_CONFIG;
  window.SEOUtils = SEOUtils;
}