import re
import json

# HTML content from the spreadsheet (the large HTML string that was returned)
# This will extract all vehicle data from the HTML table

html_content = """
# Paste the HTML content here - it contains the table data
"""

# Parse the table to extract vehicle information
def parse_vehicle_data(html):
    vehicles = []
    
    # Pattern to find table rows
    rows = re.findall(r'<tr style="height: 20px">(.*?)</tr>', html, re.DOTALL)
    
    for row in rows[1:]:  # Skip header row
        cells = re.findall(r'<td class=".*?">(.*?)</td>', row)
        
        if len(cells) >= 22:  # Ensure we have all columns
            vehicle = {
                'name': re.sub(r'<.*?>', '', cells[0]).strip(),
                'value': cells[1].strip(),
                'speed': cells[2].strip(),
                'acceleration': cells[3].strip(),
                'seats': cells[4].strip(),
                'category': cells[5].strip(),
                'perf1': cells[6].strip(),
                'perf2': cells[7].strip(),
                'perf3': cells[8].strip(),
                'perf4': cells[9].strip(),
                'perf5': cells[10].strip(),
                'cosmetics': cells[11].strip(),
                'stance': cells[12].strip(),
                'repaint': cells[13].strip(),
                'wheels': cells[14].strip(),
                'lights': cells[15].strip(),
                'tires': cells[16].strip(),
                'extras': cells[17].strip(),
                'dados1': cells[18].strip() if len(cells) > 18 else '',
                'dados2': cells[19].strip() if len(cells) > 19 else '',
                'dados3': cells[20].strip() if len(cells) > 20 else '',
                'maintenance': cells[21].strip() if len(cells) > 21 else '',
            }
            vehicles.append(vehicle)
    
    return vehicles

# Since I have the full HTML in the read_url_content result, let me create the data structure directly

print("Vehicle data extraction script created")
