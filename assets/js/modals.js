/**
 * YPServicesERP - Modals Module
 * Manejo de modales: View, Edit, Delete, Payment
 * @version 1.0.0
 */

const Modals = (function() {
    'use strict';

    // State
    let deleteItemType = '';
    let deleteItemNameValue = '';

    /**
     * Inicializa el módulo de modales
     */
    function init() {
        // Los modales se inicializan bajo demanda
    }

    /* ========================================
       PAYMENT MODAL
    ======================================== */

    /**
     * Abre el modal de pago
     * @param {string} name - Nombre del empleado
     * @param {string} initials - Iniciales
     * @param {string} role - Cargo
     */
    function openPaymentModal(name, initials, role) {
        document.getElementById('paymentName').textContent = name;
        document.getElementById('paymentAvatar').textContent = initials;
        document.getElementById('paymentRole').textContent = role;
        document.getElementById('paymentDate').value = new Date().toISOString().split('T')[0];
        
        new bootstrap.Modal(document.getElementById('paymentModal')).show();
    }

    /**
     * Confirma el pago
     */
    function confirmPayment() {
        const name = document.getElementById('paymentName').textContent;
        
        bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();
        
        if (typeof Toast !== 'undefined') {
            Toast.success('Pago Registrado', `El pago a ${name} se ha registrado.`);
        } else {
            showToast('success', 'Pago Registrado', `El pago a ${name} se ha registrado.`);
        }
    }

    /* ========================================
       VIEW MODAL
    ======================================== */

    /**
     * Abre el modal de visualización
     * @param {string} type - Tipo de entidad (client, employee, project, invoice)
     * @param {...any} args - Argumentos según el tipo
     */
    function openViewModal(type, ...args) {
        const title = document.getElementById('viewModalTitle');
        const content = document.getElementById('viewModalContent');
        const editBtn = document.getElementById('viewModalEditBtn');
        let html = '';

        switch (type) {
            case 'client':
                html = buildClientViewHtml(args, title, editBtn);
                break;
            case 'employee':
                html = buildEmployeeViewHtml(args, title, editBtn);
                break;
            case 'project':
                html = buildProjectViewHtml(args, title, editBtn);
                break;
            case 'invoice':
                html = buildInvoiceViewHtml(args, title, editBtn);
                break;
        }

        content.innerHTML = html;
        new bootstrap.Modal(document.getElementById('viewModal')).show();
    }

    function buildClientViewHtml(args, title, editBtn) {
        const [name, initials, email, phone, projects, status] = args;
        title.textContent = 'Detalles del Cliente';
        editBtn.style.display = 'inline-flex';
        editBtn.onclick = () => {
            bootstrap.Modal.getInstance(document.getElementById('viewModal')).hide();
            openEditModal('client', name);
        };
        
        return `
            <div class="view-header d-flex align-items-center gap-3">
                <div class="view-avatar">${initials}</div>
                <div>
                    <h5 class="mb-0">${name}</h5>
                    <small class="view-subtitle">${email}</small>
                </div>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Teléfono</span>
                <span>${phone}</span>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Proyectos</span>
                <span>${projects}</span>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Estado</span>
                <span class="status-badge ${status.toLowerCase()}">${status}</span>
            </div>
        `;
    }

    function buildEmployeeViewHtml(args, title, editBtn) {
        const [name, initials, email, role, phone, date] = args;
        title.textContent = 'Detalles del Empleado';
        editBtn.style.display = 'inline-flex';
        editBtn.onclick = () => {
            bootstrap.Modal.getInstance(document.getElementById('viewModal')).hide();
            openEditModal('employee', name);
        };
        
        return `
            <div class="view-header d-flex align-items-center gap-3">
                <div class="view-avatar">${initials}</div>
                <div>
                    <h5 class="mb-0">${name}</h5>
                    <small class="view-subtitle">${role}</small>
                </div>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Email</span>
                <span>${email}</span>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Teléfono</span>
                <span>${phone}</span>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Ingreso</span>
                <span>${date}</span>
            </div>
        `;
    }

    function buildProjectViewHtml(args, title, editBtn) {
        const [name, icon, client, budget, status] = args;
        title.textContent = 'Detalles del Proyecto';
        editBtn.style.display = 'inline-flex';
        editBtn.onclick = () => {
            bootstrap.Modal.getInstance(document.getElementById('viewModal')).hide();
            openEditModal('project', name);
        };
        
        const statusClass = status === 'En Progreso' ? 'progress' : status.toLowerCase();
        
        return `
            <div class="view-header d-flex align-items-center gap-3">
                <div class="view-avatar"><i class="bi bi-${icon}"></i></div>
                <div>
                    <h5 class="mb-0">${name}</h5>
                    <small class="view-subtitle">Cliente: ${client}</small>
                </div>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Presupuesto</span>
                <strong style="color:var(--success);">${budget}</strong>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Estado</span>
                <span class="status-badge ${statusClass}">${status}</span>
            </div>
        `;
    }

    function buildInvoiceViewHtml(args, title, editBtn) {
        const [number, client, project, amount, status] = args;
        title.textContent = 'Detalles de Factura';
        editBtn.style.display = 'none';
        
        return `
            <div class="view-header d-flex align-items-center gap-3">
                <div class="view-avatar" style="background:linear-gradient(135deg,var(--warning),var(--danger));">
                    <i class="bi bi-receipt"></i>
                </div>
                <div>
                    <h5 class="mb-0">${number}</h5>
                    <small class="view-subtitle">${project}</small>
                </div>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Cliente</span>
                <span>${client}</span>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Monto</span>
                <strong style="color:var(--primary);">${amount}</strong>
            </div>
            <div class="view-detail d-flex justify-content-between">
                <span class="view-label">Estado</span>
                <span class="status-badge ${status.toLowerCase()}">${status}</span>
            </div>
        `;
    }

    /* ========================================
       EDIT MODAL
    ======================================== */

    /**
     * Abre el modal de edición
     * @param {string} type - Tipo de entidad
     * @param {string} name - Nombre de la entidad
     */
    function openEditModal(type, name) {
        const title = document.getElementById('editModalTitle');
        const content = document.getElementById('editModalContent');
        const parts = name.split(' ');
        let html = '';

        switch (type) {
            case 'client':
                title.textContent = 'Editar Cliente';
                html = buildClientEditHtml(parts, name);
                break;
            case 'employee':
                title.textContent = 'Editar Empleado';
                html = buildEmployeeEditHtml(parts, name);
                break;
            case 'project':
                title.textContent = 'Editar Proyecto';
                html = buildProjectEditHtml(name);
                break;
        }

        content.innerHTML = html;
        new bootstrap.Modal(document.getElementById('editModal')).show();
    }

    function buildClientEditHtml(parts, name) {
        return `
            <div class="row g-3">
                <div class="col-6">
                    <label class="form-label-custom">Nombre</label>
                    <input type="text" class="form-control form-control-custom" value="${parts[0]}">
                </div>
                <div class="col-6">
                    <label class="form-label-custom">Apellido</label>
                    <input type="text" class="form-control form-control-custom" value="${parts[1] || ''}">
                </div>
                <div class="col-12">
                    <label class="form-label-custom">Email</label>
                    <input type="email" class="form-control form-control-custom" value="${name.toLowerCase().replace(' ', '.')}@email.com">
                </div>
                <div class="col-12">
                    <label class="form-label-custom">Estado</label>
                    <select class="form-select form-select-custom">
                        <option selected>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
            </div>
        `;
    }

    function buildEmployeeEditHtml(parts, name) {
        return `
            <div class="row g-3">
                <div class="col-6">
                    <label class="form-label-custom">Nombre</label>
                    <input type="text" class="form-control form-control-custom" value="${parts[0]}">
                </div>
                <div class="col-6">
                    <label class="form-label-custom">Apellido</label>
                    <input type="text" class="form-control form-control-custom" value="${parts[1] || ''}">
                </div>
                <div class="col-12">
                    <label class="form-label-custom">Email</label>
                    <input type="email" class="form-control form-control-custom" value="${name.toLowerCase().replace(' ', '.')}@ypservices.com">
                </div>
                <div class="col-12">
                    <label class="form-label-custom">Cargo</label>
                    <select class="form-select form-select-custom">
                        <option>Desarrollador Full Stack</option>
                        <option>Desarrollador Frontend</option>
                    </select>
                </div>
            </div>
        `;
    }

    function buildProjectEditHtml(name) {
        return `
            <div class="row g-3">
                <div class="col-12">
                    <label class="form-label-custom">Nombre</label>
                    <input type="text" class="form-control form-control-custom" value="${name}">
                </div>
                <div class="col-12">
                    <label class="form-label-custom">Cliente</label>
                    <select class="form-select form-select-custom">
                        <option>Juan Domínguez</option>
                        <option>María González</option>
                    </select>
                </div>
                <div class="col-6">
                    <label class="form-label-custom">Presupuesto</label>
                    <div class="input-group">
                        <span class="input-group-text input-group-text-custom">$</span>
                        <input type="number" class="form-control form-control-custom" value="8500">
                    </div>
                </div>
                <div class="col-6">
                    <label class="form-label-custom">Estado</label>
                    <select class="form-select form-select-custom">
                        <option>Pendiente</option>
                        <option selected>En Progreso</option>
                        <option>Completado</option>
                    </select>
                </div>
            </div>
        `;
    }

    /* ========================================
       DELETE MODAL
    ======================================== */

    /**
     * Abre el modal de confirmación de eliminación
     * @param {string} type - Tipo de entidad
     * @param {string} name - Nombre de la entidad
     */
    function openDeleteModal(type, name) {
        deleteItemType = type;
        deleteItemNameValue = name;
        document.getElementById('deleteItemName').textContent = `${type}: ${name}`;
        new bootstrap.Modal(document.getElementById('deleteModal')).show();
    }

    /**
     * Confirma la eliminación
     */
    function confirmDelete() {
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
        
        if (typeof Toast !== 'undefined') {
            Toast.success('Eliminado', `El ${deleteItemType} "${deleteItemNameValue}" ha sido eliminado.`);
        } else {
            showToast('success', 'Eliminado', `El ${deleteItemType} "${deleteItemNameValue}" ha sido eliminado.`);
        }
    }

    // Public API
    return {
        init: init,
        openPaymentModal: openPaymentModal,
        confirmPayment: confirmPayment,
        openViewModal: openViewModal,
        openEditModal: openEditModal,
        openDeleteModal: openDeleteModal,
        confirmDelete: confirmDelete
    };

})();

// Funciones globales para compatibilidad con HTML existente
function openPaymentModal(name, initials, role) {
    Modals.openPaymentModal(name, initials, role);
}

function confirmPayment() {
    Modals.confirmPayment();
}

function openViewModal(type, ...args) {
    Modals.openViewModal(type, ...args);
}

function openEditModal(type, name) {
    Modals.openEditModal(type, name);
}

function openDeleteModal(type, name) {
    Modals.openDeleteModal(type, name);
}

function confirmDelete() {
    Modals.confirmDelete();
}

// Auto-init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', Modals.init);
