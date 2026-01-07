/**
 * YPServicesERP - Sidebar Module
 * Control del sidebar: toggle, collapse, overlay
 * @version 1.0.0
 */

const Sidebar = (function() {
    'use strict';

    // DOM Elements
    let menuToggle;
    let sidebar;
    let sidebarOverlay;
    let mainContent;
    let sidebarToggleBtn;

    /**
     * Inicializa el módulo del sidebar
     */
    function init() {
        // Cache DOM elements
        menuToggle = document.getElementById('menuToggle');
        sidebar = document.getElementById('sidebar');
        sidebarOverlay = document.getElementById('sidebarOverlay');
        mainContent = document.getElementById('mainContent');
        sidebarToggleBtn = document.getElementById('sidebarToggleBtn');

        // Bind events
        bindEvents();

        // Restore collapsed state from localStorage
        restoreState();
    }

    /**
     * Bindea los eventos del sidebar
     */
    function bindEvents() {
        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobile);
        }

        // Overlay click (close sidebar on mobile)
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeMobile);
        }

        // Desktop collapse toggle
        if (sidebarToggleBtn) {
            sidebarToggleBtn.addEventListener('click', toggleCollapse);
        }
    }

    /**
     * Toggle sidebar en móvil
     */
    function toggleMobile() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    }

    /**
     * Cierra el sidebar en móvil
     */
    function closeMobile() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    /**
     * Toggle colapso del sidebar en desktop
     */
    function toggleCollapse() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        
        // Guardar estado en localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    }

    /**
     * Restaura el estado colapsado desde localStorage
     */
    function restoreState() {
        if (localStorage.getItem('sidebarCollapsed') === 'true' && window.innerWidth >= 1200) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
        }
    }

    /**
     * Cierra el sidebar (para uso externo)
     */
    function close() {
        closeMobile();
    }

    // Public API
    return {
        init: init,
        close: close,
        toggleMobile: toggleMobile,
        toggleCollapse: toggleCollapse
    };

})();

// Auto-init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', Sidebar.init);
