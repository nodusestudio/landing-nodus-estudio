// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButton = document.querySelector('.cta-button');

// Formulario Dinámico Elements - Inicialización de Variables
let currentStep = 1;
let selectedTemplate = '';
let formData = {};

// Selección de elementos del formulario
const dynamicForm = document.getElementById('dynamicForm');
const progressFill = document.getElementById('progressFill');
const progressSteps = document.querySelectorAll('.progress-step');
const formSteps = document.querySelectorAll('.form-step');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const templateCards = document.querySelectorAll('.template-card');
const menuField = document.getElementById('menuField');

// Función showStep(step) - RADICAL RECONSTRUCTION
function showStep(step) {
    console.log('RADICAL showStep called with step:', step);
    
    if (!formSteps || formSteps.length === 0) {
        console.log('ERROR: formSteps not found');
        return;
    }
    
    // Limpiar completamente el contenido actual
    const dynamicFormContainer = document.querySelector('.dynamic-form');
    if (!dynamicFormContainer) {
        console.log('ERROR: dynamic-form not found');
        return;
    }
    
    // RECONSTRUIR EL CONTENIDO COMPLETAMENTE
    if (step === 1) {
        dynamicFormContainer.innerHTML = `
            <div class="form-step active" data-step="1" style="display: block !important; opacity: 1 !important; visibility: visible !important;">
                <h3 class="step-title" style="display: block !important; opacity: 1 !important; visibility: visible !important; color: white !important; font-size: 1.5rem !important; text-align: center !important; margin-bottom: 2rem !important;">
                    ¿Qué tipo de proyecto necesitas?
                </h3>
                <div class="template-grid" style="display: grid !important; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important; gap: 2rem !important; margin-bottom: 2rem !important; opacity: 1 !important; visibility: visible !important;">
                    <div class="template-card" data-template="restaurante" style="display: block !important; opacity: 1 !important; visibility: visible !important; background: rgba(255, 255, 255, 0.1) !important; border: 2px solid rgba(255, 255, 255, 0.2) !important; border-radius: 16px !important; padding: 2rem !important; cursor: pointer !important; min-height: 200px !important;">
                        <div class="template-icon" style="display: block !important; opacity: 1 !important; visibility: visible !important; text-align: center !important; margin-bottom: 1rem !important;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: #00d4ff !important;">
                                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"/>
                            </svg>
                        </div>
                        <h4 style="display: block !important; opacity: 1 !important; visibility: visible !important; color: white !important; font-size: 1.2rem !important; margin-bottom: 1rem !important; text-align: center !important;">Restaurante</h4>
                        <p style="display: block !important; opacity: 1 !important; visibility: visible !important; color: #b0b0b0 !important; text-align: center !important; margin-bottom: 1rem !important;">Landing page para restaurantes, bares y servicios gastronómicos</p>
                        <div class="template-features" style="display: flex !important; gap: 0.5rem !important; justify-content: center !important; flex-wrap: wrap !important; opacity: 1 !important; visibility: visible !important;">
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Menú Digital</span>
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Reservas Online</span>
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Galería</span>
                        </div>
                    </div>
                    
                    <div class="template-card" data-template="ecommerce" style="display: block !important; opacity: 1 !important; visibility: visible !important; background: rgba(255, 255, 255, 0.1) !important; border: 2px solid rgba(255, 255, 255, 0.2) !important; border-radius: 16px !important; padding: 2rem !important; cursor: pointer !important; min-height: 200px !important;">
                        <div class="template-icon" style="display: block !important; opacity: 1 !important; visibility: visible !important; text-align: center !important; margin-bottom: 1rem !important;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: #00d4ff !important;">
                                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"/>
                                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"/>
                            </svg>
                        </div>
                        <h4 style="display: block !important; opacity: 1 !important; visibility: visible !important; color: white !important; font-size: 1.2rem !important; margin-bottom: 1rem !important; text-align: center !important;">E-commerce</h4>
                        <p style="display: block !important; opacity: 1 !important; visibility: visible !important; color: #b0b0b0 !important; text-align: center !important; margin-bottom: 1rem !important;">Tienda online completa con carrito de compras y pagos</p>
                        <div class="template-features" style="display: flex !important; gap: 0.5rem !important; justify-content: center !important; flex-wrap: wrap !important; opacity: 1 !important; visibility: visible !important;">
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Catálogo</span>
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Carrito</span>
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Pagos</span>
                        </div>
                    </div>
                    
                    <div class="template-card" data-template="tienda" style="display: block !important; opacity: 1 !important; visibility: visible !important; background: rgba(255, 255, 255, 0.1) !important; border: 2px solid rgba(255, 255, 255, 0.2) !important; border-radius: 16px !important; padding: 2rem !important; cursor: pointer !important; min-height: 200px !important;">
                        <div class="template-icon" style="display: block !important; opacity: 1 !important; visibility: visible !important; text-align: center !important; margin-bottom: 1rem !important;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: #00d4ff !important;">
                                <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7"/>
                                <path d="M3 7C3 8.10457 3.89543 9 5 9C6.10457 9 7 8.10457 7 7C7 8.10457 7.89543 9 9 9C10.1046 9 11 8.10457 11 7C11 8.10457 11.8954 9 13 9C14.1046 9 15 8.10457 15 7C15 8.10457 15.8954 9 17 9C18.1046 9 19 8.10457 19 7C19 8.10457 19.8954 9 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7Z"/>
                            </svg>
                        </div>
                        <h4 style="display: block !important; opacity: 1 !important; visibility: visible !important; color: white !important; font-size: 1.2rem !important; margin-bottom: 1rem !important; text-align: center !important;">Tienda/Negocio</h4>
                        <p style="display: block !important; opacity: 1 !important; visibility: visible !important; color: #b0b0b0 !important; text-align: center !important; margin-bottom: 1rem !important;">Sitio web corporativo para mostrar productos y servicios</p>
                        <div class="template-features" style="display: flex !important; gap: 0.5rem !important; justify-content: center !important; flex-wrap: wrap !important; opacity: 1 !important; visibility: visible !important;">
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Portafolio</span>
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Contacto</span>
                            <span style="display: inline-block !important; background: rgba(0, 212, 255, 0.2) !important; color: #00d4ff !important; padding: 0.25rem 0.5rem !important; border-radius: 4px !important; font-size: 0.8rem !important;">Testimonios</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Navegación del Formulario -->
            <div class="form-navigation" style="display: flex !important; justify-content: space-between !important; align-items: center !important; margin-top: 2rem !important;">
                <button type="button" id="prevBtn" class="nav-btn prev-btn" style="display: none !important;">
                    <span class="button-text">← Anterior</span>
                </button>
                
                <button type="button" id="nextBtn" class="nav-btn next-btn" style="display: block !important; background: linear-gradient(45deg, #00d4ff, #0099cc) !important; border: none !important; color: white !important; padding: 1rem 2rem !important; border-radius: 8px !important; cursor: pointer !important; font-size: 1rem !important;">
                    <span class="button-text">Siguiente →</span>
                </button>
                
                <button type="submit" id="submitBtn" class="nav-btn submit-btn" style="display: none !important;">
                    <span class="button-text">Enviar Proyecto</span>
                </button>
            </div>
        `;
        
        // Reestablecer event listeners para las nuevas template cards
        const newTemplateCards = dynamicFormContainer.querySelectorAll('.template-card');
        newTemplateCards.forEach(card => {
            card.addEventListener('click', () => {
                const template = card.getAttribute('data-template');
                handleTemplateSelection(template);
            });
            
            card.addEventListener('touchend', (e) => {
                e.preventDefault();
                const template = card.getAttribute('data-template');
                handleTemplateSelection(template);
            });
        });
        
        // Reestablecer event listeners para botones
        const newNextBtn = dynamicFormContainer.querySelector('#nextBtn');
        const newPrevBtn = dynamicFormContainer.querySelector('#prevBtn');
        const newSubmitBtn = dynamicFormContainer.querySelector('#submitBtn');
        
        if (newNextBtn) {
            newNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextStep();
            });
        }
        
        console.log('RADICAL RECONSTRUCTION: Step 1 rebuilt successfully');
    }
    
    // Actualizar progreso y botones
    if (progressSteps) {
        progressSteps.forEach((progressStep, index) => {
            const stepNumber = index + 1;
            progressStep.classList.remove('active', 'completed');
            
            if (stepNumber < step) {
                progressStep.classList.add('completed');
            } else if (stepNumber === step) {
                progressStep.classList.add('active');
            }
        });
    }
    
    if (progressFill) {
        let progressPercentage = step === 1 ? 33 : step === 2 ? 66 : 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    currentStep = step;
}



