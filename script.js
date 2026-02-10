// Import vehicle database
// Note: In production, you would import this. For now, we'll include it inline or via script tag

// Vehicle Database - This will be loaded from vehicles-data.js
let VEHICLE_DATABASE = [];
let selectedVehicle = null;

// Pricing calculation based on vehicle value
function calculatePrice(basePrice, vehicleValue) {
    // Base calculation: price scales with vehicle value 
    // Base reference: $20,000 vehicle = 1x multiplier
    const multiplier = vehicleValue / 20000;
    return Math.round(basePrice * multiplier);
}

function getPerformancePrice(vehicleValue, level) {
    // Performance pricing by level
    const basePrices = [200, 220, 240, 260, 280];
    const multiplier = vehicleValue / 100000;
    return Math.round(basePrices[level - 1] * multiplier * 100);
}

function getAestheticPrice(vehicleValue) {
    // Aesthetic items cost 0.5% of vehicle value
    return Math.round(vehicleValue * 0.005);
}

function getMaintenanceMultiplier(vehicleValue) {
    if (vehicleValue < 50000) return 1.5;
    if (vehicleValue < 100000) return 2.0;
    if (vehicleValue < 300000) return 2.5;
    return 3.5;
}

function getDadosPricing(vehicleValue) {
    if (vehicleValue < 50000) {
        return [200, 250, 300];
    } else if (vehicleValue < 100000) {
        return [250, 300, 350];
    } else {
        return [300, 350, 400];
    }
}

// State Management
let calculatorState = {
    aesthetic: 0,
    performance: 0,
    repair: 0,
    maintenance: 0,
    tuning: 0,
    discount: 0
};

// DOM Elements
const elements = {
    // Vehicle
    vehicleSelect: document.getElementById('vehicle-select'),
    vehicleCategory: document.getElementById('vehicle-category'),
    vehiclePrice: document.getElementById('vehicle-price'),

    // Aesthetic
    cosmetics: document.getElementById('cosmetics'),
    stance: document.getElementById('stance'),
    repaint: document.getElementById('repaint'),
    wheels: document.getElementById('wheels'),
    lights: document.getElementById('lights'),
    tires: document.getElementById('tires'),
    extras: document.getElementById('extras'),

    // Performance
    motorEnable: document.getElementById('motor-enable'),
    brakesEnable: document.getElementById('brakes-enable'),
    transmissionEnable: document.getElementById('transmission-enable'),
    suspensionEnable: document.getElementById('suspension-enable'),
    armorEnable: document.getElementById('armor-enable'),
    turboEnable: document.getElementById('turbo-enable'),

    // Repair
    repairAmount: document.getElementById('repair-amount'),
    towService: document.getElementById('tow-service'),

    // Maintenance
    maintSuspension: document.getElementById('maint-suspension'),
    maintTires: document.getElementById('maint-tires'),
    maintOil: document.getElementById('maint-oil'),
    maintClutch: document.getElementById('maint-clutch'),
    maintAirFilter: document.getElementById('maint-air-filter'),
    maintSparkPlugs: document.getElementById('maint-spark-plugs'),
    maintBrakePads: document.getElementById('maint-brake-pads'),

    // Tuning
    driftKit: document.getElementById('drift-kit'),
    tireType: document.getElementById('tire-type'),

    // Discount
    discount: document.getElementById('discount'),

    // Totals
    aestheticTotal: document.getElementById('aesthetic-total'),
    performanceTotal: document.getElementById('performance-total'),
    repairTotal: document.getElementById('repair-total'),
    maintenanceTotal: document.getElementById('maintenance-total'),
    tuningTotal: document.getElementById('tuning-total'),

    // Summary
    summaryAesthetic: document.getElementById('summary-aesthetic'),
    summaryPerformance: document.getElementById('summary-performance'),
    summaryRepair: document.getElementById('summary-repair'),
    summaryMaintenance: document.getElementById('summary-maintenance'),
    summaryTuning: document.getElementById('summary-tuning'),
    summarySubtotal: document.getElementById('summary-subtotal'),
    summaryDiscount: document.getElementById('summary-discount'),
    summaryTotal: document.getElementById('summary-total'),

    // Buttons
    resetBtn: document.getElementById('reset-btn'),
    printBtn: document.getElementById('print-btn')
};

