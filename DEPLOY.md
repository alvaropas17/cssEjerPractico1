# 🚀 Guía de Despliegue en GitHub Pages

## 📋 Checklist Pre-Deploy

### 1. ✅ Verificar archivos a subir
```bash
# Estos archivos DEBEN estar en el repositorio:
✓ index.html
✓ paginas/
✓ css/
✓ js/
✓ img/
✓ fonts/
✓ package.json
✓ package-lock.json (ahora habilitado)
✓ README.md

# Estos archivos NO se suben (en .gitignore):
✗ node_modules/
✗ .env
```

## 🔧 Configuración de Firebase

### 2. Autorizar dominio en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `login-firebase-331f0`
3. Ve a **Authentication** → **Settings** → **Authorized domains**
4. Añade estos dominios:
   ```
   tu-usuario.github.io
   ```
   (Reemplaza `tu-usuario` con tu nombre de usuario de GitHub)

### 3. Configurar reglas de seguridad

#### Firestore Database Rules:
1. Ve a **Firestore Database** → **Rules**
2. Pega estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regla para la colección de usuarios
    match /users/{userId} {
      // Solo el usuario autenticado puede leer/escribir sus propios datos
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Permitir lectura de datos públicos (si tienes alguno)
    match /public/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### Authentication Settings:
1. Ve a **Authentication** → **Sign-in method**
2. Asegúrate de que **Email/Password** esté habilitado
3. En **Advanced** → **Email enumeration protection**: Actívalo (recomendado)

### 4. Configuración de Realtime Database (si la usas)
1. Ve a **Realtime Database** → **Rules**
2. Pega estas reglas:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## 📦 Desplegar en GitHub Pages

### 5. Subir a GitHub

```bash
# 1. Inicializar repositorio (si no lo has hecho)
git init

# 2. Añadir todos los archivos
git add .

# 3. Hacer commit
git commit -m "Deploy: Configuración lista para GitHub Pages"

# 4. Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 5. Subir a GitHub
git branch -M main
git push -u origin main
```

### 6. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click en **Save**
5. Espera 2-3 minutos
6. Tu sitio estará en: `https://TU-USUARIO.github.io/TU-REPOSITORIO/`

## 🔍 Verificación Post-Deploy

### 7. Probar el sitio

- [ ] Abre `https://TU-USUARIO.github.io/TU-REPOSITORIO/`
- [ ] Prueba el registro de usuario
- [ ] Prueba el inicio de sesión
- [ ] Verifica que Firebase funcione correctamente
- [ ] Revisa la consola del navegador (F12) por errores

### 8. Solución de problemas comunes

#### ❌ Error: "Auth domain not authorized"
**Solución**: Ve al paso 2 y añade tu dominio de GitHub Pages

#### ❌ Error: "Permission denied" en Firestore
**Solución**: Revisa las reglas de seguridad (paso 3)

#### ❌ Error: Páginas no cargan estilos
**Solución**: Verifica las rutas relativas en los archivos HTML

#### ❌ Error: Firebase no inicializa
**Solución**: Abre la consola (F12) y verifica que los imports funcionen

## 📝 Rutas para GitHub Pages

### Rutas actuales (funcionan bien):
```javascript
// En registro.html y inicioSesion.html
href="../index.html"           // ✅ Correcto
href="../css/styles.css"       // ✅ Correcto

// En login.js
window.location.href = "../index.html";  // ✅ Correcto

// En firebase.js
window.location.href = "./inicioSesion.html";  // ✅ Correcto
```

## 🔒 Seguridad

### ⚠️ Información pública (normal en Firebase web):
- API Key de Firebase
- Project ID
- Auth Domain
- App ID

### ✅ Seguridad real está en:
- Reglas de Firestore (paso 3)
- Reglas de Authentication
- Validación server-side (si añades Cloud Functions)

## 🆕 Actualizaciones futuras

Para actualizar tu sitio:

```bash
# 1. Hacer cambios en tu código local

# 2. Commit y push
git add .
git commit -m "Descripción de cambios"
git push

# 3. GitHub Pages se actualiza automáticamente en 1-2 minutos
```

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los dominios estén autorizados en Firebase
3. Confirma que las reglas de Firestore estén publicadas
4. Revisa que GitHub Pages esté activado correctamente

---

✨ **¡Listo para despegar!** Una vez completados estos pasos, tu aplicación estará funcionando en GitHub Pages.
