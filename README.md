# Flexbox Website Boilerplate - AI Land Theme

Un boilerplate completo para desarrollo web que utiliza **CSS3 Flexbox** como sistema principal de layout, con estructura HTML5 semántica y diseño responsive moderno.

## 🌐 Demo en Vivo

**Sitio desplegado**: [Ver en GitHub Pages](#) _(Actualiza esta URL después del deploy)_

## 🔐 Características de Autenticación

- ✅ Sistema de registro con Firebase Authentication
- ✅ Inicio de sesión seguro
- ✅ Base de datos Firestore para usuarios
- ✅ Validación de correo electrónico
- ✅ Protección de contraseñas (mínimo 6 caracteres)
- ✅ Mensajes de error personalizados en español

## 📁 Estructura del Proyecto

```
ejercicio1Paco/
├── index.html                        # Página principal
├── paginas/
│   ├── registro.html                # Página de registro
│   └── inicioSesion.html            # Página de login
├── css/
│   ├── styles.css                   # Estilos CSS principales con Flexbox
│   ├── login.css                    # Estilos del sistema de autenticación
│   ├── header_navbar.css            # Estilos del header y navegación
│   ├── articles.css                 # Estilos de tarjetas y artículos
│   ├── footer.css                   # Estilos del footer
│   ├── aside.css                    # Estilos de sección lateral
│   ├── botones.css                  # Estilos de botones
│   └── base/
│       └── normalize.css            # Reset CSS
├── js/
│   ├── firebase.js                  # Configuración y registro Firebase
│   ├── login.js                     # Lógica de inicio de sesión
│   ├── script.js                    # JavaScript principal
│   ├── emailValidation.js           # Validación de emails
│   └── btnMostrarContra.js          # Toggle de contraseña
├── img/                             # Imágenes del proyecto
├── fonts/                           # Fuentes personalizadas
├── package.json                     # Dependencias del proyecto
├── DEPLOY.md                        # Guía de despliegue en GitHub Pages
├── README.md                        # Documentación del proyecto
└── .github/
    ├── copilot-instructions.md      # Instrucciones para GitHub Copilot
    └── workflows/
        └── deploy.yml               # GitHub Actions para deploy automático
```

## 🎯 Requisitos Cumplidos

### ✅ Estructura HTML5 Semántica

- **Header**: Logo, navegación principal y widget de estado
- **Main**: Contenido principal con secciones organizadas
- **Nav**: Menú de navegación con interacciones CSS3
- **Aside**: Sección promocional con elementos interactivos
- **Footer**: Pie de página con iconos de redes sociales

### ✅ Sistema CSS3 con Flexbox

- **Layout Principal**: Contenedor de ancho variable (1000px - 2000px)
- **Flexbox como pilar**: Todos los layouts principales usan Flexbox
- **Normalize.css**: Normalización de navegadores incluida
- **Variables CSS**: Paleta de colores y espaciados organizados

### ✅ Metas Principales HTML

- Meta charset, viewport, description, keywords, author
- Open Graph tags para redes sociales
- Twitter Cards para compartir en Twitter
- Meta robots para SEO

### ✅ Diseño Responsive

- **Desktop**: Layout completo con todas las características
- **Tablet**: Layout adaptativo con navegación reorganizada
- **Mobile**: Layout de una columna optimizado para móviles

### ✅ Recursos Externos Integrados

- **Google Fonts**: Inter y Poppins para tipografía moderna
- **Font Awesome**: Iconografía completa y consistente
- **Imágenes con alt**: Todas las imágenes incluyen texto alternativo

### ✅ Interacciones Avanzadas

- **Menú CSS3**: Efectos de hover inspirados en css3-menu-generator
- **Sistema IMI**: Gamificación interactiva con JavaScript
- **Animaciones**: Transiciones suaves y efectos visuales
- **Notificaciones**: Sistema de feedback en tiempo real

## 🚀 Características Principales

### Sistema de Layout Flexbox

- Contenedor principal responsive (1000px-2000px)
- Header con logo, navegación y widget de estado
- Grid híbrido para artículos repetidos (6 tarjetas)
- Footer con múltiples columnas y iconos sociales
- Diseño completamente adaptativo

### Paleta de Colores Futurista

```css
--color-bg: #0a0a1f; /* Fondo principal */
--color-primary: #00ffc2; /* Cian eléctrico */
--color-secondary: #ff4788; /* Magenta vibrante */
--color-tertiary: #6366f1; /* Índigo moderno */
--color-text: #e0e0ff; /* Texto principal */
```

### Componentes Incluidos

- **6 Tarjetas de módulos** con iconos Font Awesome
- **Navegación interactiva** con efectos de hover avanzados
- **Widget de progreso IMI** con animaciones
- **Sección hero** con gradientes y llamada a la acción
- **Footer** con 6 iconos de redes sociales
- **Sistema de votación** interactivo

## 🎨 Efectos Visuales y Animaciones

### CSS3 Avanzado

- Gradientes lineales y radiales
- Backdrop filters para efectos de cristal
- Transformaciones 3D en hover
- Animaciones de keyframes personalizadas
- Box shadows con colores de tema

### JavaScript Interactivo

- Sistema de puntuación IMI gamificado
- Notificaciones toast personalizadas
- Efectos de partículas en clicks
- Animaciones de contadores
- Scroll tracking con recompensas

## 📱 Responsive Design

### Breakpoints

- **Desktop**: > 1200px (Layout completo)
- **Tablet**: 768px - 1200px (Navegación reorganizada)
- **Mobile**: < 768px (Layout vertical optimizado)

### Adaptaciones Mobile

- Navegación vertical en móviles
- Widget IMI reorganizado
- Grid de una columna para artículos
- Botones de voto apilados verticalmente

## 🌐 Cómo Usar

### Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/ejercicio1Paco.git
cd ejercicio1Paco

# 2. Instalar dependencias (Firebase)
npm install

# 3. Abrir con Live Server (VS Code) o directamente en el navegador
# index.html
```

### 🚀 Desplegar en GitHub Pages

**Lee la guía completa**: [DEPLOY.md](DEPLOY.md)

Pasos rápidos:
1. Configura Firebase Console (autoriza tu dominio)
2. Sube tu código a GitHub
3. Activa GitHub Pages en Settings → Pages
4. ¡Listo! Tu sitio estará en `https://TU-USUARIO.github.io/ejercicio1Paco/`

### Personalización Rápida

1. **Colores**: Modificar variables CSS en `:root`
2. **Contenido**: Editar HTML manteniendo la estructura
3. **Imágenes**: Reemplazar URLs de Unsplash por imágenes propias
4. **Interacciones**: Ajustar JavaScript según necesidades
5. **Firebase**: Sustituir configuración con tu propio proyecto

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica completa
- **CSS3**: Flexbox, Grid, Variables, Animations
- **JavaScript ES6+**: Interactividad moderna

### Backend & Autenticación
- **Firebase Authentication**: Sistema de login/registro
- **Cloud Firestore**: Base de datos NoSQL en tiempo real
- **Firebase Hosting** _(opcional)_: Alternativa a GitHub Pages

### Recursos
- **Google Fonts**: Inter y Poppins
- **Font Awesome 6**: Iconografía completa
- **Normalize.css**: Reset de navegadores
- **Firebase CDN**: Imports vía CDN (compatible con GitHub Pages)

## 📖 Conceptos Flexbox Implementados

- `display: flex` - Contenedores flexibles
- `flex-direction` - Dirección de elementos (row/column)
- `justify-content` - Alineación horizontal
- `align-items` - Alineación vertical
- `flex-wrap` - Envoltura responsive
- `flex: 1` - Crecimiento flexible
- `gap` - Espaciado entre elementos
- `align-self` - Alineación individual

## 📊 Estructura de Artículos Repetidos

El sitio incluye **6 tarjetas de módulos** con estructura consistente:

- Icono Font Awesome temático
- Título descriptivo
- Párrafo explicativo
- Enlace de acción con hover effects

## 🎭 Temática: AI Land - Proyecto Cifrado Humano

### Narrativa

Centro de mando futurista para validación ética de IA, donde los usuarios son "Validadores Primarios" que contribuyen a la integridad global del sistema.

### Elementos Temáticos

- Sistema IMI (Integridad del Módulo de Interfaz)
- Módulos tecnológicos futuristas
- Votación ética sobre IA
- Estética cyberpunk moderna

## 📄 Licencia

Este proyecto es un boilerplate educativo de uso libre para aprendizaje y desarrollo web.

---

**Versión**: 2.0.0  
**Tecnologías**: HTML5, CSS3 Flexbox, JavaScript ES6+  
**Tema**: Futurista / Cyberpunk / IA Ética  
**Responsive**: Desktop, Tablet, Mobile