// Load vehicle database from vehicles-data.js
async function loadVehicleDatabase() {
    try {
        // Try to load from external file
        const response = await fetch('vehicles-data.js');
        if (response.ok) {
            const script = document.createElement('script');
            script.src = 'vehicles-data.js';
            document.head.appendChild(script);
        }
    } catch (error) {
        console.log('Loading fallback vehicle data');
    }

    // Fallback vehicle data if external file not available
    if (!window.VEHICLE_DATABASE || window.VEHICLE_DATABASE.length === 0) {
        // Load inline vehicle data (same as vehicles-data.js)
        loadInlineVehicleData();
    }

    populateVehicleSelector();
}

function loadInlineVehicleData() {
    // This will be populated with the same data from vehicles-data.js
    window.VEHICLE_DATABASE = [
        // Compactos
        { name: "Blista", value: 8000, speed: "151 km/h", acceleration: "23%", seats: 2, category: "Compacto" },
        { name: "Brioso 300", value: 13000, speed: "119 km/h", acceleration: "18%", seats: 2, category: "Compacto" },
        { name: "Brioso 300 Widebody", value: 17000, speed: "134 km/h", acceleration: "22%", seats: 2, category: "Compacto" },
        { name: "Brioso R/A", value: 18000, speed: "150 km/h", acceleration: "29%", seats: 2, category: "Compacto" },
        { name: "Cheburek", value: 12000, speed: "161 km/h", acceleration: "26%", seats: 2, category: "Compacto" },
        { name: "Club", value: 20000, speed: "150 km/h", acceleration: "24%", seats: 2, category: "Compacto" },
        { name: "Dilettante", value: 9000, speed: "86 km/h", acceleration: "10%", seats: 4, category: "Compacto" },
        { name: "FR36", value: 56000, speed: "170 km/h", acceleration: "30%", seats: 2, category: "Compacto" },
        { name: "Issi", value: 10000, speed: "151 km/h", acceleration: "23%", seats: 2, category: "Compacto" },
        { name: "Issi Classic", value: 12000, speed: "143 km/h", acceleration: "26%", seats: 2, category: "Compacto" },
        { name: "Kanjo", value: 12000, speed: "160 km/h", acceleration: "32%", seats: 2, category: "Compacto" },
        { name: "Kanjo SJ", value: 18000, speed: "161 km/h", acceleration: "31%", seats: 2, category: "Compacto" },
        { name: "Michelli GT", value: 21000, speed: "160 km/h", acceleration: "28%", seats: 2, category: "Compacto" },
        { name: "Panto", value: 10000, speed: "147 km/h", acceleration: "27%", seats: 2, category: "Compacto" },
        { name: "Prairie", value: 12000, speed: "147 km/h", acceleration: "22%", seats: 2, category: "Compacto" },
        { name: "Rhapsody", value: 7000, speed: "149 km/h", acceleration: "23%", seats: 2, category: "Compacto" },
        { name: "Weevil", value: 11000, speed: "118 km/h", acceleration: "19%", seats: 2, category: "Compacto" },

        // Coupes
        { name: "Cognoscenti Cabrio", value: 55000, speed: "163 km/h", acceleration: "26%", seats: 2, category: "Coupe" },
        { name: "Exemplar", value: 32000, speed: "173 km/h", acceleration: "26%", seats: 4, category: "Coupe" },
        { name: "F620", value: 46000, speed: "173 km/h", acceleration: "24%", seats: 2, category: "Coupe" },
        { name: "Felon", value: 42000, speed: "165 km/h", acceleration: "24%", seats: 4, category: "Coupe" },
        { name: "Felon GT", value: 55000, speed: "156 km/h", acceleration: "24%", seats: 2, category: "Coupe" },
        { name: "Jackal", value: 38000, speed: "166 km/h", acceleration: "22%", seats: 4, category: "Coupe" },
        { name: "Oracle XS", value: 35000, speed: "166 km/h", acceleration: "27%", seats: 4, category: "Coupe" },
        { name: "Previon", value: 26000, speed: "169 km/h", acceleration: "32%", seats: 2, category: "Coupe" },
        { name: "Sentinel", value: 32000, speed: "164 km/h", acceleration: "21%", seats: 2, category: "Coupe" },
        { name: "Sentinel XS", value: 40000, speed: "164 km/h", acceleration: "21%", seats: 2, category: "Coupe" },
        { name: "Windsor", value: 95000, speed: "173 km/h", acceleration: "28%", seats: 2, category: "Coupe" },
        { name: "Windsor Drop", value: 125000, speed: "172 km/h", acceleration: "28%", seats: 2, category: "Coupe" },
        { name: "Zion", value: 36000, speed: "169 km/h", acceleration: "22%", seats: 2, category: "Coupe" },
        { name: "Zion Cabrio", value: 45000, speed: "169 km/h", acceleration: "22%", seats: 2, category: "Coupe" },

        // Motos
        { name: "Akuma", value: 120000, speed: "174 km/h", acceleration: "40%", seats: 2, category: "Moto" },
        { name: "Avarus", value: 18000, speed: "159 km/h", acceleration: "27%", seats: 1, category: "Moto" },
        { name: "Bagger", value: 13500, speed: "136 km/h", acceleration: "21%", seats: 2, category: "Moto" },
        { name: "Bati 801", value: 32000, speed: "177 km/h", acceleration: "30%", seats: 2, category: "Moto" },
        { name: "Bati 801RR", value: 49000, speed: "177 km/h", acceleration: "30%", seats: 2, category: "Moto" },
        { name: "BF400", value: 80000, speed: "159 km/h", acceleration: "29%", seats: 2, category: "Moto" },
        { name: "Carbon RS", value: 18000, speed: "169 km/h", acceleration: "30%", seats: 2, category: "Moto" },
        { name: "Chimera", value: 38000, speed: "133 km/h", acceleration: "29%", seats: 1, category: "Moto" },
        { name: "Cliffhanger", value: 9500, speed: "177 km/h", acceleration: "32%", seats: 2, category: "Moto" },

        // Muscle
        { name: "Blade", value: 15000, speed: "152 km/h", acceleration: "32%", seats: 2, category: "Muscle" },
        { name: "Broadway", value: 90000, speed: "135 km/h", acceleration: "19%", seats: 2, category: "Muscle" },
        { name: "Buccaneer", value: 18000, speed: "166 km/h", acceleration: "28%", seats: 2, category: "Muscle" },
        { name: "Buccaneer Custom", value: 24000, speed: "166 km/h", acceleration: "28%", seats: 2, category: "Muscle" },
        { name: "Buffalo EVX", value: 120000, speed: "180 km/h", acceleration: "38%", seats: 2, category: "Muscle" },
        { name: "Chino", value: 15000, speed: "127 km/h", acceleration: "20%", seats: 2, category: "Muscle" },
        { name: "Chino Custom", value: 19000, speed: "131 km/h", acceleration: "21%", seats: 2, category: "Muscle" },
        { name: "Clique", value: 20000, speed: "166 km/h", acceleration: "30%", seats: 2, category: "Muscle" },
        { name: "Coquette BlackFin", value: 55000, speed: "162 km/h", acceleration: "29%", seats: 2, category: "Muscle" },
        { name: "Deviant", value: 95000, speed: "153 km/h", acceleration: "29%", seats: 2, category: "Muscle" },
        { name: "Dominator", value: 35000, speed: "174 km/h", acceleration: "29%", seats: 2, category: "Muscle" },
        { name: "Dominator ASP", value: 70000, speed: "180 km/h", acceleration: "34%", seats: 2, category: "Muscle" },
        { name: "Dominator GT", value: 120000, speed: "179 km/h", acceleration: "34%", seats: 2, category: "Muscle" },
        { name: "Gauntlet", value: 30000, speed: "169 km/h", acceleration: "30%", seats: 2, category: "Muscle" },
        { name: "Gauntlet Hellfire", value: 90000, speed: "175 km/h", acceleration: "36%", seats: 2, category: "Muscle" },
    ];
}

