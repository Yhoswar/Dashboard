/**
 * YPServicesERP - Navigation Module
 * Control de navegación entre secciones del dashboard
 * @version 1.0.0
 */

const Navigation = (function() {
    'use strict';

    // Configuración de títulos por sección
    const SECTION_TITLES = {
        'dashboard': 'Dashboard',
        'clients': 'Clientes',
        'projects': 'Proyectos',
        'invoices': 'Facturación',
        'employees': 'Empleados',
        'reports': 'Reportes',
        'settings': 'Configuración'
    };

    // DOM Elements
    let navItems;
    let sections;
    let pageTitle;
    let breadcrumbCurrent;

    /**
     * Inicializa el módulo de navegación
     */
    function init() {
        // Cache DOM elements
        navItems = document.querySelectorAll('.nav-item[data-section]');
        sections = document.querySelectorAll('.content-section');
        pageTitle = document.getElementById('pageTitle');
        breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

        // Bind events
        bindEvents();
    }

    /**
     * Bindea los eventos de navegación
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
        const section = item.dataset.section;

        // Navegar a la sección
        navigateTo(section);

        // Cerrar sidebar en móvil (usa Sidebar module si existe)
        if (typeof Sidebar !== 'undefined' && Sidebar.close) {
            Sidebar.close();
        }
    }

    /**
     * Navega a una sección específica
     * @param {string} sectionName - Nombre de la sección
     */
    function navigateTo(sectionName) {
        // Remover active de todos los nav items
        navItems.forEach(n => n.classList.remove('active'));

        // Agregar active al item correspondiente
        const activeItem = document.querySelector(`.nav-item[data-section="${sectionName}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Ocultar todas las secciones
        sections.forEach(s => s.classList.remove('active'));

        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(`section-${sectionName}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Actualizar título y breadcrumb
        updateTitle(sectionName);
    }

    /**
     * Actualiza el título de la página y breadcrumb
     * @param {string} sectionName - Nombre de la sección
     */
    function updateTitle(sectionName) {
        const title = SECTION_TITLES[sectionName] || sectionName;
        
        if (pageTitle) {
            pageTitle.textContent = title;
        }
        
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = title;
        }
    }

    /**
     * Obtiene la sección activa actual
     * @returns {string} Nombre de la sección activa
     */
    function getCurrentSection() {
        const activeItem = document.querySelector('.nav-item.active[data-section]');
        return activeItem ? activeItem.dataset.section : 'dashboard';
    }

    // Public API
    return {
        init: init,
        navigateTo: navigateTo,
        getCurrentSection: getCurrentSection,
        SECTION_TITLES: SECTION_TITLES
    };

})();

// Auto-init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', Navigation.init);
