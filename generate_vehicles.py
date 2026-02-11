# Script to parse complete vehicle data from user input and generate vehicles-data.js

vehicles_text = """Blista	8.000$	151 km/h	23%	2	Compacto	80$	88$	96$	104$	112$	40$	40$	40$	40$	40$	40$	40$	200$	250$	300$	1,5
Brioso 300	13.000$	119 km/h	18%	2	Compacto	130$	143$	156$	169$	182$	65$	65$	65$	65$	65$	65$	65$	200$	250$	300$	1,5
Brioso 300 Widebody	17.000$	134 km/h	22%	2	Compacto	170$	187$	204$	221$	238$	85$	85$	85$	85$	85$	85$	85$	200$	250$	300$	1,5
Brioso R/A	18.000$	150 km/h	29%	2	Compacto	180$	198$	216$	234$	252$	90$	90$	90$	90$	90$	90$	90$	200$	250$	300$	1,5
Cheburek	12.000$	161 km/h	26%	2	Compacto	120$	132$	144$	156$	168$	60$	60$	60$	60$	60$	60$	60$	200$	250$	300$	1,5"""

# I'll need to paste ALL the vehicle data here - this is just a sample
# Due to message length constraints, I'll create the full version

print("Parsing vehicle data to generate JavaScript...")

vehicles = []
for line in vehicles_text.strip().split('\n'):
    if line.strip():
        parts = line.split('\t')
        if len(parts) >= 22:
            try:
                name = parts[0]
                value = int(parts[1].replace('$', '').replace('.', '').replace(',', ''))
                speed = parts[2]
                accel = parts[3]
                seats = parts[4].replace(',', '.')
                category = parts[5]
                perf = [int(p.replace('$', '').replace('.', '').replace(',', '')) for p in parts[6:11]]
                cosmetics = int(parts[11].replace('$', '').replace('.', '').replace(',', ''))
                stance = int(parts[12].replace('$', '').replace('.', '').replace(',', ''))
                repaint = int(parts[13].replace('$', '').replace('.', '').replace(',', ''))
                wheels = int(parts[14].replace('$', '').replace('.', '').replace(',', ''))
                lights = int(parts[15].replace('$', '').replace('.', '').replace(',', ''))
                tires = int(parts[16].replace('$', '').replace('.', '').replace(',', ''))
                extras = int(parts[17].replace('$', '').replace('.', '').replace(',', ''))
                dados = [int(parts[18].replace('$', '').replace('.', '').replace(',', '')),
                        int(parts[19].replace('$', '').replace('.', '').replace(',', '')),
                        int(parts[20].replace('$', '').replace('.', '').replace(',', ''))]
                maint = float(parts[21].replace(',', '.'))
                
                vehicles.append({
                    'name': name,
                    'value': value,
                    'speed': speed,
                    'accel': accel,
                    'seats': seats,
                    'category': category,
                    'perf': perf,
                    'cosmetics': cosmetics,
                    'stance': stance,
                    'repaint': repaint,
                    'wheels': wheels,
                    'lights': lights,
                    'tires': tires,
                    'extras': extras,
                    'dados': dados,
                    'maint': maint
                })
            except Exception as e:
                print(f"Error parsing line: {line[:50]}... - {e}")

print(f"Parsed {len(vehicles)} vehicles")

# Generate JavaScript
js_output = "// AUTO-GENERATED: Complete vehicle database\nconst VEHICLE_DATABASE = [\n"

for v in vehicles:
    js_output += f'    {{ name: "{v["name"]}", value: {v["value"]}, speed: "{v["speed"]}", acceleration: "{v["accel"]}", seats: {v["seats"]}, category: "{v["category"]}", perf: [{", ".join(map(str, v["perf"]))}], cosmetics: {v["cosmetics"]}, stance: {v["stance"]}, repaint: {v["repaint  "]} wheels: {v["wheels"]}, lights: {v["lights"]}, tires: {v["tires"]}, extras: {v["extras"]}, dados: [{", ".join(map(str, v["dados"]))}], maint: {v["maint"]} }},\n'

js_output += "];\n"

with open('vehicles_generated.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Done! Generated vehicles_generated.js")