// Populate vehicle selector with all vehicles from database
function populateVehicleSelector() {
    if (!window.VEHICLE_DATABASE) return;

    const select = elements.vehicleSelect;
    select.innerHTML = '<option value="">Seleccionar vehículo...</option>';

    // Group vehicles by category
    const categories = {};
    window.VEHICLE_DATABASE.forEach((vehicle, index) => {
        if (!categories[vehicle.category]) {
            categories[vehicle.category] = [];
        }
        categories[vehicle.category].push({ ...vehicle, index });
    });

    // Add vehicles grouped by category
    Object.keys(categories).sort().forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;

        categories[category].forEach(vehicle => {
            const option = document.createElement('option');
            option.value = vehicle.index;
            option.textContent = `${vehicle.name} - $${vehicle.value.toLocaleString()}`;
            optgroup.appendChild(option);
        });

        select.appendChild(optgroup);
    });
}

// Calculation Functions
function calculateAesthetic() {
    if (!selectedVehicle) return 0;

    const aestheticPrice = getAestheticPrice(selectedVehicle.value);
    let total = 0;

    total += parseInt(elements.cosmetics.value || 0) * aestheticPrice;
    total += elements.stance.checked ? aestheticPrice : 0;
    total += parseInt(elements.repaint.value || 0) * aestheticPrice;
    total += elements.wheels.checked ? aestheticPrice : 0;
    total += parseInt(elements.lights.value || 0) * aestheticPrice;
    total += elements.tires.checked ? aestheticPrice : 0;
    total += parseInt(elements.extras.value || 0) * aestheticPrice;

    return total;
}

