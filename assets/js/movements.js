/**
 * YPServicesERP - Movements Module
 * Gestión de movimientos financieros
 * @version 1.0.0
 */

const Movements = (function() {
    'use strict';

    // Bootstrap Modals
    let newModal;
    let detailModal;
    let deleteModal;

    // Current movement ID for operations
    let currentMovementId = null;

    /**
     * Initialize the module
     */
    function init() {
        cacheModals();
        bindEvents();
        setDefaultDate();
    }

    /**
     * Cache Bootstrap modal instances
     */
    function cacheModals() {
        const newModalEl = document.getElementById('newMovementModal');
        const detailModalEl = document.getElementById('detailMovementModal');
        const deleteModalEl = document.getElementById('deleteMovementModal');

        if (newModalEl) newModal = new bootstrap.Modal(newModalEl);
        if (detailModalEl) detailModal = new bootstrap.Modal(detailModalEl);
        if (deleteModalEl) deleteModal = new bootstrap.Modal(deleteModalEl);
    }

    /**
     * Bind events
     */
    function bindEvents() {
        // Type selector change - show/hide employee field
        const typeSelect = document.getElementById('movementType');
        if (typeSelect) {
            typeSelect.addEventListener('change', handleTypeChange);
        }

        // Filter changes
        const filters = ['filterType', 'filterEmployee', 'filterProject', 'filterPeriod'];
        filters.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', applyFilters);
            }
        });

        // Reset form when modal closes
        const newModalEl = document.getElementById('newMovementModal');
        if (newModalEl) {
            newModalEl.addEventListener('hidden.bs.modal', resetForm);
        }
    }

    /**
     * Set default date to today
     */
    function setDefaultDate() {
        const dateInput = document.getElementById('movementDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
        }
    }

    /**
     * Handle type change - show employee field for "Pago a Equipo"
     */
    function handleTypeChange() {
        const type = document.getElementById('movementType').value;
        const employeeField = document.getElementById('employeeField');
        
        if (employeeField) {
            if (type === 'pago_equipo') {
                employeeField.style.display = 'block';
                document.getElementById('movementEmployee').required = true;
            } else {
                employeeField.style.display = 'none';
                document.getElementById('movementEmployee').required = false;
            }
        }
    }

    /**
     * Apply filters (demo - would make API call in production)
     */
    function applyFilters() {
        console.log('Applying filters...');
        // In production: fetch filtered data from API
        showToast('info', 'Filtros aplicados', 'Los resultados han sido actualizados.');
    }

    /**
     * Open new movement modal
     */
    function openNew() {
        resetForm();
        if (newModal) newModal.show();
    }

    /**
     * Open edit modal with movement data
     * @param {number} id - Movement ID
     */
    function openEdit(id) {
        currentMovementId = id;
        
        // In production: fetch movement data from API
        // Demo: populate with sample data
        const demoData = getMovementData(id);
        
        document.getElementById('movementType').value = demoData.type;
        handleTypeChange();
        
        if (demoData.employeeId) {
            document.getElementById('movementEmployee').value = demoData.employeeId;
        }
        
        document.getElementById('movementDescription').value = demoData.description;
        document.getElementById('movementAmount').value = demoData.amount;
        document.getElementById('movementDate').value = demoData.date;
        document.getElementById('movementProject').value = demoData.projectId || '';
        document.getElementById('movementNotes').value = demoData.notes || '';
        
        // Close detail modal if open
        if (detailModal) detailModal.hide();
        
        // Open new modal (used for both create and edit)
        if (newModal) newModal.show();
    }

    /**
     * Open detail modal
     * @param {number} id - Movement ID
     */
    function openDetail(id) {
        currentMovementId = id;
        
        // In production: fetch movement data from API
        // Demo: use sample data
        const demoData = getMovementData(id);
        
        document.getElementById('detailDescription').textContent = demoData.description;
        document.getElementById('detailAmount').textContent = `-$${demoData.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        document.getElementById('detailDate').textContent = formatDate(demoData.date);
        document.getElementById('detailEmployee').textContent = demoData.employee || '—';
        document.getElementById('detailProject').textContent = demoData.project || '—';
        document.getElementById('detailNotes').textContent = demoData.notes || 'Sin notas';
        document.getElementById('detailCreatedBy').textContent = 'Admin User';
        
        // Update type badge
        const typeBadge = document.getElementById('detailType');
        typeBadge.textContent = demoData.typeLabel;
        typeBadge.className = `type-badge ${demoData.type}`;
        
        // Update icon
        const icon = document.querySelector('#detailMovementModal .movement-icon-lg');
        if (icon) {
            icon.className = `movement-icon-lg ${demoData.type}`;
            icon.innerHTML = `<i class="bi ${demoData.icon}"></i>`;
        }
        
        if (detailModal) detailModal.show();
    }

    /**
     * Open delete confirmation modal
     * @param {number} id - Movement ID
     */
    function openDelete(id) {
        currentMovementId = id;
        if (deleteModal) deleteModal.show();
    }

    /**
     * Save movement (create or update)
     */
    function save() {
        const form = document.getElementById('newMovementForm');
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const data = {
            type: document.getElementById('movementType').value,
            employeeId: document.getElementById('movementEmployee').value,
            description: document.getElementById('movementDescription').value,
            amount: parseFloat(document.getElementById('movementAmount').value),
            date: document.getElementById('movementDate').value,
            projectId: document.getElementById('movementProject').value,
            notes: document.getElementById('movementNotes').value
        };
        
        console.log('Saving movement:', data);
        
        // In production: send to API
        // Demo: show success message
        
        if (newModal) newModal.hide();
        
        const action = currentMovementId ? 'actualizado' : 'creado';
        showToast('success', 'Movimiento ' + action, 'El movimiento ha sido guardado correctamente.');
        
        // Reset for next use
        currentMovementId = null;
    }

    /**
     * Confirm delete
     */
    function confirmDelete() {
        console.log('Deleting movement:', currentMovementId);
        
        // In production: send delete request to API
        // Demo: show success message
        
        if (deleteModal) deleteModal.hide();
        showToast('success', 'Movimiento eliminado', 'El movimiento ha sido eliminado correctamente.');
        
        currentMovementId = null;
    }

    /**
     * Reset form to initial state
     */
    function resetForm() {
        const form = document.getElementById('newMovementForm');
        if (form) form.reset();
        
        const employeeField = document.getElementById('employeeField');
        if (employeeField) employeeField.style.display = 'none';
        
        setDefaultDate();
        currentMovementId = null;
    }

    /**
     * Get demo movement data by ID
     * @param {number} id - Movement ID
     * @returns {Object} Movement data
     */
    function getMovementData(id) {
        const movements = {
            1: {
                type: 'payment',
                typeLabel: 'Pago a Equipo',
                icon: 'bi-person-fill',
                description: 'Pago quincenal - María García',
                amount: 1800,
                date: '2026-01-11',
                employeeId: '1',
                employee: 'María García',
                projectId: '',
                project: null,
                notes: 'Pago correspondiente a primera quincena de enero 2026'
            },
            2: {
                type: 'payment',
                typeLabel: 'Pago a Equipo',
                icon: 'bi-person-fill',
                description: 'Pago quincenal - Carlos López',
                amount: 2200,
                date: '2026-01-10',
                employeeId: '2',
                employee: 'Carlos López',
                projectId: '',
                project: null,
                notes: ''
            },
            3: {
                type: 'service',
                typeLabel: 'Servicio',
                icon: 'bi-cloud-fill',
                description: 'Suscripción AWS - Enero',
                amount: 450,
                date: '2026-01-08',
                employeeId: '',
                employee: null,
                projectId: '1',
                project: 'E-commerce TechStore',
                notes: 'Factura AWS-2026-0108'
            },
            4: {
                type: 'project',
                typeLabel: 'Gasto Proyecto',
                icon: 'bi-kanban-fill',
                description: 'Licencia plugin premium',
                amount: 79,
                date: '2026-01-05',
                employeeId: '',
                employee: null,
                projectId: '2',
                project: 'App Gestión Inventario',
                notes: 'Plugin WooCommerce para inventario'
            },
            5: {
                type: 'service',
                typeLabel: 'Servicio',
                icon: 'bi-palette-fill',
                description: 'Suscripción Figma Team',
                amount: 75,
                date: '2026-01-03',
                employeeId: '',
                employee: null,
                projectId: '',
                project: 'General',
                notes: 'Plan Team mensual'
            },
            6: {
                type: 'other',
                typeLabel: 'Otro',
                icon: 'bi-three-dots',
                description: 'Dominio anual ypservices.com',
                amount: 15,
                date: '2026-01-01',
                employeeId: '',
                employee: null,
                projectId: '',
                project: 'General',
                notes: 'Renovación anual GoDaddy'
            },
            7: {
                type: 'payment',
                typeLabel: 'Pago a Equipo',
                icon: 'bi-person-fill',
                description: 'Bono fin de año - Ana Martínez',
                amount: 500,
                date: '2025-12-28',
                employeeId: '3',
                employee: 'Ana Martínez',
                projectId: '',
                project: null,
                notes: 'Bono navideño'
            }
        };
        
        return movements[id] || movements[1];
    }

    /**
     * Format date for display
     * @param {string} dateStr - Date string (YYYY-MM-DD)
     * @returns {string} Formatted date
     */
    function formatDate(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    /**
     * Show toast notification
     * @param {string} type - Toast type (success, error, info)
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     */
    function showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast-custom ${type}`;
        
        const icons = {
            success: 'check-lg',
            error: 'x-lg',
            info: 'info-circle'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="bi bi-${icons[type] || 'info-circle'}"></i>
            </div>
            <div>
                <strong class="d-block">${escapeHtml(title)}</strong>
                <small class="text-muted">${escapeHtml(message)}</small>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Public API
    return {
        init: init,
        openNew: openNew,
        openEdit: openEdit,
        openDetail: openDetail,
        openDelete: openDelete,
        save: save,
        confirmDelete: confirmDelete
    };

})();

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', Movements.init);
