/**
 * FLEXBOX BOILERPLATE - JAVASCRIPT INTERACTIVO
 * Sistema de gamificación IMI y efectos visuales modernos
 */

document.addEventListener('DOMContentLoaded', () => {
    let imiScore = 70;
    const imiBarFill = document.getElementById('imi-bar-fill');
    const imiPercentage = document.getElementById('imi-percentage');
    const validationButton = document.getElementById('start-validation');
    const voteButtons = document.querySelectorAll('.btn-vote');

    // =====================================================
    // SISTEMA DE GESTIÓN IMI
    // =====================================================

    // Función para actualizar la barra IMI con animaciones
    function updateIMI(points, reason = '') {
        const oldScore = imiScore;
        imiScore = Math.min(100, imiScore + points);
        
        // Animación de la barra
        animateCounter(imiPercentage, oldScore, imiScore, 500);
        
        // Actualizar la barra visual
        setTimeout(() => {
            imiBarFill.style.width = imiScore + '%';
        }, 100);

        // Mostrar notificación de ganancia
        if (points > 0) {
            showNotification(`+${points}% IMI${reason ? ': ' + reason : ''}`, 'success');
        }

        // Estado completo
        if (imiScore >= 100) {
            validationButton.textContent = "¡IMI COMPLETO! Desplegar Módulo Ético";
            validationButton.classList.add('imi-complete');
            showNotification('¡Sistema IMI al 100%! Misión completada.', 'success');
            addGlowEffect(validationButton);
        }
    }

    // Animación contador numérico
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;
            
            if (progress < 1) {
                const current = start + (end - start) * easeOutCubic(progress);
                element.textContent = Math.round(current) + '%';
                requestAnimationFrame(animate);
            } else {
                element.textContent = end + '%';
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Función de easing para animaciones suaves
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // =====================================================
    // SISTEMA DE NOTIFICACIONES
    // =====================================================

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos CSS en línea para la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease-in-out',
            background: type === 'success' ? 
                'linear-gradient(135deg, #00ffc2, #6366f1)' : 
                'linear-gradient(135deg, #ff4788, #6366f1)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
        });

        document.body.appendChild(notification);

        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animación de salida
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // =====================================================
    // EFECTOS VISUALES
    // =====================================================

    function addGlowEffect(element) {
        element.style.animation = 'glow 2s infinite alternate';
    }

    function addParticleEffect(x, y) {
        for (let i = 0; i < 5; i++) {
            createParticle(x, y);
        }
    }

    function createParticle(x, y) {
        const particle = document.createElement('div');
        Object.assign(particle.style, {
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            width: '6px',
            height: '6px',
            background: '#00ffc2',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            animation: 'particleFloat 1s ease-out forwards'
        });

        document.body.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    // =====================================================
    // EVENTOS INTERACTIVOS
    // =====================================================

    // 1. Validación Principal
    validationButton.addEventListener('click', (e) => {
        if (imiScore < 100) {
            updateIMI(15, 'Validación Humana Iniciada');
            validationButton.textContent = "Procesando validación...";
            validationButton.disabled = true;

            // Efecto de partículas
            const rect = e.target.getBoundingClientRect();
            addParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);

            setTimeout(() => {
                if (imiScore < 100) {
                    validationButton.textContent = "Continuar Validación Humana";
                    validationButton.disabled = false;
                }
            }, 3000);
        }
    });

    // 2. Sistema de Voto Ético
    voteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (imiScore < 100 && !e.target.disabled) {
                const voteType = e.target.dataset.vote;
                const reason = voteType === 'yes' ? 'Voto Centralización' : 'Voto Descentralización';
                
                updateIMI(5, reason);

                // Efectos visuales
                const rect = e.target.getBoundingClientRect();
                addParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);

                // Desactivar botones
                voteButtons.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.6';
                    btn.style.cursor = 'not-allowed';
                });

                e.target.innerHTML += ' <i class="fas fa-check"></i>';
                console.log(`Voto ético registrado: ${voteType}`);
            }
        });
    });

    // 3. Exploración de Módulos
    const imiActions = document.querySelectorAll('[data-imi-action="read"], [data-imi-action="visit"]');
    const exploredModules = new Set();
    
    imiActions.forEach((element, index) => {
        element.addEventListener('click', (e) => {
            const moduleId = `module-${index}`;
            
            if (imiScore < 100 && !exploredModules.has(moduleId)) {
                exploredModules.add(moduleId);
                updateIMI(3, 'Módulo Explorado');
                
                // Efecto visual en el elemento clickeado
                const rect = e.target.getBoundingClientRect();
                addParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);
                
                // Agregar indicador visual
                if (!element.querySelector('.explored-indicator')) {
                    const indicator = document.createElement('span');
                    indicator.className = 'explored-indicator';
                    indicator.innerHTML = ' <i class="fas fa-eye"></i>';
                    indicator.style.color = '#00ffc2';
                    element.appendChild(indicator);
                }
            }
        });
    });

    // 4. Ganancia por Scroll (Asimilación de Datos)
    let scrollMilestones = [25, 50, 75, 90]; // Porcentajes de scroll
    let reachedMilestones = new Set();

    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        scrollMilestones.forEach(milestone => {
            if (scrollPercent >= milestone && !reachedMilestones.has(milestone) && imiScore < 100) {
                reachedMilestones.add(milestone);
                updateIMI(2, `${milestone}% Datos Asimilados`);
            }
        });
    }, 100));

    // =====================================================
    // UTILIDADES Y OPTIMIZACIÓN
    // =====================================================

    // Throttle para optimizar eventos de scroll
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // =====================================================
    // ANIMACIONES CSS DINÁMICAS
    // =====================================================

    const styles = document.createElement('style');
    styles.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
        
        .imi-complete {
            animation: glow 2s infinite alternate !important;
        }
        
        .explored-indicator {
            animation: fadeInUp 0.5s ease-out;
        }
        
        .notification {
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    `;
    document.head.appendChild(styles);

    // =====================================================
    // INICIALIZACIÓN
    // =====================================================

    // Inicializar sistema
    updateIMI(0);
    
    // Mensaje de bienvenida
    setTimeout(() => {
        showNotification('Sistema IMI iniciado. ¡Comienza tu validación!', 'info');
    }, 1000);

    console.log('🤖 AI Land - Sistema IMI cargado correctamente');
    console.log('🎯 Objetivo: Alcanzar 100% de Integridad del Módulo de Interfaz');
});