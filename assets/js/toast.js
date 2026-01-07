/**
 * YPServicesERP - Toast Module
 * Sistema de notificaciones toast
 * @version 1.0.0
 */

const Toast = (function() {
    'use strict';

    // Constants
    const TOAST_DURATION = 4000; // 4 segundos
    const FADE_DURATION = 300;   // 300ms para fade out

    // Types
    const TYPE_SUCCESS = 'success';
    const TYPE_ERROR = 'error';
    const TYPE_WARNING = 'warning';
    const TYPE_INFO = 'info';

    // DOM Elements
    let container;

    /**
     * Inicializa el módulo de toast
     */
    function init() {
        container = document.getElementById('toastContainer');
    }

    /**
     * Muestra un toast
     * @param {string} type - Tipo de toast (success, error, warning, info)
     * @param {string} title - Título del toast
     * @param {string} message - Mensaje del toast
     */
    function show(type, title, message) {
        if (!container) {
            container = document.getElementById('toastContainer');
        }

        if (!container) {
            console.warn('Toast container not found');
            return;
        }

        const toast = createToastElement(type, title, message);
        container.appendChild(toast);

        // Auto-remove después del tiempo configurado
        setTimeout(() => {
            fadeOut(toast);
        }, TOAST_DURATION);
    }

    /**
     * Crea el elemento DOM del toast
     * @param {string} type - Tipo de toast
     * @param {string} title - Título
     * @param {string} message - Mensaje
     * @returns {HTMLElement}
     */
    function createToastElement(type, title, message) {
        const toast = document.createElement('div');
        toast.className = `toast-custom ${type} d-flex align-items-center gap-3 p-3 mb-2`;
        
        const icon = getIconForType(type);
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="bi bi-${icon}"></i>
            </div>
            <div>
                <strong class="d-block">${escapeHtml(title)}</strong>
                <small class="text-muted">${escapeHtml(message)}</small>
            </div>
        `;

        return toast;
    }

    /**
     * Obtiene el icono según el tipo
     * @param {string} type - Tipo de toast
     * @returns {string} Nombre del icono de Bootstrap Icons
     */
    function getIconForType(type) {
        const icons = {
            [TYPE_SUCCESS]: 'check-lg',
            [TYPE_ERROR]: 'x-lg',
            [TYPE_WARNING]: 'exclamation-triangle',
            [TYPE_INFO]: 'info-circle'
        };
        return icons[type] || icons[TYPE_INFO];
    }

    /**
     * Fade out y elimina el toast
     * @param {HTMLElement} toast - Elemento toast
     */
    function fadeOut(toast) {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, FADE_DURATION);
    }

    /**
     * Escapa HTML para prevenir XSS
     * @param {string} text - Texto a escapar
     * @returns {string}
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Muestra un toast de éxito
     * @param {string} title - Título
     * @param {string} message - Mensaje
     */
    function success(title, message) {
        show(TYPE_SUCCESS, title, message);
    }

    /**
     * Muestra un toast de error
     * @param {string} title - Título
     * @param {string} message - Mensaje
     */
    function error(title, message) {
        show(TYPE_ERROR, title, message);
    }

    /**
     * Muestra un toast de advertencia
     * @param {string} title - Título
     * @param {string} message - Mensaje
     */
    function warning(title, message) {
        show(TYPE_WARNING, title, message);
    }

    /**
     * Muestra un toast de información
     * @param {string} title - Título
     * @param {string} message - Mensaje
     */
    function info(title, message) {
        show(TYPE_INFO, title, message);
    }

    // Public API
    return {
        init: init,
        show: show,
        success: success,
        error: error,
        warning: warning,
        info: info,
        TYPE_SUCCESS: TYPE_SUCCESS,
        TYPE_ERROR: TYPE_ERROR,
        TYPE_WARNING: TYPE_WARNING,
        TYPE_INFO: TYPE_INFO
    };

})();

// Función global para compatibilidad con código existente
function showToast(type, title, message) {
    Toast.show(type, title, message);
}

// Auto-init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', Toast.init);