function calculatePerformance() {
    if (!selectedVehicle) return 0;

    let total = 0;

    // Motor
    if (elements.motorEnable.checked) {
        const motorLevel = document.querySelector('input[name="motor"]:checked');
        if (motorLevel) {
            const price = getPerformancePrice(selectedVehicle.value, parseInt(motorLevel.value));
            total += price;
            document.getElementById('motor-price').textContent = `$${price.toLocaleString()}`;
        }
    } else {
        document.getElementById('motor-price').textContent = '$0';
    }

    // Brakes
    if (elements.brakesEnable.checked) {
        const brakesLevel = document.querySelector('input[name="brakes"]:checked');
        if (brakesLevel) {
            const price = getPerformancePrice(selectedVehicle.value, parseInt(brakesLevel.value));
            total += price;
            document.getElementById('brakes-price').textContent = `$${price.toLocaleString()}`;
        }
    } else {
        document.getElementById('brakes-price').textContent = '$0';
    }

    // Transmission
    if (elements.transmissionEnable.checked) {
        const transmissionLevel = document.querySelector('input[name="transmission"]:checked');
        if (transmissionLevel) {
            const price = getPerformancePrice(selectedVehicle.value, parseInt(transmissionLevel.value));
            total += price;
            document.getElementById('transmission-price').textContent = `$${price.toLocaleString()}`;
        }
    } else {
        document.getElementById('transmission-price').textContent = '$0';
    }

    // Suspension
    if (elements.suspensionEnable.checked) {
        const suspensionLevel = document.querySelector('input[name="suspension"]:checked');
        if (suspensionLevel) {
            const price = getPerformancePrice(selectedVehicle.value, parseInt(suspensionLevel.value));
            total += price;
            document.getElementById('suspension-price').textContent = `$${price.toLocaleString()}`;
        }
    } else {
        document.getElementById('suspension-price').textContent = '$0';
    }

    // Armor
    if (elements.armorEnable.checked) {
        const armorLevel = document.querySelector('input[name="armor"]:checked');
        if (armorLevel) {
            const price = getPerformancePrice(selectedVehicle.value, parseInt(armorLevel.value));
            total += price;
            document.getElementById('armor-price').textContent = `$${price.toLocaleString()}`;
        }
    } else {
        document.getElementById('armor-price').textContent = '$0';
    }

    // Turbo
    if (elements.turboEnable.checked) {
        const turboPrice = getPerformancePrice(selectedVehicle.value, 3) * 2; // Turbo costs ~2x level 3
        total += turboPrice;
    }

    return total;
}

