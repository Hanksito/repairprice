# 🔧 Auto Exotic - Calculadora de Precios

Aplicación web responsiva para calcular precios de reparaciones y modificaciones de vehículos.

## 🚀 Características

- ✨ **Interfaz Moderna**: Diseño dark con glassmorphism y animaciones suaves
- 📱 **Totalmente Responsiva**: Optimizada para móvil, tablet y desktop
- 💾 **Persistencia de Datos**: Los cálculos se guardan automáticamente en localStorage
- 🧮 **Cálculo en Tiempo Real**: Actualizaciones instantáneas de todos los totales
- 🖨️ **Imprimible**: Genera resúmenes listos para imprimir
- ⚡ **Rápida y Ligera**: Vanilla JS sin dependencias externas

## 📋 Secciones de la Calculadora

### 🚗 Vehículo
- Selector de modelos predefinidos
- Información de categoría y precio base

### ✨ Estética
- Cosméticos
- Stance
- Repintar
- Ruedas
- Luces
- Llantas
- Extras

### ⚡ Rendimiento
- Motor (5 niveles)
- Frenos (5 niveles)
- Transmisión (5 niveles)
- Suspensión (5 niveles)
- Blindaje (5 niveles)
- Turbo

### 🔧 Reparación
- Cantidad de reparaciones
- Servicio de grúa

### 🛠️ Mantenimiento
- Suspensión
- Llantas
- Aceite de motor
- Embrague
- Filtro de aire
- Bujías
- Pastillas de freno

### 🏁 Tuning de Neumáticos
- Kit de drift
- Tipo de neumáticos

### 💰 Convenio / Descuento
- Descuento porcentual aplicable

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables CSS y Grid/Flexbox
- **JavaScript (Vanilla)** - Lógica de cálculo y persistencia

## 📦 Instalación y Uso Local

1. Clona el repositorio:
```bash
git clone <repository-url>
cd sonic-orbit
```

2. Abre `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve

# Con PHP
php -S localhost:8000
```

3. Accede a `http://localhost:8000` en tu navegador

## 🚀 Deploy en Vercel

### Opción 1: Desde la Interfaz Web

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Importa tu repositorio de GitHub
4. Haz clic en "Deploy"

### Opción 2: Desde la CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📱 Uso de la Aplicación

1. **Selecciona un Vehículo** (opcional)
2. **Marca las opciones** que desees añadir
3. **Ajusta las cantidades** en los campos numéricos
4. **Selecciona niveles** de mejora para rendimiento
5. **Aplica descuento** si corresponde
6. **Revisa el resumen** con el total calculado
7. **Imprime o guarda** el presupuesto

### Funciones Especiales

- 🔄 **Reiniciar**: Borra todos los datos y reinicia la calculadora
- 🖨️ **Imprimir**: Genera una versión imprimible del presupuesto
- 💾 **Auto-guardado**: Los cambios se guardan automáticamente

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `style.css`:

```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    --accent: #f59e0b;
    /* ... más variables */
}
```

### Modificar Precios

Edita el objeto `PRICES` en `script.js`:

```javascript
const PRICES = {
    aesthetic: {
        cosmetics: 100,
        stance: 100,
        // ... más precios
    }
};
```

### Añadir Vehículos

Edita el objeto `VEHICLES` en `script.js`:

```javascript
const VEHICLES = {
    'nuevo-vehiculo': {
        name: 'Nuevo Vehículo',
        category: 'Sport',
        price: '$50,000',
        maxSpeed: '180 km/h',
        acceleration: '35.00%',
        seats: 4
    }
};
```

## 📂 Estructura del Proyecto

```
sonic-orbit/
├── index.html          # Estructura HTML principal
├── style.css           # Estilos y diseño responsivo
├── script.js           # Lógica de cálculo y persistencia
├── vercel.json         # Configuración de Vercel
└── README.md           # Documentación
```

## 🔒 Seguridad

- Headers de seguridad configurados en `vercel.json`
- Sin dependencias externas (sin CDNs)
- Datos guardados solo localmente (localStorage)

## 🌐 Navegadores Soportados

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Opera (últimas 2 versiones)

## 📄 Licencia

MIT License - Siéntete libre de usar y modificar este proyecto.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.

---

Hecho con ❤️ para Auto Exotic
