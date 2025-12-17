# 🚀 RESUMEN RÁPIDO - Deploy GitHub Pages

## ✅ Estado del Proyecto

**VALIDACIÓN COMPLETA**: ✅ 0 errores, 0 advertencias
**LISTO PARA DEPLOY**: 🚀 SÍ

---

## 📦 Archivos Configurados

### ✅ Se subirán a GitHub:
- ✓ index.html, paginas/, css/, js/, img/, fonts/
- ✓ package.json y package-lock.json (dependencias)
- ✓ README.md, DEPLOY.md, CHECKLIST.md
- ✓ .gitignore (configuración)
- ✓ .github/workflows/deploy.yml (deploy automático opcional)

### ❌ NO se subirán (en .gitignore):
- ✗ node_modules/ (muy pesado ~100MB)
- ✗ .vscode/ (configuración personal)
- ✗ archivos temporales

---

## 🎯 Próximos 3 Pasos Obligatorios

### 1️⃣ Configurar Firebase Console (5 minutos)

Abre: https://console.firebase.google.com/project/login-firebase-331f0

**A. Autorizar dominio de GitHub Pages:**
   ```
   Authentication → Settings → Authorized domains
   → Click "Add domain"
   → Añadir: TU-USUARIO.github.io
   → Save
   ```

**B. Configurar reglas de Firestore:**
   ```
   Firestore Database → Rules
   → Pegar las reglas (ver DEPLOY.md)
   → Publish
   ```

**C. Verificar Email/Password habilitado:**
   ```
   Authentication → Sign-in method
   → Email/Password debe estar "Enabled"
   ```

### 2️⃣ Subir a GitHub (3 minutos)

```powershell
# En tu terminal PowerShell:

# 1. Añadir todos los cambios
git add .

# 2. Crear commit
git commit -m "feat: Proyecto listo para GitHub Pages con Firebase"

# 3. Subir a GitHub
git push origin main

# 4. Verificar en GitHub.com que los archivos están
```

### 3️⃣ Activar GitHub Pages (2 minutos)

1. Ve a tu repositorio en GitHub.com
2. Click en **Settings** (engranaje arriba)
3. En el menú izquierdo: **Pages**
4. En **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Espera 2-3 minutos
7. Refrescar la página
8. Verás: "Your site is live at https://TU-USUARIO.github.io/ejercicio1Paco/"

---

## 🧪 Probar tu Sitio (5 minutos)

1. **Abrir URL**: https://TU-USUARIO.github.io/ejercicio1Paco/

2. **Test de Registro**:
   - Click en "Registrarse" o ir a `/paginas/registro.html`
   - Crear cuenta con email de prueba
   - Verificar mensaje de éxito
   - Comprobar en Firebase Console → Authentication que aparece el usuario

3. **Test de Login**:
   - Click en "Iniciar Sesión" o ir a `/paginas/inicioSesion.html`
   - Iniciar sesión con la cuenta creada
   - Verificar redirección a index.html
   - Abrir consola (F12) para ver si hay errores

4. **Verificar en Firebase Console**:
   - Authentication → Users: debe aparecer tu usuario
   - Firestore Database → users: debe aparecer el documento con tu UID

---

## 🔧 Comandos de Utilidad

### Ver estado de Git:
```powershell
git status
```

### Ver archivos que se subirán:
```powershell
git ls-files
```

### Verificar que node_modules no se sube:
```powershell
# Esto NO debe mostrar node_modules:
git ls-files | Select-String "node_modules"
```

### Actualizar el sitio después del primer deploy:
```powershell
# 1. Hacer cambios en tu código
# 2. Guardar archivos
# 3. Subir cambios:
git add .
git commit -m "Descripción de cambios"
git push

# GitHub Pages se actualiza automáticamente en 1-2 minutos
```

---

## ⚠️ Solución de Problemas

### Error: "Auth domain not authorized"
```
Solución:
1. Firebase Console → Authentication → Settings
2. Authorized domains → Add domain
3. Añadir: TU-USUARIO.github.io
4. Save
```

### Error: "Permission denied" en Firestore
```
Solución:
1. Firestore Database → Rules
2. Copiar reglas de DEPLOY.md
3. Click "Publish"
```

### CSS no carga / Página sin estilos
```
Solución:
1. Abrir F12 → Console
2. Ver errores de rutas
3. Verificar que todas las rutas usan ../ o ./
4. NO deben empezar con /
```

### Firebase no inicializa
```
Solución:
1. F12 → Console
2. Ver error específico
3. Verificar que imports usan:
   https://www.gstatic.com/firebasejs/10.7.1/...
4. NO deben importar desde node_modules
```

---

## 📚 Documentación Completa

- **DEPLOY.md** - Guía detallada paso a paso con capturas
- **CHECKLIST.md** - Lista de verificación completa con checkboxes
- **README.md** - Documentación del proyecto y tecnologías
- **validate-deploy.ps1** - Script de validación automática

---

## 🎉 ¡Listo!

Cuando completes los 3 pasos obligatorios:

✅ Tu sitio estará en: `https://TU-USUARIO.github.io/ejercicio1Paco/`
✅ Firebase funcionará correctamente
✅ Usuarios podrán registrarse e iniciar sesión
✅ Los datos se guardarán en Firestore

---

## 🆘 ¿Necesitas Ayuda?

1. **Primero**: Lee el error en la consola (F12)
2. **Segundo**: Busca el error en DEPLOY.md
3. **Tercero**: Verifica CHECKLIST.md
4. **Cuarto**: Revisa Firebase Console → Authentication → Settings

---

**Creado**: ${new Date().toISOString().split('T')[0]}
**Versión**: 1.0.0
**Estado**: ✅ Listo para Deploy