function calculateRepair() {
    let total = 0;
    total += parseInt(elements.repairAmount.value || 0) * 0; // Repair is free in the excel
    total += elements.towService.checked ? 0 : 0; // Tow service is free
    return total;
}

function calculateMaintenance() {
    if (!selectedVehicle) return 0;

    const multiplier = getMaint enanceMultiplier(selectedVehicle.value);
    let total = 0;

    total += elements.maintSuspension.checked ? Math.round(200 * multiplier) : 0;
    total += elements.maintTires.checked ? Math.round(50 * multiplier) : 0;
    total += elements.maintOil.checked ? Math.round(20 * multiplier) : 0;
    total += elements.maintClutch.checked ? Math.round(100 * multiplier) : 0;
    total += elements.maintAirFilter.checked ? Math.round(10 * multiplier) : 0;
    total += elements.maintSparkPlugs.checked ? Math.round(50 * multiplier) : 0;
    total += elements.maintBrakePads.checked ? Math.round(30 * multiplier) : 0;

    return total;
}

function calculateTuning() {
    let total = 0;
    total += elements.driftKit.checked ? 0 : 0; // Free in excel
    total += elements.tireType.checked ? 0 : 0; // Free in excel
    return total;
}

function formatCurrency(amount) {
    return `$${Math.round(amount).toLocaleString()}`;
}

function updateTotals() {
    // Calculate all sections
    calculatorState.aesthetic = calculateAesthetic();
    calculatorState.performance = calculatePerformance();
    calculatorState.repair = calculateRepair();
    calculatorState.maintenance = calculateMaintenance();
    calculatorState.tuning = calculateTuning();

    // Update section totals
    elements.aestheticTotal.textContent = formatCurrency(calculatorState.aesthetic);
    elements.performanceTotal.textContent = formatCurrency(calculatorState.performance);
    elements.repairTotal.textContent = formatCurrency(calculatorState.repair);
    elements.maintenanceTotal.textContent = formatCurrency(calculatorState.maintenance);
    elements.tuningTotal.textContent = formatCurrency(calculatorState.tuning);

    // Calculate subtotal
    const subtotal = calculatorState.aesthetic + calculatorState.performance +
        calculatorState.repair + calculatorState.maintenance +
        calculatorState.tuning;

    // Calculate discount
    const discountPercent = parseFloat(elements.discount.value || 0);
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal - discountAmount;

    // Update summary
    elements.summaryAesthetic.textContent = formatCurrency(calculatorState.aesthetic);
    elements.summaryPerformance.textContent = formatCurrency(calculatorState.performance);
    elements.summaryRepair.textContent = formatCurrency(calculatorState.repair);
    elements.summaryMaintenance.textContent = formatCurrency(calculatorState.maintenance);
    elements.summaryTuning.textContent = formatCurrency(calculatorState.tuning);
    elements.summarySubtotal.textContent = formatCurrency(subtotal);
    elements.summaryDiscount.textContent = `-${formatCurrency(discountAmount)}`;
    elements.summaryTotal.textContent = formatCurrency(total);

    // Save to localStorage
    saveState();
}

// Vehicle Selection
function updateVehicleInfo() {
    const selectedIndex = elements.vehicleSelect.value;

    if (selectedIndex !== '' && window.VEHICLE_DATABASE) {
        selectedVehicle = window.VEHICLE_DATABASE[parseInt(selectedIndex)];
        elements.vehicleCategory.value = selectedVehicle.category;
        elements.vehiclePrice.value = `$${selectedVehicle.value.toLocaleString()}`;
    } else {
        selectedVehicle = null;
        elements.vehicleCategory.value = '';
        elements.vehiclePrice.value = '';
    }

    updateTotals();
    saveState();
}

