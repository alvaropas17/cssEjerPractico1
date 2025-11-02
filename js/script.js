/* ===========================
   0) Early theme (reduce FOUC)
   =========================== */
// FOUC = Flash of Unstyled Content
// Esta función se ejecuta inmediatamente para aplicar el tema antes de que se cargue el CSS
// Esto evita que el usuario vea un "parpadeo" cuando cambia el tema
(() => {
    try {
        // Clave para guardar la preferencia de tema en localStorage
        const KEY = "theme-preference";

        // Obtener el tema guardado del localStorage, por defecto "system"
        const stored = localStorage.getItem(KEY) || "system";

        // Detectar si el sistema operativo prefiere modo oscuro
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)")
            .matches;

        // Determinar el tema efectivo:
        // - Si es "system", usar la preferencia del SO (dark/light)
        // - Si no, usar el tema guardado directamente
        const effective =
            stored === "system" ? (systemDark ? "dark" : "light") : stored;

        // Aplicar el tema al elemento raíz del documento
        // Esto permite que el CSS use [data-theme="dark"] o [data-theme="light"]
        document.documentElement.setAttribute("data-theme", effective);
    } catch (e) {
        // Si hay algún error, no hacer nada (silenciar errores)
        /* no-op */
    }
})();

/* ===========================
   1) Helpers
   =========================== */
// Funciones auxiliares para simplificar el código

// qs = querySelector simplificado
// Busca el primer elemento que coincida con el selector CSS
// El segundo parámetro es opcional, por defecto busca en todo el document
const qs = (s, el = document) => el.querySelector(s);

// qsa = querySelectorAll simplificado
// Busca TODOS los elementos que coincidan con el selector CSS
// Devuelve un Array (no NodeList) para poder usar métodos como forEach, map, etc.
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

/* ===========================
   2) Dropdowns / Mega menu
   =========================== */
// Maneja la funcionalidad de los menús desplegables de navegación
(() => {
    // Obtener todos los elementos de navegación que tienen menús desplegables
    const navItems = qsa(".nav-item");

    // Configurar cada elemento del menú
    navItems.forEach((item) => {
        // Buscar el enlace y el panel desplegable dentro de cada item
        const link = qs(".nav-link", item);
        const panel = qs(".panel", item);

        // Si no existe el enlace o el panel, saltar este item
        if (!link || !panel) return;

        // Función para abrir el menú desplegable
        const open = () => {
            // Marcar como expandido para CSS y lectores de pantalla
            item.setAttribute("aria-expanded", "true");
            link.setAttribute("aria-expanded", "true");
        };

        // Función para cerrar el menú desplegable
        const close = () => {
            // Marcar como cerrado
            item.setAttribute("aria-expanded", "false");
            link.setAttribute("aria-expanded", "false");
        };

        // EVENTO: Click en el enlace (para móviles principalmente)
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Evitar navegación por defecto

            // Verificar si está actualmente expandido
            const expanded = item.getAttribute("aria-expanded") === "true";

            // Cerrar todos los otros menús primero
            navItems.forEach((i) => {
                if (i !== item) i.setAttribute("aria-expanded", "false");
            });

            // Alternar el estado del menú actual
            item.setAttribute("aria-expanded", String(!expanded));
            link.setAttribute("aria-expanded", String(!expanded));
        });

        // EVENTO: Hover del mouse (solo para dispositivos con puntero preciso, como ratón)
        let hoverTimer; // Timer para retrasar la apertura/cierre

        // Al entrar con el mouse
        item.addEventListener("mouseenter", () => {
            // Solo activar en dispositivos con puntero fino (ratón, no touch)
            if (window.matchMedia("(pointer: fine)").matches) {
                clearTimeout(hoverTimer);
                // Pequeño retraso antes de abrir (80ms)
                hoverTimer = setTimeout(open, 80);
            }
        });

        // Al salir con el mouse
        item.addEventListener("mouseleave", () => {
            if (window.matchMedia("(pointer: fine)").matches) {
                clearTimeout(hoverTimer);
                // Retraso más largo antes de cerrar (120ms) para evitar cierres accidentales
                hoverTimer = setTimeout(close, 120);
            }
        });

        // EVENTO: Teclado - cerrar con Escape
        item.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                close();
                link.focus(); // Devolver el foco al enlace
            }
        });

        // EVENTO: Click fuera del menú lo cierra
        document.addEventListener("click", (e) => {
            // Si el click no fue dentro de este item, cerrarlo
            if (!item.contains(e.target)) close();
        });
    });
})();

/* ===========================
   3) Mobile drawer
   =========================== */
