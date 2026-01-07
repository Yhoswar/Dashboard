/**
 * YPServicesERP - Main Application
 * Archivo principal de inicialización
 * @version 2.0.0
 * @author YP Services
 * 
 * Arquitectura: Multi-Page Application (MPA)
 * 
 * Módulos:
 * - Sidebar: Control del menú lateral (toggle, collapse)
 * - Theme: Dark/Light mode
 * - Toast: Notificaciones
 * - Modals: Manejo de modales (view, edit, delete, payment)
 * - Charts: Gráficos con Chart.js (solo en dashboard/reports)
 * - Settings: Tabs de configuración (solo en settings)
 */

const App = (function() {
    'use strict';

    // Version
    const VERSION = '2.0.0';

    // Estado de la aplicación
    let isInitialized = false;

    /**
     * Inicializa la aplicación
     */
    function init() {
        if (isInitialized) {
            console.warn('App already initialized');
            return;
        }

        // Los módulos se auto-inicializan con DOMContentLoaded
        // Este archivo sirve como punto de entrada y utilidades globales

        isInitialized = true;

        // Log de éxito
        console.log(`%c YPServicesERP Dashboard v${VERSION} loaded successfully! `, 
            'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold;');
    }

    /**
     * Obtiene la versión de la aplicación
     * @returns {string}
     */
    function getVersion() {
        return VERSION;
    }

    /**
     * Verifica si la app está inicializada
     * @returns {boolean}
     */
    function ready() {
        return isInitialized;
    }

    /**
     * Reinicia todos los módulos
     */
    function reset() {
        // Reiniciar módulos si es necesario
        if (typeof Charts !== 'undefined' && Charts.destroyAll) {
            Charts.destroyAll();
        }

        isInitialized = false;
        init();
    }

    /**
     * Utilidad para formatear moneda
     * @param {number} amount - Cantidad
     * @param {string} currency - Código de moneda (USD, EUR, MXN)
     * @returns {string}
     */
    function formatCurrency(amount, currency = 'USD') {
        const formatters = {
            'USD': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
            'EUR': new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
            'MXN': new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
        };
        return (formatters[currency] || formatters['USD']).format(amount);
    }

    /**
     * Utilidad para formatear fecha
     * @param {Date|string} date - Fecha
     * @param {string} locale - Locale (es-ES, en-US)
     * @returns {string}
     */
    function formatDate(date, locale = 'es-ES') {
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Utilidad para generar iniciales
     * @param {string} name - Nombre completo
     * @returns {string}
     */
    function getInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    /**
     * Utilidad para debounce
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function}
     */
    function debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utilidad para throttle
     * @param {Function} func - Función a ejecutar
     * @param {number} limit - Límite de tiempo en ms
     * @returns {Function}
     */
    function throttle(func, limit = 300) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public API
    return {
        init: init,
        getVersion: getVersion,
        ready: ready,
        reset: reset,
        // Utilidades
        formatCurrency: formatCurrency,
        formatDate: formatDate,
        getInitials: getInitials,
        debounce: debounce,
        throttle: throttle
    };

})();

// Auto-init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', App.init);
