/**
 * YPServicesERP - Settings Module
 * Control de tabs y opciones de configuración
 * @version 1.0.0
 */

const Settings = (function() {
    'use strict';

    // DOM Elements
    let navItems;
    let panels;

    /**
     * Inicializa el módulo de configuración
     */
    function init() {
        // Cache DOM elements
        navItems = document.querySelectorAll('.settings-nav-item');
        panels = document.querySelectorAll('.settings-panel');

        // Bind events
        bindEvents();
    }

    /**
     * Bindea los eventos
     */
    function bindEvents() {
        navItems.forEach(item => {
            item.addEventListener('click', handleNavClick);
        });
    }

    /**
     * Maneja el click en un item de navegación
     * @param {Event} e - Evento click
     */
    function handleNavClick(e) {
        const item = e.currentTarget;
        const settingsPanel = item.dataset.settings;

        // Navegar al panel
        navigateTo(settingsPanel);
    }

    /**
     * Navega a un panel de configuración específico
     * @param {string} panelName - Nombre del panel (general, profile, company, security)
     */
    function navigateTo(panelName) {
        // Remover active de todos los nav items
        navItems.forEach(n => n.classList.remove('active'));

        // Agregar active al item correspondiente
        const activeItem = document.querySelector(`.settings-nav-item[data-settings="${panelName}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Ocultar todos los paneles
        panels.forEach(p => p.classList.remove('active'));

        // Mostrar el panel seleccionado
        const targetPanel = document.getElementById(`settings-${panelName}`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    }

    /**
     * Obtiene el panel activo actual
     * @returns {string} Nombre del panel activo
     */
    function getCurrentPanel() {
        const activeItem = document.querySelector('.settings-nav-item.active');
        return activeItem ? activeItem.dataset.settings : 'general';
    }

    // Public API
    return {
        init: init,
        navigateTo: navigateTo,
        getCurrentPanel: getCurrentPanel
    };

})();

// Auto-init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', Settings.init);