// Maneja el menú lateral deslizable para dispositivos móviles
(() => {
    // Obtener elementos del DOM necesarios para el drawer
    const burger = qs(".burger");           // Botón hamburguesa
    const drawer = qs("#mobile-drawer");    // Panel lateral
    const backdrop = qs("#drawer-backdrop"); // Fondo oscuro detrás del panel

    // Función para abrir el drawer
    function openDrawer() {
        // Verificar que todos los elementos existen
        if (!burger || !drawer || !backdrop) return;

        // Agregar clases CSS para mostrar el drawer con animación
        drawer.classList.add("open");
        backdrop.classList.add("open");

        // Hacer visible el backdrop
        backdrop.hidden = false;

        // Actualizar atributos de accesibilidad
        drawer.setAttribute("aria-hidden", "false");
        burger.setAttribute("aria-expanded", "true");

        // Enfocar el primer elemento interactivo del drawer
        const first = drawer.querySelector("input, a, button");
        if (first) first.focus();
    }

    // Función para cerrar el drawer
    function closeDrawer() {
        if (!burger || !drawer || !backdrop) return;

        // Quitar clases CSS para ocultar el drawer
        drawer.classList.remove("open");
        backdrop.classList.remove("open");

        // Actualizar atributos de accesibilidad
        drawer.setAttribute("aria-hidden", "true");
        burger.setAttribute("aria-expanded", "false");

        // Ocultar el backdrop después de la animación (250ms)
        setTimeout(() => {
            backdrop.hidden = true;
        }, 250);

        // Devolver el foco al botón hamburguesa
        burger.focus();
    }

    // EVENTO: Click en el botón hamburguesa
    if (burger) {
        burger.addEventListener("click", () => {
            // Verificar el estado actual y alternar
            const expanded = burger.getAttribute("aria-expanded") === "true";
            expanded ? closeDrawer() : openDrawer();
        });
    }

    // EVENTO: Click en el backdrop (fondo) cierra el drawer
    if (backdrop) backdrop.addEventListener("click", closeDrawer);

    // EVENTO: Tecla Escape cierra el drawer
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer && drawer.classList.contains("open"))
            closeDrawer();
    });
})();

/* ===========================
   4) Header shadow on scroll
   =========================== */
// Agrega una sombra al header cuando el usuario hace scroll hacia abajo
(() => {
    const header = qs(".site-header");

    // Función que se ejecuta en cada evento de scroll
    const onScroll = () => {
        if (header) {
            // Si el scroll vertical es mayor a 6px, aplicar sombra
            // La variable CSS --shadow debe estar definida en el CSS
            header.style.boxShadow = window.scrollY > 6 ? "var(--shadow)" : "none";
        }
    };

    // Escuchar el evento scroll
    // { passive: true } mejora el rendimiento indicando que no llamaremos preventDefault()
    document.addEventListener("scroll", onScroll, { passive: true });

    // Ejecutar una vez al cargar para establecer el estado inicial
    onScroll();
})();

/* ===========================
   5) Top-level keyboard nav
   =========================== */
// Navegación por teclado en el menú principal usando las flechas
(() => {
    // Obtener todos los enlaces del menú principal
    const navLinks = qsa(".nav-link");

    // Verificaciones de desarrollo para asegurar que funciona correctamente
    console.assert(Array.isArray(navLinks), "navLinks should be an Array");
    console.assert(
        typeof navLinks.forEach === "function",
        "navLinks.forEach should exist"
    );

    // Configurar navegación por teclado para cada enlace
    navLinks.forEach((lnk, idx) => {
        lnk.addEventListener("keydown", (e) => {
            // FLECHA DERECHA o IZQUIERDA: navegar horizontalmente entre enlaces
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();

                // Calcular el índice del siguiente enlace
                const nextIndex =
                    e.key === "ArrowRight"
                        ? (idx + 1) % navLinks.length          // Siguiente (con wrap)
                        : (idx - 1 + navLinks.length) % navLinks.length; // Anterior (con wrap)

                // Enfocar el siguiente enlace
                const target = navLinks[nextIndex];
                if (target) target.focus();
            }

            // FLECHA ABAJO: abrir el menú desplegable y enfocar el primer elemento
            if (e.key === "ArrowDown") {
                const item = lnk.closest(".nav-item");
                if (item) {
                    // Abrir el menú desplegable
                    item.setAttribute("aria-expanded", "true");
                    lnk.setAttribute("aria-expanded", "true");

                    // Enfocar el primer elemento interactivo del panel
                    const first = item.querySelector(
                        ".panel a, .panel button, .panel input"
                    );
                    if (first) first.focus();
                }
            }
        });
    });
})();

