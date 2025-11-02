document.addEventListener('DOMContentLoaded', () => {
    let imiScore = 70;
    const imiBarFill = document.getElementById('imi-bar-fill');
    const imiPercentage = document.getElementById('imi-percentage');
    const validationButton = document.getElementById('start-validation');
    const voteButtons = document.querySelectorAll('.btn-vote');

    // Función para actualizar la barra IMI
    function updateIMI(points) {
        imiScore = Math.min(100, imiScore + points);
        imiBarFill.style.width = imiScore + '%';
        imiPercentage.textContent = imiScore + '%';

        if (imiScore >= 100) {
            // Recompensa Superior: Altruismo Eficaz
            validationButton.textContent = "¡IMI COMPLETO! Desplegar Módulo Gratuito (100% donado a Fondo Ético)";
            validationButton.classList.add('imi-complete');
            validationButton.disabled = false;
        }
    }

    // 1. Ganancia Inicial por Iniciar Validación
    validationButton.addEventListener('click', () => {
        if (imiScore < 100) {
            updateIMI(15);
            validationButton.textContent = "Validación en curso... (+15% IMI)";
            validationButton.disabled = true; // Desactivar para evitar spam

            // Reactivar después de un tiempo para permitir otra acción
            setTimeout(() => {
                validationButton.textContent = "Continuar Validación Humana";
                validationButton.disabled = false;
            }, 3000);
        }
    });

    // 2. Ganancia por Voto Ético
    voteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (imiScore < 100 && !e.target.disabled) {
                updateIMI(5);

                // Desactivar todos los botones de voto después de un intento
                voteButtons.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                });

                // Mensaje de feedback
                e.target.textContent += " [PROTOCOLO REGISTRADO]";

                console.log(`Voto registrado como: ${e.target.dataset.vote}`);
            }
        });
    });

    // 3. Ganancia por Navegación (Ej. Visitar Módulos o Protocolos)
    const imiActions = document.querySelectorAll('[data-imi-action="read"], [data-imi-action="visit"]');
    imiActions.forEach(element => {
        element.addEventListener('click', () => {
            if (imiScore < 100) {
                // Pequeña ganancia por explorar la documentación/productos
                updateIMI(3);
                console.log('Ganancia de IMI por exploración.');
            }
        });
    });

    // 4. Ganancia por Scroll (Simular Asimilación de Datos)
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        // Si el usuario pasa la sección principal y no ha ganado el punto de scroll
        if (heroBottom < 0 && !hasScrolled && imiScore < 100) {
            updateIMI(5);
            hasScrolled = true;
            console.log('Ganancia de IMI por asimilación de datos (scroll).');
        }
    });

    // Inicialización del IMI al cargar
    updateIMI(0);
});