// Navegación entre Pasos - Con compatibilidad móvil
function nextStep() {
    if (currentStep < 3) {
        if (validateCurrentStep()) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Selección de Plantilla - Mejorada
function handleTemplateSelection(template) {
    selectedTemplate = template;
    
    if (!templateCards || templateCards.length === 0) return;
    
    // Remover clase 'selected' de todas las tarjetas
    templateCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Añadir clase 'selected' solo a la tarjeta clickeada
    const selectedCard = document.querySelector(`[data-template="${template}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Mostrar campo condicional para restaurante
    if (menuField) {
        if (template === 'restaurante') {
            menuField.style.display = 'block';
            setTimeout(() => {
                menuField.classList.add('show');
            }, 100);
        } else {
            menuField.classList.remove('show');
            setTimeout(() => {
                menuField.style.display = 'none';
            }, 300);
        }
    }
    
    console.log('Plantilla seleccionada:', template);
}

// Validación de pasos
function validateCurrentStep() {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    
    if (currentStep === 1) {
        // Validar que se haya seleccionado una plantilla
        if (!selectedTemplate) {
            alert('Por favor selecciona un tipo de proyecto para continuar.');
            return false;
        }
    } else if (currentStep === 2) {
        // Validar campos requeridos del paso 2
        const requiredFields = currentFormStep.querySelectorAll('input[required], select[required]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                field.focus();
                alert('Por favor completa todos los campos requeridos.');
                return false;
            }
        }
        
        // Validar email
        const emailField = document.getElementById('correo');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            emailField.focus();
            alert('Por favor ingresa un email válido.');
            return false;
        }
    } else if (currentStep === 3) {
        // Validar campos requeridos del paso 3
        const requiredFields = currentFormStep.querySelectorAll('input[required], select[required]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                field.focus();
                alert('Por favor completa todos los campos requeridos.');
                return false;
            }
        }
        
        // Validar fecha
        const fechaField = document.getElementById('fechaLanzamiento');
        const fechaSeleccionada = new Date(fechaField.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        if (fechaSeleccionada <= hoy) {
            fechaField.focus();
            alert('La fecha de lanzamiento debe ser posterior al día de hoy.');
            return false;
        }
    }
    
    return true;
}

// Recolección de datos del formulario
function collectFormData() {
    formData = {
        tipoProyecto: selectedTemplate,
        nombre: document.getElementById('nombre').value,
        empresa: document.getElementById('empresa').value,
        correo: document.getElementById('correo').value,
        instagram: document.getElementById('instagram').value,
        facebook: document.getElementById('facebook').value,
        tienenLogo: document.getElementById('tienenLogo').checked,
        menuLink: document.getElementById('menuLink').value,
        presupuesto: document.getElementById('presupuesto').value,
        fechaLanzamiento: document.getElementById('fechaLanzamiento').value,
        comentarios: document.getElementById('comentarios').value
    };
}

// Inicialización del Formulario - EMERGENCY
function initializeForm() {
    console.log('EMERGENCY initializeForm called');
    
    // Resetear variables
    currentStep = 1;
    selectedTemplate = '';
    
    console.log('Form steps found:', formSteps?.length);
    console.log('Template cards found:', templateCards?.length);
    
    // FUERZA DIRECTA - Mostrar paso 1 inmediatamente
    setTimeout(() => {
        showStep(1);
        
        // Asegurar que el primer paso esté visible por si acaso
        const firstStep = document.querySelector('[data-step="1"]');
        if (firstStep) {
            console.log('First step found, forcing visibility...');
            firstStep.style.display = 'block';
            firstStep.style.opacity = '1';
            firstStep.style.visibility = 'visible';
            firstStep.classList.add('active');
        }
    }, 100);
    
    // Limpiar selecciones de plantillas
    if (templateCards && templateCards.length > 0) {
        templateCards.forEach(card => {
            card.classList.remove('selected');
        });
    }
    
    // Ocultar campo condicional
    if (menuField) {
        menuField.style.display = 'none';
        menuField.classList.remove('show');
    }
    
    console.log('EMERGENCY initializeForm completed');
}

// Navegación entre Pasos - Con compatibilidad móvil
function nextStep() {
    if (currentStep < 3) {
        if (validateCurrentStep()) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Control de Botones de Navegación - Eliminado (funcionalidad integrada en showStep)

function submitForm() {
    if (!validateCurrentStep()) return;
    
    collectFormData();
    
    // Aquí puedes integrar con tu servicio de email o CRM
    console.log('Datos del formulario:', formData);
    
    if (!submitBtn) return;
    
    // Simulación de envío
    submitBtn.innerHTML = '<span class="button-text">Enviando...</span><div class="button-border"></div>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`¡Gracias ${formData.nombre}! Hemos recibido tu solicitud para el proyecto ${formData.tipoProyecto}. Te contactaremos pronto al correo ${formData.correo}.`);
        
        // Reset form
        if (dynamicForm) {
            dynamicForm.reset();
        }
        currentStep = 1;
        selectedTemplate = '';
        
        if (templateCards && templateCards.length > 0) {
            templateCards.forEach(card => card.classList.remove('selected'));
        }
        
        showStep(1);
        submitBtn.innerHTML = '<span class="button-text">Enviar Proyecto</span><div class="button-border"></div>';
        submitBtn.disabled = false;
    }, 2000);
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

// Close mobile nav when clicking on links
function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
}

// Smooth scroll to sections
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
}

// Intersection Observer for animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
}

// Parallax effect for hero video
function handleParallax() {
    const scrolled = window.pageYOffset;
    const video = document.querySelector('.hero-video');
    if (video) {
        const speed = 0.3;
        video.style.transform = `translateY(${scrolled * speed}px) scale(1.05)`;
    }
}

// CTA Button click handler
function handleCTAClick() {
    // Add pulse animation
    ctaButton.style.animation = 'none';
    ctaButton.offsetHeight; // Trigger reflow
    ctaButton.style.animation = 'neonPulse 0.5s ease-out';
    
    // Scroll to formulario section
    setTimeout(() => {
        smoothScrollTo('#formulario');
    }, 300);
}

// Mouse move effect for neon elements
function addMouseMoveEffect() {
    const neonElements = document.querySelectorAll('.neon-text, .cta-button');
    
    neonElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.setProperty('--mouse-x', `${x}px`);
            element.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Typing animation for hero title
function typewriterEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
        }, index * 800);
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que los elementos principales existen
    console.log('Elements found:', {
        hamburger: !!hamburger,
        navMenu: !!navMenu,
        ctaButton: !!ctaButton,
        dynamicForm: !!dynamicForm,
        nextBtn: !!nextBtn,
        prevBtn: !!prevBtn,
        submitBtn: !!submitBtn,
        templateCards: templateCards?.length || 0,
        formSteps: formSteps?.length || 0
    });
    
    // Debug específico para móviles
    console.log('Device info:', {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        touchSupport: 'ontouchstart' in window,
        screenWidth: window.screen.width,
        viewportWidth: window.innerWidth
    });
    
    // Mobile navigation
    hamburger?.addEventListener('click', toggleMobileNav);
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScrollTo(target);
            closeMobileNav();
        });
    });
    
    // CTA button
    ctaButton?.addEventListener('click', handleCTAClick);
    
    // Formulario Dinámico Event Listeners
    if (dynamicForm) {
        // Selección de Plantillas - Event Listeners con compatibilidad móvil
        if (templateCards && templateCards.length > 0) {
            templateCards.forEach(card => {
                // Función unificada para manejar selección
                const handleSelection = (e) => {
                    const template = card.getAttribute('data-template');
                    handleTemplateSelection(template);
                };
                
                // Evento click
                card.addEventListener('click', handleSelection);
                
                // Evento touchend para mejor respuesta móvil
                card.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    handleSelection(e);
                }, { passive: false });
                
                // Mejorar interacción táctil
                card.style.touchAction = 'manipulation';
                card.style.webkitTapHighlightColor = 'transparent';
            });
        }
        
        // Navegación - Botón Siguiente con compatibilidad móvil
        if (nextBtn) {
            const handleNext = (e) => {
                e.preventDefault();
                nextStep();
            };
            
            nextBtn.addEventListener('click', handleNext);
            nextBtn.addEventListener('touchend', handleNext, { passive: false });
            nextBtn.style.touchAction = 'manipulation';
        }
        
        // Navegación - Botón Anterior con compatibilidad móvil
        if (prevBtn) {
            const handlePrev = (e) => {
                e.preventDefault();
                prevStep();
            };
            
            prevBtn.addEventListener('click', handlePrev);
            prevBtn.addEventListener('touchend', handlePrev, { passive: false });
            prevBtn.style.touchAction = 'manipulation';
        }
        
        // Submit Button con compatibilidad móvil
        if (submitBtn) {
            const handleSubmit = (e) => {
                e.preventDefault();
                submitForm();
            };
            
            submitBtn.addEventListener('click', handleSubmit);
            submitBtn.addEventListener('touchend', handleSubmit, { passive: false });
            submitBtn.style.touchAction = 'manipulation';
        }
        
        // Form submission
        dynamicForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitForm();
        });
        
        // Smooth focus effects for form inputs
        const formInputs = dynamicForm.querySelectorAll('input, select, textarea');
        if (formInputs && formInputs.length > 0) {
            formInputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement?.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    input.parentElement?.classList.remove('focused');
                });
            });
        }
        
        // Set minimum date for launch date
        const fechaLanzamiento = document.getElementById('fechaLanzamiento');
        if (fechaLanzamiento) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const minDate = tomorrow.toISOString().split('T')[0];
            fechaLanzamiento.setAttribute('min', minDate);
        }
        
        // Inicialización del Formulario
        initializeForm();
    }
    
    // Initialize observers and effects
    observeElements();
    addMouseMoveEffect();
    
    // Scroll events (throttled for performance)
    window.addEventListener('scroll', throttle(() => {
        handleNavbarScroll();
        handleParallax();
    }, 16));
    
    // Resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
    
    // Inicialización del formulario - CRÍTICO para mostrar contenido
    initializeForm();
    
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Custom cursor effect (optional enhancement)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });
}

// Initialize custom cursor on non-touch devices
if (window.matchMedia('(hover: hover)').matches) {
    initCustomCursor();
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileNav();
    }
});

// Preload media for better performance
function preloadMedia() {
    const images = ['logosinfondo.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Preload video
    const video = document.querySelector('.hero-video');
    if (video) {
        video.load();
    }
}

preloadMedia();