/* ===========================
   6) Theme switcher
   =========================== */
// Sistema completo de cambio de temas (claro, oscuro, automático)
(() => {
    // Clave para localStorage (mismo que en la sección 0)
    const KEY = "theme-preference";
    const root = document.documentElement; // Elemento <html>
    const label = document.getElementById("theme-mode-label"); // Texto que muestra el tema actual
    const btn = document.getElementById("theme-toggle");       // Botón principal de cambio

    // Detectar preferencia del sistema operativo
    const getSystem = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

    // Obtener preferencia guardada del usuario
    const getStored = () => localStorage.getItem(KEY) || "system";

    // Aplicar un tema específico al documento
    const apply = (mode) => {
        // Determinar el tema efectivo:
        // - Si es "system", usar la preferencia del SO
        // - Si no, usar el modo directamente
        const effective = mode === "system" ? getSystem() : mode;

        // Aplicar el tema al elemento raíz
        root.setAttribute("data-theme", effective);

        // Actualizar el texto del botón (capitalizar primera letra)
        if (label) label.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);

        // Disparar evento personalizado para notificar el cambio de tema
        // Otros scripts pueden escuchar este evento
        document.dispatchEvent(
            new CustomEvent("themechange", { detail: { mode, effective } })
        );
    };

    // Guardar y aplicar un tema
    const set = (mode) => {
        localStorage.setItem(KEY, mode);
        apply(mode);
    };

    // INICIALIZACIÓN: Aplicar tema guardado al cargar la página
    apply(getStored());

    // Escuchar cambios en la preferencia del sistema operativo
    // Si el usuario tiene seleccionado "system", actualizar automáticamente
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            if (getStored() === "system") apply("system");
        });

    // BOTÓN PRINCIPAL: Cicla entre los temas en orden: System -> Light -> Dark
    if (btn)
        btn.addEventListener("click", () => {
            const order = ["system", "light", "dark"];
            const current = getStored();
            // Encontrar el índice actual y pasar al siguiente (con wrap)
            const next = order[(order.indexOf(current) + 1) % order.length];
            set(next);
        });

    // BOTONES ESPECÍFICOS en el drawer: enlaces directos a cada tema
    ["light", "dark", "system"].forEach((m) => {
        const el = document.getElementById(`theme-${m}`);
        if (el)
            el.addEventListener("click", (e) => {
                e.preventDefault();
                set(m); // Aplicar directamente el tema seleccionado
            });
    });
})();

/* ===========================
   7) Interactive particles field
   =========================== */
