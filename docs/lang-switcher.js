// lang-switcher.js - Minimal language switcher functionality
(function() {
    'use strict';

    const SUPPORTED_LANGS = ['en', 'ko', 'ja'];
    const DEFAULT_LANG = 'en';

    // Get current language from URL path
    function getCurrentLang() {
        const path = window.location.pathname;
        // Check for GitHub Pages base path
        const basePath = '/remin-support';
        let cleanPath = path;
        if (path.startsWith(basePath)) {
            cleanPath = path.substring(basePath.length);
        }

        for (const lang of SUPPORTED_LANGS) {
            if (cleanPath.startsWith('/' + lang + '/') || cleanPath === '/' + lang) {
                return lang;
            }
        }
        return DEFAULT_LANG;
    }

    // Get equivalent path in target language
    function getLocalizedPath(targetLang, currentPage) {
        const basePath = '/remin-support';
        const currentLang = getCurrentLang();

        // Determine current page (index.html, support.html, privacy.html)
        let page = currentPage || 'index.html';
        const path = window.location.pathname;

        if (path.includes('support.html') || path.endsWith('support')) {
            page = 'support.html';
        } else if (path.includes('privacy.html') || path.endsWith('privacy')) {
            page = 'privacy.html';
        } else {
            page = '';  // index page uses just the directory
        }

        // Build new path
        if (targetLang === DEFAULT_LANG) {
            return basePath + '/' + page;
        }
        return basePath + '/' + targetLang + '/' + page;
    }

    // Update dropdown links with correct paths
    function updateDropdownLinks() {
        const currentLang = getCurrentLang();

        document.querySelectorAll('.lang-option').forEach(link => {
            const lang = link.dataset.lang;
            if (lang) {
                link.href = getLocalizedPath(lang);

                // Mark current language
                if (lang === currentLang) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });

        // Update current language display
        const langCode = document.querySelector('.lang-code');
        if (langCode) {
            langCode.textContent = currentLang.toUpperCase();
        }
    }

    // Toggle dropdown
    function initDropdown() {
        const switcher = document.querySelector('.lang-switcher');
        const button = document.querySelector('.lang-current');

        if (!switcher || !button) return;

        button.addEventListener('click', function(e) {
            e.stopPropagation();
            switcher.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            switcher.classList.remove('open');
        });

        // Prevent dropdown from closing when clicking inside
        const dropdown = document.querySelector('.lang-dropdown');
        if (dropdown) {
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        updateDropdownLinks();
        initDropdown();
    });
})();