// State Persistence
function saveState() {
    const state = {
        vehicle: elements.vehicleSelect.value,
        aesthetic: {
            cosmetics: elements.cosmetics.value,
            stance: elements.stance.checked,
            repaint: elements.repaint.value,
            wheels: elements.wheels.checked,
            lights: elements.lights.value,
            tires: elements.tires.checked,
            extras: elements.extras.value
        },
        performance: {
            motorEnable: elements.motorEnable.checked,
            motorLevel: document.querySelector('input[name="motor"]:checked')?.value,
            brakesEnable: elements.brakesEnable.checked,
            brakesLevel: document.querySelector('input[name="brakes"]:checked')?.value,
            transmissionEnable: elements.transmissionEnable.checked,
            transmissionLevel: document.querySelector('input[name="transmission"]:checked')?.value,
            suspensionEnable: elements.suspensionEnable.checked,
            suspensionLevel: document.querySelector('input[name="suspension"]:checked')?.value,
            armorEnable: elements.armorEnable.checked,
            armorLevel: document.querySelector('input[name="armor"]:checked')?.value,
            turboEnable: elements.turboEnable.checked
        },
        repair: {
            amount: elements.repairAmount.value,
            towService: elements.towService.checked
        },
        maintenance: {
            suspension: elements.maintSuspension.checked,
            tires: elements.maintTires.checked,
            oil: elements.maintOil.checked,
            clutch: elements.maintClutch.checked,
            airFilter: elements.maintAirFilter.checked,
            sparkPlugs: elements.maintSparkPlugs.checked,
            brakePads: elements.maintBrakePads.checked
        },
        tuning: {
            driftKit: elements.driftKit.checked,
            tireType: elements.tireType.checked
        },
        discount: elements.discount.value
    };

    localStorage.setItem('autoExoticCalculator', JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem('autoExoticCalculator');

    if (!savedState) return;

    try {
        const state = JSON.parse(savedState);

        // Restore vehicle
        if (state.vehicle) {
            elements.vehicleSelect.value = state.vehicle;
            updateVehicleInfo();
        }

        // Restore aesthetic
        if (state.aesthetic) {
            elements.cosmetics.value = state.aesthetic.cosmetics || 0;
            elements.stance.checked = state.aesthetic.stance || false;
            elements.repaint.value = state.aesthetic.repaint || 0;
            elements.wheels.checked = state.aesthetic.wheels || false;
            elements.lights.value = state.aesthetic.lights || 0;
            elements.tires.checked = state.aesthetic.tires || false;
            elements.extras.value = state.aesthetic.extras || 0;
        }

        // Restore performance
        if (state.performance) {
            elements.motorEnable.checked = state.performance.motorEnable || false;
            if (state.performance.motorLevel) {
                const motorRadio = document.querySelector(`input[name="motor"][value="${state.performance.motorLevel}"]`);
                if (motorRadio) motorRadio.checked = true;
            }

            elements.brakesEnable.checked = state.performance.brakesEnable || false;
            if (state.performance.brakesLevel) {
                const brakesRadio = document.querySelector(`input[name="brakes"][value="${state.performance.brakesLevel}"]`);
                if (brakesRadio) brakesRadio.checked = true;
            }

            elements.transmissionEnable.checked = state.performance.transmissionEnable || false;
            if (state.performance.transmissionLevel) {
                const transmissionRadio = document.querySelector(`input[name="transmission"][value="${state.performance.transmissionLevel}"]`);
                if (transmissionRadio) transmissionRadio.checked = true;
            }

            elements.suspensionEnable.checked = state.performance.suspensionEnable || false;
            if (state.performance.suspensionLevel) {
                const suspensionRadio = document.querySelector(`input[name="suspension"][value="${state.performance.suspensionLevel}"]`);
                if (suspensionRadio) suspensionRadio.checked = true;
            }

            elements.armorEnable.checked = state.performance.armorEnable || false;
            if (state.performance.armorLevel) {
                const armorRadio = document.querySelector(`input[name="armor"][value="${state.performance.armorLevel}"]`);
                if (armorRadio) armorRadio.checked = true;
            }

            elements.turboEnable.checked = state.performance.turboEnable || false;
        }

        // Restore repair
        if (state.repair) {
            elements.repairAmount.value = state.repair.amount || 0;
            elements.towService.checked = state.repair.towService || false;
        }

        // Restore maintenance
        if (state.maintenance) {
            elements.maintSuspension.checked = state.maintenance.suspension || false;
            elements.maintTires.checked = state.maintenance.tires || false;
            elements.maintOil.checked = state.maintenance.oil || false;
            elements.maintClutch.checked = state.maintenance.clutch || false;
            elements.maintAirFilter.checked = state.maintenance.airFilter || false;
            elements.maintSparkPlugs.checked = state.maintenance.sparkPlugs || false;
            elements.maintBrakePads.checked = state.maintenance.brakePads || false;
        }

        // Restore tuning
        if (state.tuning) {
            elements.driftKit.checked = state.tuning.driftKit || false;
            elements.tireType.checked = state.tuning.tireType || false;
        }

        // Restore discount
        if (state.discount) {
            elements.discount.value = state.discount;
        }

        updateTotals();
    } catch (error) {
        console.error('Error loading state:', error);
    }
}

function resetCalculator() {
    if (!confirm('¿Estás seguro de que quieres reiniciar la calculadora?')) {
        return;
    }

    // Clear localStorage
    localStorage.removeItem('autoExoticCalculator');

    // Reset all form fields
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
    document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        if (input.value === '5') {
            input.checked = true;
        }
    });
    elements.vehicleSelect.value = '';
    elements.vehicleCategory.value = '';
    elements.vehiclePrice.value = '';
    selectedVehicle = null;

    updateTotals();
}

