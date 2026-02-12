// AUTO EXOTIC - CALCULADORA DE PRECIOS V2
// Updated with: Autocomplete, Fixed Performance Selection, Exact Prices, Discounts

// Database will be loaded from vehicles-data.js
let VEHICLE_DATABASE = [];
let selectedVehicle = null;

// DOM Elements
const elements = {
    // Vehicle search
    vehicleSearch: null,
    vehicleSelect: null,
    vehicleDropdown: null,
    vehicleCategory: null,
    vehiclePrice: null,

    // Performance upgrades
    perfMotor: null,
    perfTransmision: null,
    perfFreno: null,
    perfSuspension: null,
    perfTurbo: null,

    // Aesthetics
    cosmetics: null,
    stance: null,
    repaint: null,
    wheels: null,
    lights: null,
    tires: null,
    extras: null,

    // Maintenance
    maintSuspension: null,
    maintMotor: null,
    maintTransmision: null,
    maintFreno: null,

    // Discount
    discount: null,

    // Totals
    performanceTotal: null,
    estheticsTotal: null,
    maintenanceTotal: null,
    tuningTotal: null,
    finalTotal: null
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    loadVehicleDatabase();
    setupEventListeners();
    calculateAll();
});

function initializeElements() {
    // Vehicle search
    elements.vehicleSearch = document.getElementById('vehicle-search');
    elements.vehicleSelect = document.getElementById('vehicle-select');
    elements.vehicleDropdown = document.getElementById('vehicle-dropdown');
    elements.vehicleCategory = document.getElementById('vehicle-category');
    elements.vehiclePrice = document.getElementById('vehicle-price');

    // Discount
    elements.discount = document.getElementById('discount');

    // Totals
    elements.performanceTotal = document.getElementById('performance-total');
    elements.estheticsTotal = document.getElementById('esthetics-total');
    elements.maintenanceTotal = document.getElementById('maintenance-total');
    elements.tuningTotal = document.getElementById('tuning-total');
    elements.finalTotal = document.getElementById('final-total');
}

function loadVehicleDatabase() {
    // Load from vehicles-data.js if available, otherwise use sample data
    if (typeof VEHICLE_DATABASE !== 'undefined' && VEHICLE_DATABASE.length > 0) {
        console.log(`Loaded ${VEHICLE_DATABASE.length} vehicles from database`);
    } else {
        // Sample data (will be replaced by full database)
        VEHICLE_DATABASE = getSampleVehicles();
        console.log(`Using sample database with ${VEHICLE_DATABASE.length} vehicles`);
    }
}

function getSampleVehicles() {
    return [
        { name: "Blista", value: 8000, category: "Compacto", perf: [80, 88, 96, 104, 112], cosmetics: 40, stance: 40, repaint: 40, wheels: 40, lights: 40, tires: 40, extras: 40, dados: [200, 250, 300], maint: 1.5 },
        { name: "Brioso 300", value: 13000, category: "Compacto", perf: [130, 143, 156, 169, 182], cosmetics: 65, stance: 65, repaint: 65, wheels: 65, lights: 65, tires: 65, extras: 65, dados: [200, 250, 300], maint: 1.5 },
        { name: "Buffalo S", value: 20000, category: "Sport", perf: [200, 220, 240, 260, 280], cosmetics: 100, stance: 100, repaint: 100, wheels: 100, lights: 100, tires: 100, extras: 100, dados: [200, 250, 300], maint: 1.5 },
        { name: "Dominator", value: 35000, category: "Muscle", perf: [350, 385, 420, 455, 490], cosmetics: 175, stance: 175, repaint: 175, wheels: 175, lights: 175, tires: 175, extras: 175, dados: [200, 250, 300], maint: 1.5 },
        { name: "Elegy RH8", value: 38500, category: "Sport", perf: [385, 424, 462, 501, 539], cosmetics: 193, stance: 193, repaint: 193, wheels: 193, lights: 193, tires: 193, extras: 193, dados: [200, 250, 300], maint: 1.5 },
    ];
}

function setupEventListeners() {
    // Vehicle autocomplete
    if (elements.vehicleSearch) {
        elements.vehicleSearch.addEventListener('input', handleVehicleSearch);
        elements.vehicleSearch.addEventListener('focus', handleVehicleSearch);

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.vehicleSearch.contains(e.target) && !elements.vehicleDropdown.contains(e.target)) {
                elements.vehicleDropdown.style.display = 'none';
            }
        });
    }

    // Discount input
    if (elements.discount) {
        elements.discount.addEventListener('input', calculateAll);
    }

    // All checkboxes and inputs
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => {
        el.addEventListener('change', calculateAll);
    });
}

// Autocomplete functionality
function handleVehicleSearch(e) {
    const query = e.target.value.toLowerCase();

    if (query.length === 0) {
        elements.vehicleDropdown.style.display = 'none';
        return;
    }

    // Filter vehicles
    const filtered = VEHICLE_DATABASE.filter(v =>
        v.name.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query)
    ).slice(0, 10); // Limit to 10 results

    if (filtered.length === 0) {
        elements.vehicleDropdown.style.display = 'none';
        return;
    }

    // Build dropdown HTML
    const html = filtered.map(v => `
        <div class="autocomplete-item" onclick="selectVehicle('${v.name}')">
            <div>
                <div class="autocomplete-item-name">${v.name}</div>
                <div class="autocomplete-item-category">${v.category}</div>
            </div>
            <div class="autocomplete-item-value">$${v.value.toLocaleString()}</div>
        </div>
    `).join('');

    elements.vehicleDropdown.innerHTML = html;
    elements.vehicleDropdown.style.display = 'block';
}

