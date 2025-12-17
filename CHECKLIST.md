# ✅ Checklist GitHub Pages - AI Land

## 📋 Pre-Deploy (Antes de subir)

### Archivos del Proyecto
- [ ] `index.html` existe y funciona
- [ ] Carpeta `paginas/` con registro.html e inicioSesion.html
- [ ] Carpeta `css/` con todos los estilos
- [ ] Carpeta `js/` con Firebase configurado
- [ ] Carpeta `img/` con imágenes
- [ ] `package.json` y `package-lock.json` presentes
- [ ] `.gitignore` configurado correctamente

### Verificación de .gitignore
- [ ] `node_modules/` está en .gitignore
- [ ] `package-lock.json` NO está en .gitignore (debe subirse)
- [ ] `.env` está en .gitignore (si lo usas)

### Configuración Firebase Local
- [ ] `js/firebase.js` tiene la configuración correcta
- [ ] `js/login.js` tiene la configuración correcta
- [ ] Imports usan CDN: `https://www.gstatic.com/firebasejs/...`
- [ ] No hay imports de node_modules en el código

### Rutas en Archivos
- [ ] Todas las rutas son relativas (../ o ./)
- [ ] No hay rutas absolutas que empiecen con /
- [ ] Enlaces entre páginas funcionan localmente

---

## 🔥 Configuración Firebase Console

### Authentication
- [ ] Email/Password está habilitado
- [ ] Dominio `tu-usuario.github.io` está autorizado
- [ ] (Opcional) localhost autorizado para desarrollo

### Firestore Database
- [ ] Base de datos creada
- [ ] Reglas de seguridad configuradas:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```
- [ ] Reglas publicadas (botón "Publish")

### Realtime Database (si lo usas)
- [ ] Base de datos creada
- [ ] Reglas de seguridad configuradas
- [ ] Reglas publicadas

---

## 🐙 Git y GitHub

### Repositorio Local
- [ ] `git init` ejecutado
- [ ] Todos los archivos añadidos (`git add .`)
- [ ] Commit inicial creado (`git commit -m "Initial commit"`)
- [ ] `.gitignore` funciona (node_modules no se sube)

### Repositorio GitHub
- [ ] Repositorio creado en GitHub
- [ ] Remote añadido (`git remote add origin ...`)
- [ ] Código subido (`git push -u origin main`)
- [ ] Archivos visibles en GitHub.com

### GitHub Pages
- [ ] Settings → Pages abierto
- [ ] Source: Branch `main`, folder `/root` seleccionado
- [ ] Save clickeado
- [ ] URL generada: `https://TU-USUARIO.github.io/REPO/`

---

## 🧪 Testing Post-Deploy

### Verificar Sitio Web
- [ ] Abrir URL de GitHub Pages
- [ ] Página principal carga correctamente
- [ ] CSS se aplica (no texto sin estilos)
- [ ] Imágenes cargan
- [ ] Navegación funciona

### Verificar Firebase
- [ ] Abrir consola del navegador (F12)
- [ ] No hay errores en console
- [ ] Ir a página de registro
- [ ] Intentar crear cuenta de prueba
- [ ] Verificar en Firebase Console que se creó el usuario
- [ ] Ir a página de login
- [ ] Iniciar sesión con cuenta de prueba
- [ ] Verificar redirección a index.html

### Errores Comunes y Soluciones
- [ ] **Error: "Auth domain not authorized"**
  - Solución: Añadir dominio en Firebase Console → Authentication → Settings

- [ ] **Error: "Permission denied" en Firestore**
  - Solución: Revisar y publicar reglas de Firestore

- [ ] **CSS no carga**
  - Solución: Verificar rutas relativas en HTML

- [ ] **Firebase no inicializa**
  - Solución: Verificar imports desde CDN en archivos JS

---

## 📊 Monitoreo

### Firebase Console
- [ ] Ver usuarios registrados en Authentication
- [ ] Ver datos en Firestore Database
- [ ] Revisar logs de errores

### GitHub Pages
- [ ] Verificar que el deploy fue exitoso
- [ ] Revisar Actions (si usas GitHub Actions)
- [ ] Confirmar que cambios futuros se actualizan

---

## 🎯 Comandos Útiles

### Actualizar después del primer deploy:
```bash
# 1. Hacer cambios en tu código

# 2. Ver archivos modificados
git status

# 3. Añadir cambios
git add .

# 4. Commit con mensaje descriptivo
git commit -m "Descripción del cambio"

# 5. Subir a GitHub
git push

# 6. Esperar 1-2 minutos, GitHub Pages se actualiza automáticamente
```

### Ver logs en navegador:
```javascript
// Abrir consola (F12) y escribir:
console.log('Testing Firebase', auth, db);
```

---

## ✨ ¡Deployment Completado!

Cuando todos los checkboxes estén marcados:

🎉 **Tu aplicación está en vivo en GitHub Pages**
🔒 **Firebase está configurado y seguro**
🚀 **Lista para ser usada por usuarios reales**

### Enlaces Importantes:
- 🌐 **Tu sitio**: `https://TU-USUARIO.github.io/REPO/`
- 🔥 **Firebase Console**: https://console.firebase.google.com/
- 📖 **Documentación**: Lee `DEPLOY.md` para más detalles
- 🐙 **GitHub Repo**: https://github.com/TU-USUARIO/REPO

---

**Fecha de último deploy**: _________
**Versión**: 1.0.0
**Estado**: ✅ Producción
