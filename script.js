// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButton = document.querySelector('.cta-button');

// Formulario Dinámico Elements
const dynamicForm = document.getElementById('dynamicForm');
const progressFill = document.getElementById('progressFill');
const progressSteps = document.querySelectorAll('.progress-step');
const formSteps = document.querySelectorAll('.form-step');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const templateCards = document.querySelectorAll('.template-card');
const menuField = document.getElementById('menuField');

let currentStep = 1;
let selectedTemplate = '';
let formData = {};

// Actualización de Barra de Progreso
function updateProgressBar() {
    if (!progressFill || !progressSteps) return;
    
    // Calcular porcentaje según el paso (33%, 66%, 100%)
    let progressPercentage;
    switch(currentStep) {
        case 1:
            progressPercentage = 33.33;
            break;
        case 2:
            progressPercentage = 66.66;
            break;
        case 3:
            progressPercentage = 100;
            break;
        default:
            progressPercentage = 33.33;
    }
    
    // Actualizar el ancho de la barra
    progressFill.style.width = `${progressPercentage}%`;
    
    // Actualizar estilos de los círculos de progreso
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

// Control de Visibilidad de Pasos
function showStep(step) {
    if (!formSteps || formSteps.length === 0) return;
    
    // Ocultar todos los pasos
    formSteps.forEach(formStep => {
        formStep.classList.remove('active', 'slide-in-right', 'slide-in-left');
        formStep.style.display = 'none';
    });
    
    // Mostrar el paso activo
    const targetStep = document.querySelector(`[data-step="${step}"]`);
    if (targetStep) {
        targetStep.style.display = 'block';
        targetStep.classList.add('active');
        
        // Añadir animación según la dirección
        if (step > currentStep) {
            targetStep.classList.add('slide-in-right');
        } else if (step < currentStep) {
            targetStep.classList.add('slide-in-left');
        }
    }
    
    currentStep = step;
    updateProgressBar();
    updateNavigationButtons();
}



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

// Selección de Plantillas
function handleTemplateSelection(template) {
    selectedTemplate = template;
    
    if (!templateCards || templateCards.length === 0) return;
    
    // Remover clase 'selected' de todas las tarjetas
    templateCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Añadir clase 'selected' a la tarjeta clickeada
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

// Inicialización del Formulario
function initializeForm() {
    // Resetear variables
    currentStep = 1;
    selectedTemplate = '';
    
    // Ocultar todos los pasos excepto el primero
    if (formSteps && formSteps.length > 0) {
        formSteps.forEach((step, index) => {
            if (index === 0) {
                step.style.display = 'block';
                step.classList.add('active');
            } else {
                step.style.display = 'none';
                step.classList.remove('active');
            }
        });
    }
    
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
    
    // Actualizar barra de progreso y botones
    updateProgressBar();
    updateNavigationButtons();
    
    console.log('Formulario inicializado correctamente');
}

// Navegación entre Pasos
function nextStep() {
    if (currentStep < 3) {
        if (validateCurrentStep()) {
            showStep(currentStep + 1);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

// Control de Botones de Navegación
function updateNavigationButtons() {
    if (!prevBtn || !nextBtn || !submitBtn) return;
    
    // Botón Anterior
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    // Botones Siguiente y Enviar
    if (currentStep === 3) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

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
        // Selección de Plantillas - Event Listeners
        if (templateCards && templateCards.length > 0) {
            templateCards.forEach(card => {
                card.addEventListener('click', () => {
                    const template = card.getAttribute('data-template');
                    handleTemplateSelection(template);
                    console.log('Plantilla seleccionada:', template);
                });
            });
        }
        
        // Navegación - Botón Siguiente
        nextBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            nextStep();
        });
        
        // Navegación - Botón Anterior
        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            prevStep();
        });
        
        // Form submission
        dynamicForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitForm();
        });
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