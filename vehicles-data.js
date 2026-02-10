// IMPORTANT: This file will be generated from the spreadsheet data
// Vehicle database with pricing based on vehicle value
// Formula: Each modification price = vehicle_value * multiplier

const VEHICLE_DATABASE = [
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
    { name: "Daemon (Custom)", value: 13500, speed: "156 km/h", acceleration: "26%", seats: 2, category: "Moto" },
    { name: "Daemon (Lost MC)", value: 11500, speed: "155 km/h", acceleration: "26%", seats: 2, category: "Moto" },
    { name: "Defiler", value: 9800, speed: "176 km/h", acceleration: "41%", seats: 1, category: "Moto" },
    { name: "Diabolus", value: 90000, speed: "170 km/h", acceleration: "31%", seats: 1, category: "Moto" },
    { name: "Diabolus Custom", value: 100000, speed: "171 km/h", acceleration: "32%", seats: 1, category: "Moto" },
    { name: "Double T", value: 80000, speed: "173 km/h", acceleration: "31%", seats: 2, category: "Moto" },
    { name: "Enduro", value: 5500, speed: "143 km/h", acceleration: "30%", seats: 2, category: "Moto" },
    { name: "Esskey", value: 4200, speed: "159 km/h", acceleration: "29%", seats: 2, category: "Moto" },
    { name: "Faggio", value: 2800, speed: "85 km/h", acceleration: "10%", seats: 1, category: "Moto" },
    { name: "Faggio Mod", value: 3000, speed: "99 km/h", acceleration: "19%", seats: 1, category: "Moto" },
    { name: "Faggio Sport", value: 2500, speed: "102 km/h", acceleration: "20%", seats: 2, category: "Moto" },
    { name: "FCR 1000", value: 50000, speed: "167 km/h", acceleration: "31%", seats: 1, category: "Moto" },
    { name: "FCR 1000 Custom", value: 70000, speed: "168 km/h", acceleration: "31%", seats: 1, category: "Moto" },
    { name: "Gargoyle", value: 16500, speed: "174 km/h", acceleration: "31%", seats: 2, category: "Moto" },
    { name: "Hakuchou", value: 85000, speed: "178 km/h", acceleration: "31%", seats: 2, category: "Moto" },
    { name: "Hakuchou Drag", value: 95000, speed: "187 km/h", acceleration: "43%", seats: 2, category: "Moto" },
    { name: "Hexer", value: 12000, speed: "155 km/h", acceleration: "26%", seats: 2, category: "Moto" },
    { name: "Innovation", value: 23500, speed: "162 km/h", acceleration: "32%", seats: 2, category: "Moto" },
    { name: "Manchez", value: 13000, speed: "159 km/h", acceleration: "29%", seats: 2, category: "Moto" },
    { name: "Manchez Scout", value: 25000, speed: "150 km/h", acceleration: "27%", seats: 1, category: "Moto" },
    { name: "Nemesis", value: 11000, speed: "162 km/h", acceleration: "30%", seats: 2, category: "Moto" },
    { name: "Nightblade", value: 25000, speed: "169 km/h", acceleration: "31%", seats: 2, category: "Moto" },
    { name: "PCJ-600", value: 10000, speed: "143 km/h", acceleration: "26%", seats: 2, category: "Moto" },
    { name: "Powersurge", value: 500000, speed: "154 km/h", acceleration: "82%", seats: 1, category: "Moto" },
    { name: "RatBike", value: 3000, speed: "133 km/h", acceleration: "22%", seats: 2, category: "Moto" },
    { name: "Reever", value: 43000, speed: "180 km/h", acceleration: "41%", seats: 1, category: "Moto" },
    { name: "Ruffian", value: 7800, speed: "168 km/h", acceleration: "34%", seats: 2, category: "Moto" },
    { name: "Sanchez", value: 40000, speed: "142 km/h", acceleration: "33%", seats: 2, category: "Moto" },
    { name: "Sanchez (Livery)", value: 32000, speed: "142 km/h", acceleration: "33%", seats: 2, category: "Moto" },
    { name: "Sanctus", value: 45000, speed: "167 km/h", acceleration: "41%", seats: 1, category: "Moto" },
    { name: "Shinobi", value: 110000, speed: "188 km/h", acceleration: "36%", seats: 1, category: "Moto" },
    { name: "Sovereign", value: 22000, speed: "159 km/h", acceleration: "27%", seats: 1, category: "Moto" },
    { name: "Thrust", value: 24000, speed: "178 km/h", acceleration: "26%", seats: 2, category: "Moto" },
    { name: "Vader", value: 7200, speed: "152 km/h", acceleration: "27%", seats: 2, category: "Moto" },
    { name: "Vortex", value: 9800, speed: "176 km/h", acceleration: "40%", seats: 1, category: "Moto" },
    { name: "Wolfsbane", value: 9000, speed: "133 km/h", acceleration: "22%", seats: 2, category: "Moto" },
    { name: "Zombie Bobber", value: 9500, speed: "161 km/h", acceleration: "29%", seats: 1, category: "Moto" },
    { name: "Zombie Chopper", value: 12000, speed: "161 km/h", acceleration: "29%", seats: 2, category: "Moto" },

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
    { name: "Dominator FX", value: 55000, speed: "177 km/h", acceleration: "30%", seats: 2, category: "Muscle" },
    { name: "Dominator GT", value: 120000, speed: "179 km/h", acceleration: "34%", seats: 2, category: "Muscle" },
    { name: "Dominator GTT", value: 50000, speed: "165 km/h", acceleration: "30%", seats: 2, category: "Muscle" },
    { name: "Dominator GTX", value: 67000, speed: "170 km/h", acceleration: "34%", seats: 2, category: "Muscle" },
    { name: "Drift Yosemite", value: 55000, speed: "160 km/h", acceleration: "40%", seats: 2, category: "Muscle" },
    { name: "Dukes", value: 28000, speed: "172 km/h", acceleration: "32%", seats: 2, category: "Muscle" },
    { name: "Faction", value: 20000, speed: "168 km/h", acceleration: "28%", seats: 2, category: "Muscle" },
    { name: "Faction Custom", value: 30000, speed: "168 km/h", acceleration: "28%", seats: 2, category: "Muscle" },
    { name: "Faction Custom Donk", value: 40000, speed: "127 km/h", acceleration: "20%", seats: 2, category: "Muscle" },
    { name: "Gauntlet", value: 30000, speed: "169 km/h", acceleration: "30%", seats: 2, category: "Muscle" },
    { name: "Gauntlet Classic", value: 32000, speed: "159 km/h", acceleration: "28%", seats: 2, category: "Muscle" },
    { name: "Gauntlet Classic Custom", value: 120000, speed: "174 km/h", acceleration: "29%", seats: 2, category: "Muscle" },
    { name: "Gauntlet Hellfire", value: 90000, speed: "175 km/h", acceleration: "36%", seats: 2, category: "Muscle" },
    { name: "Glendale Custom", value: 45000, speed: "143 km/h", acceleration: "23%", seats: 4, category: "Muscle" },
    { name: "Greenwood", value: 7000, speed: "172 km/h", acceleration: "28%", seats: 4, category: "Muscle" },
    { name: "Hermes", value: 120000, speed: "149 km/h", acceleration: "28%", seats: 2, category: "Muscle" },
    { name: "Hotknife", value: 125000, speed: "162 km/h", acceleration: "30%", seats: 2, category: "Muscle" },
    { name: "Hotring Hellfire", value: 130000, speed: "176 km/h", acceleration: "37%", seats: 2, category: "Muscle" },
];