function selectVehicle(vehicleName) {
    const vehicle = VEHICLE_DATABASE.find(v => v.name === vehicleName);
    if (!vehicle) return;

    selectedVehicle = vehicle;

    // Update UI
    elements.vehicleSearch.value = vehicle.name;
    elements.vehicleSelect.value = vehicle.name;
    elements.vehicleCategory.value = vehicle.category;
    elements.vehiclePrice.value = `$${vehicle.value.toLocaleString()}`;

    // Hide dropdown
    elements.vehicleDropdown.style.display = 'none';

    // Recalculate
    calculateAll();
}

// Discount preset functions
function setDiscount(percent) {
    if (elements.discount) {
        elements.discount.value = percent;
        calculateAll();
    }
}

// Calculation functions
function calculatePerformance() {
    if (!selectedVehicle) return 0;

    let total = 0;

    // Check each performance upgrade
    const upgrades = ['perfMotor', 'perfTransmision', 'perfFreno', 'perfSuspension', 'perfTurbo'];

    upgrades.forEach(upgradeId => {
        const checkbox = document.getElementById(upgradeId);
        if (checkbox && checkbox.checked) {
            // Find selected level
            const levelInputs = document.querySelectorAll(`input[name="${upgradeId}-level"]:checked`);
            if (levelInputs.length > 0) {
                const level = parseInt(levelInputs[0].value);
                if (level >= 1 && level <= 5 && selectedVehicle.perf[level - 1]) {
                    total += selectedVehicle.perf[level - 1];
                }
            }
        }
    });

    return total;
}

function calculateEsthetics() {
    if (!selectedVehicle) return 0;

    let total = 0;

    const items = ['cosmetics', 'stance', 'repaint', 'wheels', 'lights', 'tires', 'extras'];

    items.forEach(item => {
        const checkbox = document.getElementById(item);
        if (checkbox && checkbox.checked && selectedVehicle[item]) {
            total += selectedVehicle[item];
        }
    });

    return total;
}

function calculateMaintenance() {
    if (!selectedVehicle) return 0;

    const multiplier = selectedVehicle.maint || 1.5;
    let total = 0;

    const items = [
        { id: 'maint-suspension', cost: 200 },
        { id: 'maint-motor', cost: 200 },
        { id: 'maint-transmision', cost: 200 },
        { id: 'maint-freno', cost: 200 }
    ];

    items.forEach(item => {
        const checkbox = document.getElementById(item.id);
        if (checkbox && checkbox.checked) {
            total += Math.round(item.cost * multiplier);
        }
    });

    return total;
}

function calculateRepairs() {
    let total = 0;

    // Repair: $400, Tow: $200
    const repairCheckbox = document.getElementById('repair');
    if (repairCheckbox && repairCheckbox.checked) {
        total += 400;
    }

    const towCheckbox = document.getElementById('tow');
    if (towCheckbox && towCheckbox.checked) {
        total += 200;
    }

    return total;
}

function calculateAll() {
    // Calculate each section
    const performance = calculatePerformance();
    const esthetics = calculateEsthetics();
    const maintenance = calculateMaintenance();
    const repairs = calculateRepairs();

    // Update section totals
    if (elements.performanceTotal) {
        elements.performanceTotal.textContent = `$${performance.toLocaleString()}`;
    }
    if (elements.estheticsTotal) {
        elements.estheticsTotal.textContent = `$${esthetics.toLocaleString()}`;
    }
    if (elements.maintenanceTotal) {
        elements.maintenanceTotal.textContent = `$${maintenance.toLocaleString()}`;
    }

    // Calculate subtotal
    const subtotal = performance + esthetics + maintenance + repairs;

    // Apply discount
    const discountPercent = parseFloat(elements.discount.value) || 0;
    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discountAmount;

    // Update summary section
    updateSummary(performance, esthetics, maintenance, repairs, subtotal, discountAmount, total);
}

function updateSummary(performance, esthetics, maintenance, repairs, subtotal, discountAmount, total) {
    document.getElementById('summary-performance').textContent = `$${performance.toLocaleString()}`;
    document.getElementById('summary-esthetics').textContent = `$${esthetics.toLocaleString()}`;
    document.getElementById('summary-maintenance').textContent = `$${maintenance.toLocaleString()}`;
    document.getElementById('summary-repairs').textContent = `$${repairs.toLocaleString()}`;
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('summary-discount').textContent = `-$${discountAmount.toLocaleString()}`;
    document.getElementById('summary-total').textContent = `$${total.toLocaleString()}`;

    if (elements.finalTotal) {
        elements.finalTotal.textContent = `$${total.toLocaleString()}`;
    }
}

// Reset function
function resetCalculator() {
    // Reset vehicle selection
    selectedVehicle = null;
    if (elements.vehicleSearch) elements.vehicleSearch.value = '';
    if (elements.vehicleSelect) elements.vehicleSelect.value = '';
    if (elements.vehicleCategory) elements.vehicleCategory.value = '';
    if (elements.vehiclePrice) elements.vehiclePrice.value = '';

    // Reset all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);

    // Reset discount
    if (elements.discount) elements.discount.value = 0;

    // Recalculate
    calculateAll();
}

// Print function
function printQuote() {
    window.print();
}

// Make functions global for onclick handlers
window.selectVehicle = selectVehicle;
window.setDiscount = setDiscount;
window.resetCalculator = resetCalculator;
window.printQuote = printQuote;
window.calculateAll = calculateAll;
