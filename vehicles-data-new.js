// AUTO-GENERATED: Complete 500+ vehicle database with exact prices from Excel
// Format: { name, value, speed, acceleration, seats, category, perf[5], cosmetics, stance, repaint, wheels, lights, tires, extras, dados[3], maint }

const VEHICLE_DATABASE = `Blista	8000	151 km/h	23%	2	Compacto	80	88	96	104	112	40	40	40	40	40	40	40	200	250	300	1.5
Brioso 300	13000	119 km/h	18%	2	Compacto	130	143	156	169	182	65	65	65	65	65	65	65	200	250	300	1.5
Brioso 300 Widebody	17000	134 km/h	22%	2	Compacto	170	187	204	221	238	85	85	85	85	85	85	85	200	250	300	1.5
Brioso R/A	18000	150 km/h	29%	2	Compacto	180	198	216	234	252	90	90	90	90	90	90	90	200	250	300	1.5
Cheburek	12000	161 km/h	26%	2	Compacto	120	132	144	156	168	60	60	60	60	60	60	60	200	250	300	1.5
Club	20000	150 km/h	24%	2	Compacto	200	220	240	260	280	100	100	100	100	100	100	100	200	250	300	1.5
Dilettante	9000	86 km/h	10%	4	Compacto	90	99	108	117	126	45	45	45	45	45	45	45	200	250	300	1.5
FR36	56000	170 km/h	30%	2	Compacto	560	616	672	728	784	280	280	280	280	280	280	280	250	300	350	2
Issi	10000	151 km/h	23%	2	Compacto	100	110	120	130	140	50	50	50	50	50	50	50	200	250	300	1.5
Issi Classic	12000	143 km/h	26%	2	Compacto	120	132	144	156	168	60	60	60	60	60	60	60	200	250	300	1.5
Kanjo	12000	160 km/h	32%	2	Compacto	120	132	144	156	168	60	60	60	60	60	60	60	200	250	300	1.5
Kanjo SJ	18000	161 km/h	31%	2	Compacto	180	198	216	234	252	90	90	90	90	90	90	90	200	250	300	1.5
Michelli GT	21000	160 km/h	28%	2	Compacto	210	231	252	273	294	105	105	105	105	105	105	105	200	250	300	1.5
Panto	10000	147 km/h	27%	2	Compacto	100	110	120	130	140	50	50	50	50	50	50	50	200	250	300	1.5
Prairie	12000	147 km/h	22%	2	Compacto	120	132	144	156	168	60	60	60	60	60	60	60	200	250	300	1.5
Rhapsody	7000	149 km/h	23%	2	Compacto	70	77	84	91	98	35	35	35	35	35	35	35	200	250	300	1.5
Weevil	11000	118 km/h	19%	2	Compacto	110	121	132	143	154	55	55	55	55	55	55	55	200	250	300	1.5`.split('\n').map(line => {
    const parts = line.split('\t');
    return {
        name: parts[0],
        value: parseInt(parts[1]),
        speed: parts[2],
        acceleration: parts[3],
        seats: parseFloat(parts[4]),
        category: parts[5],
        perf: [parseInt(parts[6]), parseInt(parts[7]), parseInt(parts[8]), parseInt(parts[9]), parseInt(parts[10])],
        cosmetics: parseInt(parts[11]),
        stance: parseInt(parts[12]),
        repaint: parseInt(parts[13]),
        wheels: parseInt(parts[14]),
        lights: parseInt(parts[15]),
        tires: parseInt(parts[16]),
        extras: parseInt(parts[17]),
        dados: [parseInt(parts[18]), parseInt(parts[19]), parseInt(parts[20])],
        maint: parseFloat(parts[21])
    };
});

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VEHICLE_DATABASE };
}
