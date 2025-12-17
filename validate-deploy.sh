#!/bin/bash
# Script de validación pre-deploy para GitHub Pages

echo "🔍 Validando proyecto para GitHub Pages..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de errores
ERRORS=0

# 1. Verificar archivos esenciales
echo "📁 Verificando archivos esenciales..."
files=("index.html" "package.json" "README.md")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file existe"
    else
        echo -e "${RED}✗${NC} $file NO encontrado"
        ((ERRORS++))
    fi
done
echo ""

# 2. Verificar directorios
echo "📂 Verificando directorios..."
dirs=("css" "js" "paginas" "img")
for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} Directorio $dir/ existe"
    else
        echo -e "${RED}✗${NC} Directorio $dir/ NO encontrado"
        ((ERRORS++))
    fi
done
echo ""

# 3. Verificar que node_modules no esté en el repo
echo "🚫 Verificando exclusiones..."
if [ -d "node_modules" ]; then
    if grep -q "node_modules/" .gitignore 2>/dev/null; then
        echo -e "${GREEN}✓${NC} node_modules/ está en .gitignore"
    else
        echo -e "${YELLOW}⚠${NC}  node_modules/ existe pero NO está en .gitignore"
        echo "   Esto hará tu repositorio muy pesado. Añádelo al .gitignore"
    fi
else
    echo -e "${GREEN}✓${NC} node_modules/ no existe (ejecuta npm install si es necesario)"
fi
echo ""

# 4. Verificar archivos Firebase
echo "🔥 Verificando configuración de Firebase..."
if [ -f "js/firebase.js" ]; then
    if grep -q "firebaseConfig" js/firebase.js; then
        echo -e "${GREEN}✓${NC} Configuración de Firebase encontrada en js/firebase.js"
        
        # Verificar que tenga apiKey
        if grep -q "apiKey:" js/firebase.js; then
            echo -e "${GREEN}✓${NC} Firebase apiKey configurada"
        else
            echo -e "${RED}✗${NC} Firebase apiKey NO encontrada"
            ((ERRORS++))
        fi
    fi
else
    echo -e "${RED}✗${NC} js/firebase.js NO encontrado"
    ((ERRORS++))
fi
echo ""

# 5. Verificar imports de Firebase
echo "📦 Verificando imports de Firebase..."
firebase_files=("js/firebase.js" "js/login.js")
for file in "${firebase_files[@]}"; do
    if [ -f "$file" ]; then
        if grep -q "firebase\.google\.com" "$file" || grep -q "gstatic\.com/firebasejs" "$file"; then
            echo -e "${GREEN}✓${NC} $file usa CDN de Firebase (correcto para GitHub Pages)"
        else
            echo -e "${YELLOW}⚠${NC}  $file: Verifica que uses imports desde CDN"
        fi
    fi
done
echo ""

# 6. Verificar que package-lock.json no esté en .gitignore
echo "📋 Verificando package-lock.json..."
if [ -f ".gitignore" ]; then
    if grep -q "^package-lock.json" .gitignore 2>/dev/null; then
        echo -e "${YELLOW}⚠${NC}  package-lock.json está en .gitignore"
        echo "   Considera permitirlo para reproducir dependencias exactas"
    else
        echo -e "${GREEN}✓${NC} package-lock.json NO está ignorado (correcto)"
    fi
fi
echo ""

# 7. Verificar rutas relativas
echo "🔗 Verificando rutas en archivos HTML..."
html_files=$(find . -name "*.html" -not -path "*/node_modules/*")
for file in $html_files; do
    # Buscar rutas absolutas que empiecen con /
    if grep -q 'href="/' "$file" || grep -q 'src="/' "$file"; then
        echo -e "${YELLOW}⚠${NC}  $file contiene rutas absolutas (pueden fallar en subdirectorios)"
        echo "   Considera usar rutas relativas (../ o ./)"
    else
        echo -e "${GREEN}✓${NC} $file usa rutas relativas"
    fi
done
echo ""

# 8. Resumen
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Validación completa: 0 errores${NC}"
    echo ""
    echo "Tu proyecto está listo para GitHub Pages 🚀"
    echo ""
    echo "Próximos pasos:"
    echo "1. git add ."
    echo "2. git commit -m 'Deploy a GitHub Pages'"
    echo "3. git push origin main"
    echo "4. Activa GitHub Pages en Settings → Pages"
    echo ""
    echo "📖 Lee DEPLOY.md para instrucciones detalladas"
else
    echo -e "${RED}❌ Validación completa: $ERRORS errores encontrados${NC}"
    echo ""
    echo "Corrige los errores antes de hacer deploy"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
