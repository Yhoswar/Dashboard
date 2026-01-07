/**
 * YPServicesERP - Theme Module
 * Control del tema dark/light mode
 * @version 1.0.0
 */

const Theme = (function() {
    'use strict';

    // Constants
    const STORAGE_KEY = 'theme';
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';

    // DOM Elements
    let themeToggle;
    let darkModeToggle;
    let html;

    /**
     * Inicializa el módulo de tema
     */
    function init() {
        // Cache DOM elements
        themeToggle = document.getElementById('themeToggle');
        darkModeToggle = document.getElementById('darkModeToggle');
        html = document.documentElement;

        // Bind events
        bindEvents();

        // Restore theme from localStorage
        restoreTheme();
    }

    /**
     * Bindea los eventos del tema
     */
    function bindEvents() {
        // Header theme toggle button
        if (themeToggle) {
            themeToggle.addEventListener('click', toggle);
        }

        // Settings dark mode switch
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', handleSettingsToggle);
        }
    }

    /**
     * Toggle del tema
     */
    function toggle() {
        const isDark = html.dataset.theme !== THEME_DARK;
        setTheme(isDark);
    }

    /**
     * Maneja el toggle desde la configuración
     */
    function handleSettingsToggle() {
        setTheme(darkModeToggle.checked);
    }

    /**
     * Establece el tema
     * @param {boolean} isDark - Si debe ser tema oscuro
     */
    function setTheme(isDark) {
        // Actualizar atributo del HTML
        html.dataset.theme = isDark ? THEME_DARK : THEME_LIGHT;

        // Actualizar icono del botón
        updateToggleIcon(isDark);

        // Sincronizar switch de settings
        syncSettingsSwitch(isDark);

        // Guardar en localStorage
        saveTheme(isDark);
    }

    /**
     * Actualiza el icono del botón de toggle
     * @param {boolean} isDark - Si es tema oscuro
     */
    function updateToggleIcon(isDark) {
        if (themeToggle) {
            themeToggle.innerHTML = isDark 
                ? '<i class="bi bi-sun-fill"></i>' 
                : '<i class="bi bi-moon-fill"></i>';
        }
    }

    /**
     * Sincroniza el switch de configuración
     * @param {boolean} isDark - Si es tema oscuro
     */
    function syncSettingsSwitch(isDark) {
        if (darkModeToggle) {
            darkModeToggle.checked = isDark;
        }
    }

    /**
     * Guarda el tema en localStorage
     * @param {boolean} isDark - Si es tema oscuro
     */
    function saveTheme(isDark) {
        localStorage.setItem(STORAGE_KEY, isDark ? THEME_DARK : THEME_LIGHT);
    }

    /**
     * Restaura el tema desde localStorage
     */
    function restoreTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        
        if (savedTheme) {
            setTheme(savedTheme === THEME_DARK);
        }
    }

    /**
     * Verifica si el tema actual es oscuro
     * @returns {boolean}
     */
    function isDark() {
        return html.dataset.theme === THEME_DARK;
    }

    // Public API
    return {
        init: init,
        toggle: toggle,
        setTheme: setTheme,
        isDark: isDark,
        THEME_DARK: THEME_DARK,
        THEME_LIGHT: THEME_LIGHT
    };

})();

// Auto-init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', Theme.init);