// Sistema de partículas animadas de fondo con interacción del mouse
(() => {
    // Obtener el elemento canvas del DOM
    const canvas = document.getElementById("particles");
    if (!(canvas instanceof HTMLCanvasElement)) return; // Salir si no es un canvas válido

    // Configuración inicial del canvas y contexto de dibujo
    const ctx = canvas.getContext("2d");
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // Device Pixel Ratio (para pantallas de alta resolución)
    let width = 0, height = 0; // Dimensiones del canvas
    let particles = [];        // Array que contiene todas las partículas
    const mouse = { x: -9999, y: -9999 }; // Posición del mouse (inicialmente fuera de pantalla)
    const state = { enabled: true }; // Estado del sistema de partículas

    // Elementos de control
    const toggleBtn = document.getElementById("particles-toggle");

    // Respetar preferencias de accesibilidad: deshabilitar si el usuario prefiere menos movimiento
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) state.enabled = false;

    // FUNCIONES AUXILIARES

    // Generar número aleatorio entre min y max
    const rand = (min, max) => Math.random() * (max - min) + min;

    // Limitar un número entre los valores a y b
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

    // Leer variables CSS personalizadas (custom properties)
    function readVar(name, fallback) {
        const v = getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();
        return v || fallback;
    }

    // CONFIGURACIÓN DEL CANVAS
    function resize() {
        // Ajustar el tamaño del canvas al tamaño de la ventana
        width = canvas.clientWidth = window.innerWidth;
        height = canvas.clientHeight = window.innerHeight;

        // Configurar resolución real considerando el DPR para pantallas de alta resolución
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        // Escalar el contexto para que las coordenadas coincidan con el tamaño CSS
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Regenerar las partículas para la nueva resolución
        seed();
    }

    // GENERACIÓN DE PARTÍCULAS
    function seed() {
        const area = width * height; // Área total del canvas
        const density = 1 / 12000;   // Densidad: 1 partícula cada 12000 píxeles

        // Calcular número objetivo de partículas (entre 40 y 160)
        const target = clamp(Math.floor(area * density), 40, 160);

        // Crear array de partículas con propiedades aleatorias
        particles = new Array(target).fill(0).map(() => ({
            x: rand(0, width),      // Posición X aleatoria
            y: rand(0, height),     // Posición Y aleatoria
            vx: rand(-0.4, 0.4),    // Velocidad X (lenta)
            vy: rand(-0.4, 0.4),    // Velocidad Y (lenta)
            r: rand(1.2, 2.2)       // Radio de la partícula
        }));
    }

    // ACTUALIZACIÓN Y DIBUJO
    function update() {
        // Configuración de la interacción
        const linkDist = 110;      // Distancia máxima para dibujar líneas entre partículas
        const repelRadius = 80;    // Radio de repulsión del mouse
        const repelStrength = 0.08; // Fuerza de repulsión

        // Actualizar cada partícula
        for (const p of particles) {
            // Calcular distancia al mouse
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const d2 = dx * dx + dy * dy; // Distancia al cuadrado (más eficiente)

            // REPULSIÓN DEL MOUSE: empujar partículas que estén cerca del cursor
            if (d2 < repelRadius * repelRadius) {
                const d = Math.sqrt(d2) || 1; // Distancia real (evitar división por 0)
                const ux = dx / d, uy = dy / d; // Vector unitario alejándose del mouse

                // Aplicar fuerza de repulsión
                p.vx += ux * repelStrength;
                p.vy += uy * repelStrength;
            }

            // MOVIMIENTO: actualizar posición basada en velocidad
            p.x += p.vx;
            p.y += p.vy;

            // WRAP EDGES: hacer que las partículas reaparezcan del otro lado
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            // FRICCIÓN: reducir gradualmente la velocidad
            p.vx *= 0.997;
            p.vy *= 0.997;
        }

        // DIBUJO
        ctx.clearRect(0, 0, width, height); // Limpiar canvas

        // Obtener colores desde variables CSS (se actualizan automáticamente con el tema)
        const dot = readVar("--muted", "#88a");   // Color de las partículas
        const line = readVar("--brand", "#59f");  // Color de las líneas

        ctx.fillStyle = dot;

        // DIBUJAR PARTÍCULAS
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // DIBUJAR CONEXIONES entre partículas cercanas
        ctx.strokeStyle = line;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;

                // Solo dibujar línea si las partículas están lo suficientemente cerca
                if (d2 < linkDist * linkDist) {
                    const alpha = 1 - Math.sqrt(d2) / linkDist; // Transparencia basada en distancia
                    ctx.globalAlpha = alpha * 0.6;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1; // Resetear transparencia
    }

    // LOOP DE ANIMACIÓN
    let rafId = 0; // ID del requestAnimationFrame para poder cancelarlo
    function loop() {
        if (!state.enabled) return; // No continuar si está deshabilitado
        update(); // Actualizar y dibujar
        rafId = requestAnimationFrame(loop); // Programar siguiente frame
    }

    // EVENTOS DEL NAVEGADOR

    // Redimensionar ventana: recalcular canvas
    window.addEventListener(
        "resize",
        () => {
            dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            resize();
        },
        { passive: true }
    );

    // Movimiento del mouse/touch: actualizar posición
    window.addEventListener(
        "pointermove",
        (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        },
        { passive: true }
    );

    // Mouse sale de la ventana: mover posición fuera de pantalla
    window.addEventListener(
        "pointerleave",
        () => {
            mouse.x = -9999;
            mouse.y = -9999;
        },
        { passive: true }
    );

    // Visibilidad de la página: pausar animación cuando no está visible
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(rafId); // Pausar
        } else if (state.enabled) {
            loop(); // Reanudar
        }
    });

    // BOTÓN DE CONTROL: habilitar/deshabilitar partículas
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            state.enabled = !state.enabled; // Alternar estado
            toggleBtn.setAttribute("aria-pressed", String(state.enabled));

            if (state.enabled) {
                loop(); // Iniciar animación
            } else {
                cancelAnimationFrame(rafId); // Detener animación
                ctx.clearRect(0, 0, width, height); // Limpiar canvas
            }
        });
    }

    // Reaccionar a cambios de tema: los colores se actualizan automáticamente en el siguiente frame
    document.addEventListener("themechange", () => {
        /* colours update automatically next frame */
    });

    // INICIALIZACIÓN
    resize(); // Configurar tamaño inicial
    if (state.enabled) loop(); // Iniciar animación si está habilitada

    // VERIFICACIONES DE DESARROLLO (solo en modo desarrollo)
    console.assert(
        canvas instanceof HTMLCanvasElement,
        "Particles canvas should exist"
    );
    console.assert(particles.length > 0, "Particles should be seeded");
})();
