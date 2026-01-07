/**
 * YPServicesERP - Charts Module
 * Configuración e inicialización de gráficos con Chart.js
 * @version 1.0.0
 */

const Charts = (function() {
    'use strict';

    // Colores del tema
    const COLORS = {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6'
    };

    // Instancias de gráficos
    let chartInstances = {};

    /**
     * Inicializa todos los gráficos
     */
    function init() {
        // Configurar fuente por defecto
        Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

        // Inicializar gráficos
        initRevenueChart();
        initProjectsChart();
        initProfitabilityChart();
        initEvolutionChart();
    }

    /**
     * Gráfico de ingresos por proyecto (Dashboard)
     */
    function initRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        chartInstances.revenue = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['E-commerce', 'Apps', 'Sistemas', 'Diseño', 'Landing'],
                datasets: [{
                    label: 'Ingresos',
                    data: [18500, 22000, 15000, 8500, 4850],
                    backgroundColor: [
                        COLORS.primary,
                        COLORS.secondary,
                        COLORS.info,
                        COLORS.success,
                        COLORS.warning
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            callback: value => '$' + (value / 1000) + 'k'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    /**
     * Gráfico de estado de proyectos (Dashboard)
     */
    function initProjectsChart() {
        const ctx = document.getElementById('projectsChart');
        if (!ctx) return;

        chartInstances.projects = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['En Progreso', 'Completados', 'Pendientes'],
                datasets: [{
                    data: [8, 13, 3],
                    backgroundColor: [
                        COLORS.info,
                        COLORS.success,
                        COLORS.warning
                    ],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    /**
     * Gráfico de rentabilidad (Reportes)
     */
    function initProfitabilityChart() {
        const ctx = document.getElementById('profitabilityChart');
        if (!ctx) return;

        chartInstances.profitability = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'Ingresos',
                        data: [12000, 15000, 18000, 14000, 22000, 19000, 25000, 21000, 24000, 20000, 28000, 24500],
                        backgroundColor: COLORS.success,
                        borderRadius: 4
                    },
                    {
                        label: 'Costos',
                        data: [5000, 6000, 7500, 6000, 9000, 8000, 10000, 9000, 10000, 8500, 11000, 9500],
                        backgroundColor: COLORS.danger,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + (value / 1000) + 'k'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    /**
     * Gráfico de evolución (Reportes)
     */
    function initEvolutionChart() {
        const ctx = document.getElementById('evolutionChart');
        if (!ctx) return;

        chartInstances.evolution = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Saldo',
                    data: [7000, 16000, 26500, 34500, 47500, 58500, 73500, 85500, 99500, 111000, 128000, 143000],
                    borderColor: COLORS.primary,
                    backgroundColor: 'rgba(99,102,241,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: COLORS.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + (value / 1000) + 'k'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    /**
     * Actualiza los datos de un gráfico
     * @param {string} chartName - Nombre del gráfico
     * @param {Array} data - Nuevos datos
     * @param {Array} labels - Nuevas etiquetas (opcional)
     */
    function updateChart(chartName, data, labels = null) {
        const chart = chartInstances[chartName];
        if (!chart) return;

        if (labels) {
            chart.data.labels = labels;
        }
        chart.data.datasets[0].data = data;
        chart.update();
    }

    /**
     * Destruye un gráfico
     * @param {string} chartName - Nombre del gráfico
     */
    function destroyChart(chartName) {
        if (chartInstances[chartName]) {
            chartInstances[chartName].destroy();
            delete chartInstances[chartName];
        }
    }

    /**
     * Destruye todos los gráficos
     */
    function destroyAll() {
        Object.keys(chartInstances).forEach(key => {
            chartInstances[key].destroy();
        });
        chartInstances = {};
    }

    /**
     * Obtiene una instancia de gráfico
     * @param {string} chartName - Nombre del gráfico
     * @returns {Chart|null}
     */
    function getChart(chartName) {
        return chartInstances[chartName] || null;
    }

    // Public API
    return {
        init: init,
        updateChart: updateChart,
        destroyChart: destroyChart,
        destroyAll: destroyAll,
        getChart: getChart,
        COLORS: COLORS
    };

})();

// Auto-init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', Charts.init);
