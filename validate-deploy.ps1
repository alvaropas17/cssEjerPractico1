# Script de validación pre-deploy para GitHub Pages (PowerShell)
# Ejecutar: .\validate-deploy.ps1

Write-Host "🔍 Validando proyecto para GitHub Pages..." -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# 1. Verificar archivos esenciales
Write-Host "📁 Verificando archivos esenciales..." -ForegroundColor Yellow
$files = @("index.html", "package.json", "README.md")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✓ $file existe" -ForegroundColor Green
    } else {
        Write-Host "✗ $file NO encontrado" -ForegroundColor Red
        $errors++
    }
}
Write-Host ""

# 2. Verificar directorios
Write-Host "📂 Verificando directorios..." -ForegroundColor Yellow
$dirs = @("css", "js", "paginas", "img")
foreach ($dir in $dirs) {
    if (Test-Path $dir -PathType Container) {
        Write-Host "✓ Directorio $dir/ existe" -ForegroundColor Green
    } else {
        Write-Host "✗ Directorio $dir/ NO encontrado" -ForegroundColor Red
        $errors++
    }
}
Write-Host ""

# 3. Verificar que node_modules esté en .gitignore
Write-Host "🚫 Verificando exclusiones..." -ForegroundColor Yellow
if (Test-Path "node_modules" -PathType Container) {
    if (Test-Path ".gitignore") {
        $gitignoreContent = Get-Content ".gitignore" -Raw
        if ($gitignoreContent -match "node_modules/") {
            Write-Host "✓ node_modules/ está en .gitignore" -ForegroundColor Green
        } else {
            Write-Host "⚠ node_modules/ existe pero NO está en .gitignore" -ForegroundColor Yellow
            Write-Host "  Esto hará tu repositorio muy pesado. Añádelo al .gitignore" -ForegroundColor Yellow
            $warnings++
        }
    }
} else {
    Write-Host "✓ node_modules/ no existe (ejecuta npm install si es necesario)" -ForegroundColor Green
}
Write-Host ""

# 4. Verificar package-lock.json
Write-Host "📋 Verificando package-lock.json..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore"
    $packageLockIgnored = $gitignoreContent | Where-Object { $_ -match "^package-lock\.json" }
    if ($packageLockIgnored) {
        Write-Host "⚠ package-lock.json está en .gitignore" -ForegroundColor Yellow
        Write-Host "  Considera permitirlo para reproducir dependencias exactas" -ForegroundColor Yellow
        $warnings++
    } else {
        Write-Host "✓ package-lock.json NO está ignorado (correcto)" -ForegroundColor Green
    }
}
Write-Host ""

# 5. Verificar archivos Firebase
Write-Host "🔥 Verificando configuración de Firebase..." -ForegroundColor Yellow
if (Test-Path "js/firebase.js") {
    $firebaseContent = Get-Content "js/firebase.js" -Raw
    if ($firebaseContent -match "firebaseConfig") {
        Write-Host "✓ Configuración de Firebase encontrada en js/firebase.js" -ForegroundColor Green
        
        if ($firebaseContent -match "apiKey:") {
            Write-Host "✓ Firebase apiKey configurada" -ForegroundColor Green
        } else {
            Write-Host "✗ Firebase apiKey NO encontrada" -ForegroundColor Red
            $errors++
        }
    }
} else {
    Write-Host "✗ js/firebase.js NO encontrado" -ForegroundColor Red
    $errors++
}
Write-Host ""

# 6. Verificar imports de Firebase
Write-Host "📦 Verificando imports de Firebase..." -ForegroundColor Yellow
$firebaseFiles = @("js/firebase.js", "js/login.js")
foreach ($fbFile in $firebaseFiles) {
    if (Test-Path $fbFile) {
        $content = Get-Content $fbFile -Raw
        if ($content -match "gstatic\.com/firebasejs") {
            Write-Host "✓ $fbFile usa CDN de Firebase (correcto para GitHub Pages)" -ForegroundColor Green
        } else {
            Write-Host "⚠ ${fbFile}: Verifica que uses imports desde CDN" -ForegroundColor Yellow
            $warnings++
        }
    }
}
Write-Host ""

# 7. Verificar rutas en HTML
Write-Host "🔗 Verificando rutas en archivos HTML..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }
$hasAbsolutePaths = $false
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'href="/' -or $content -match 'src="/') {
        Write-Host "⚠ $($file.Name) contiene rutas absolutas (pueden fallar en subdirectorios)" -ForegroundColor Yellow
        Write-Host "  Considera usar rutas relativas (../ o ./)" -ForegroundColor Yellow
        $hasAbsolutePaths = $true
    }
}
if (-not $hasAbsolutePaths) {
    Write-Host "✓ Los archivos HTML usan rutas relativas" -ForegroundColor Green
}
Write-Host ""

# 8. Verificar Git
Write-Host "🐙 Verificando Git..." -ForegroundColor Yellow
if (Test-Path ".git" -PathType Container) {
    Write-Host "✓ Repositorio Git inicializado" -ForegroundColor Green
    
    # Verificar si hay remote configurado
    $remotes = git remote -v 2>$null
    if ($remotes) {
        Write-Host "✓ Remote de GitHub configurado" -ForegroundColor Green
    } else {
        Write-Host "⚠ No hay remote configurado" -ForegroundColor Yellow
        Write-Host "  Ejecuta: git remote add origin https://github.com/TU-USUARIO/TU-REPO.git" -ForegroundColor Yellow
        $warnings++
    }
} else {
    Write-Host "⚠ Git no inicializado" -ForegroundColor Yellow
    Write-Host "  Ejecuta: git init" -ForegroundColor Yellow
    $warnings++
}
Write-Host ""

# 9. Resumen final
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✅ Validación completa: 0 errores, 0 advertencias" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu proyecto está listo para GitHub Pages 🚀" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Cyan
    Write-Host "1. git add ." -ForegroundColor White
    Write-Host "2. git commit -m 'Deploy a GitHub Pages'" -ForegroundColor White
    Write-Host "3. git push origin main" -ForegroundColor White
    Write-Host "4. Activa GitHub Pages en Settings → Pages" -ForegroundColor White
} elseif ($errors -eq 0) {
    Write-Host "⚠ Validación completa: 0 errores, $warnings advertencia(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "El proyecto puede desplegarse, pero revisa las advertencias" -ForegroundColor Yellow
} else {
    Write-Host "❌ Validación completa: $errors error(es), $warnings advertencia(s)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Corrige los errores antes de hacer deploy" -ForegroundColor Red
}
Write-Host ""
Write-Host "📖 Lee DEPLOY.md para instrucciones detalladas" -ForegroundColor Cyan
Write-Host "📋 Usa CHECKLIST.md para seguir el proceso paso a paso" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
