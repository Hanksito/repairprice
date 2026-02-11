#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Process complete vehicle database from Excel paste
Generates vehicles-data.js with all 500+ vehicles
"""

# Paste complete vehicle data from your Excel here
VEHICLE_DATA = """Blista	8.000$	151 km/h	23%	2	Compacto	80$	88$	96$	104$	112$	40$	40$	40$	40$	40$	40$	40$	200$	250$	300$	1,5
Brioso 300	13.000$	119 km/h	18%	2	Compacto	130$	143$	156$	169$	182$	65$	65$	65$	65$	65$	65$	65$	200$	250$	300$	1,5
Brioso 300 Widebody	17.000$	134 km/h	22%	2	Compacto	170$	187$	204$	221$	238$	85$	85$	85$	85$	85$	85$	85$	200$	250$	300$	1,5"""

# NOTE: Due to message size limits, I'm providing the template. 
# You'll need to paste ALL 500+ vehicle lines from the Excel into VEHICLE_DATA above

def clean_number(s):
    """Remove $, ., and , from number strings"""
    return s.replace('$', '').replace('.', '').replace(',', '')

def parse_vehicles():
    """Parse vehicle data into structured format"""
    vehicles = []
    lines = [l.strip() for l in VEHICLE_DATA.strip().split('\n') if l.strip()]
    
    for line in lines:
        parts = line.split('\t')
        if len(parts) < 22:
            print(f"Skipping line (not enough fields): {line[:50]}...")
            continue
            
        try:
            vehicle = {
                'name': parts[0].strip(),
                'value': int(clean_number(parts[1])),
                'speed': parts[2].strip(),
                'acceleration': parts[3].strip(),
                'seats': parts[4].strip().replace(',', '.'),
                'category': parts[5].strip(),
                'perf1': int(clean_number(parts[6])),
                'perf2': int(clean_number(parts[7])),
                'perf3': int(clean_number(parts[8])),
                'perf4': int(clean_number(parts[9])),
                'perf5': int(clean_number(parts[10])),
                'cosmetics': int(clean_number(parts[11])),
                'stance': int(clean_number(parts[12])),
                'repaint': int(clean_number(parts[13])),
                'wheels': int(clean_number(parts[14])),
                'lights': int(clean_number(parts[15])),
                'tires': int(clean_number(parts[16])),
                'extras': int(clean_number(parts[17])),
                'dados1': int(clean_number(parts[18])),
                'dados2': int(clean_number(parts[19])),
                'dados3': int(clean_number(parts[20])),
                'maint': float(parts[21].replace(',', '.'))
            }
            vehicles.append(vehicle)
        except Exception as e:
            print(f"Error parsing line: {line[:50]}... Error: {e}")
            
    return vehicles

def generate_javascript(vehicles):
    """Generate JavaScript file with vehicle database"""
    js_code = """// AUTO-GENERATED: Complete vehicle database (DO NOT EDIT MANUALLY)
// Generated from Excel data - 500+ vehicles with exact prices

const VEHICLE_DATABASE = [
"""
    
    for v in vehicles:
        js_code += f"""    {{
        name: "{v['name']}",
        value: {v['value']},
        speed: "{v['speed']}",
        acceleration: "{v['acceleration']}",
        seats: {v['seats']},
        category: "{v['category']}",
        perf: [{v['perf1']}, {v['perf2']}, {v['perf3']}, {v['perf4']}, {v['perf5']}],
        cosmetics: {v['cosmetics']},
        stance: {v['stance']},
        repaint: {v['repaint']},
        wheels: {v['wheels']},
        lights: {v['lights']},
        tires: {v['tires']},
        extras: {v['extras']},
        dados: [{v['dados1']}, {v['dados2']}, {v['dados3']}],
        maint: {v['maint']}
    }},
"""
    
    js_code += """];

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VEHICLE_DATABASE };
}
"""
    
    return js_code

if __name__ == '__main__':
    print("Parsing vehicle data...")
    vehicles = parse_vehicles()
    print(f"Parsed {len(vehicles)} vehicles")
    
    print("Generating JavaScript...")
    js_output = generate_javascript(vehicles)
    
    with open('vehicles-data.js', 'w', encoding='utf-8') as f:
        f.write(js_output)
    
    print(f"✓ Generated vehicles-data.js with {len(vehicles)} vehicles")
    print("✓ File ready to use!")