// Pricing calculation functions
function calculatePerformancePrice(vehicleValue, level) {
    // Performance prices by level: 1=200, 2=220, 3=240, 4=260, 5=280 for base $100,000 vehicle
    // Formula: (vehicleValue / 100000) * baseprice
    const basePrices = { 1: 200, 2: 220, 3: 240, 4: 260, 5: 280 };
    const multiplier = vehicleValue / 100;
    return Math.round(basePrices[level] * (vehicleValue / 100000) * 100);
}

function calculateAestheticPrice(vehicleValue) {
    // Aesthetic prices are typically 0.5% of vehicle value (100 for 20,000 vehicle)
    return Math.round(vehicleValue * 0.005);
}

function calculateMaintenanceMultiplier(vehicleValue) {
    // Maintenance multiplier based on vehicle tier
    if (vehicleValue < 50000) return 1.5;
    if (vehicleValue < 100000) return 2.0;
    if (vehicleValue < 300000) return 2.5;
    return 3.5;
}

function getDadosPricing(vehicleValue) {
    // Dados pricing tiers based on vehicle value
    if (vehicleValue < 50000) {
        return { tier1: 200, tier2: 250, tier3: 300 };
    } else if (vehicleValue < 100000) {
        return { tier1: 250, tier2: 300, tier3: 350 };
    } else {
        return { tier1: 300, tier2: 350, tier3: 400 };
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VEHICLE_DATABASE,
        calculatePerformancePrice,
        calculateAestheticPrice,
        calculateMaintenanceMultiplier,
        getDadosPricing
    };
}