function printSummary() {
    window.print();
}

// Event Listeners
function setupEventListeners() {
    // Vehicle
    elements.vehicleSelect.addEventListener('change', updateVehicleInfo);

    // Aesthetic
    elements.cosmetics.addEventListener('input', updateTotals);
    elements.stance.addEventListener('change', updateTotals);
    elements.repaint.addEventListener('input', updateTotals);
    elements.wheels.addEventListener('change', updateTotals);
    elements.lights.addEventListener('input', updateTotals);
    elements.tires.addEventListener('change', updateTotals);
    elements.extras.addEventListener('input', updateTotals);

    // Performance
    elements.motorEnable.addEventListener('change', updateTotals);
    elements.brakesEnable.addEventListener('change', updateTotals);
    elements.transmissionEnable.addEventListener('change', updateTotals);
    elements.suspensionEnable.addEventListener('change', updateTotals);
    elements.armorEnable.addEventListener('change', updateTotals);
    elements.turboEnable.addEventListener('change', updateTotals);

    // Performance levels
    document.querySelectorAll('input[name="motor"]').forEach(radio => {
        radio.addEventListener('change', updateTotals);
    });
    document.querySelectorAll('input[name="brakes"]').forEach(radio => {
        radio.addEventListener('change', updateTotals);
    });
    document.querySelectorAll('input[name="transmission"]').forEach(radio => {
        radio.addEventListener('change', updateTotals);
    });
    document.querySelectorAll('input[name="suspension"]').forEach(radio => {
        radio.addEventListener('change', updateTotals);
    });
    document.querySelectorAll('input[name="armor"]').forEach(radio => {
        radio.addEventListener('change', updateTotals);
    });

    // Repair
    elements.repairAmount.addEventListener('input', updateTotals);
    elements.towService.addEventListener('change', updateTotals);

    // Maintenance
    elements.maintSuspension.addEventListener('change', updateTotals);
    elements.maintTires.addEventListener('change', updateTotals);
    elements.maintOil.addEventListener('change', updateTotals);
    elements.maintClutch.addEventListener('change', updateTotals);
    elements.maintAirFilter.addEventListener('change', updateTotals);
    elements.maintSparkPlugs.addEventListener('change', updateTotals);
    elements.maintBrakePads.addEventListener('change', updateTotals);

    // Tuning
    elements.driftKit.addEventListener('change', updateTotals);
    elements.tireType.addEventListener('change', updateTotals);

    // Discount
    elements.discount.addEventListener('input', updateTotals);

    // Buttons
    elements.resetBtn.addEventListener('click', resetCalculator);
    elements.printBtn.addEventListener('click', printSummary);
}

// Initialize
async function init() {
    await loadVehicleDatabase();
    setupEventListeners();
    loadState();
    updateTotals();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
