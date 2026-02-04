// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButton = document.querySelector('.cta-button');

// Formulario Dinámico Elements - Inicialización de Variables
let currentStep = 1;
let selectedTemplate = '';
let formData = {};

// Selección de elementos del formulario - VARIABLES MUTABLES
const dynamicForm = document.getElementById('dynamicForm');
const progressFill = document.getElementById('progressFill');
const progressSteps = document.querySelectorAll('.progress-step');
let formSteps = document.querySelectorAll('.form-step');
let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');
let submitBtn = document.getElementById('submitBtn');
let templateCards = document.querySelectorAll('.template-card');
const menuField = document.getElementById('menuField');

// Función showStep(step) - VERSION SIMPLE Y ESTABLE
function showStep(step) {
    console.log('🔄 showStep called with step:', step);
    
    // Obtener todos los form steps actualizados
    const currentFormSteps = document.querySelectorAll('.form-step');
    
    if (!currentFormSteps || currentFormSteps.length === 0) {
        console.log('❌ ERROR: No form steps found');
        return;
    }
    
    // Ocultar todos los pasos
    currentFormSteps.forEach(formStep => {
        formStep.style.display = 'none';
        formStep.classList.remove('active');
    });
    
    // Mostrar el paso actual
    const activeStep = document.querySelector(`[data-step="${step}"]`);
    if (activeStep) {
        activeStep.style.display = 'block';
        activeStep.classList.add('active');
        console.log('✅ Step', step, 'is now active');
    } else {
        console.log('❌ ERROR: Step', step, 'not found');
        return;
    }
    
    // Manejar visibilidad de botones
    const currentNextBtn = document.getElementById('nextBtn');
    const currentPrevBtn = document.getElementById('prevBtn');
    const currentSubmitBtn = document.getElementById('submitBtn');
    
    if (currentPrevBtn) {
        currentPrevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
    }
    
    if (currentNextBtn) {
        currentNextBtn.style.display = step < 3 ? 'inline-flex' : 'none';
    }
    
    if (currentSubmitBtn) {
        currentSubmitBtn.style.display = step === 3 ? 'inline-flex' : 'none';
    }

    // Actualizar progreso
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
    console.log('🔄 nextStep called, current step:', currentStep);
    
    // Agregar feedback visual al botón
    if (nextBtn) {
        nextBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            nextBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    if (currentStep < 3) {
        console.log('🔍 Validating current step...');
        if (validateCurrentStep()) {
            console.log('✅ Validation passed, moving to step:', currentStep + 1);
            currentStep++;
            showStep(currentStep);
        } else {
            console.log('❌ Validation failed for step:', currentStep);
        }
    } else {
        console.log('⚠️ Already at last step');
    }
}

function prevStep() {
    console.log('⬅️ prevStep called, current step:', currentStep);
    
    // Agregar feedback visual al botón
    if (prevBtn) {
        prevBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            prevBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Validación de campos
function validateCurrentStep() {
    console.log('validateCurrentStep called for step:', currentStep);
    
    if (currentStep === 1) {
        // Validar que se haya seleccionado una plantilla
        if (!selectedTemplate) {
            alert('Por favor selecciona un tipo de proyecto para continuar.');
            return false;
        }
        console.log('Step 1 validation passed, template:', selectedTemplate);
        return true;
    }
    
    // Para otros pasos, buscar el form step actual
    const currentFormStep = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentFormStep) {
        console.log('No form step found for step:', currentStep);
        return false;
    }
    
    if (currentStep === 2) {
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
        if (emailField) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                emailField.focus();
                alert('Por favor ingresa un email válido.');
                return false;
            }
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
        if (fechaField && fechaField.value) {
            const fechaSeleccionada = new Date(fechaField.value);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            
            if (fechaSeleccionada <= hoy) {
                fechaField.focus();
                alert('La fecha de lanzamiento debe ser posterior al día de hoy.');
                return false;
            }
        }
    }
    
    console.log('Validation passed for step:', currentStep);
    return true;
}

// Selección de Plantilla - Mejorada
function handleTemplateSelection(template) {
    console.log('🎯 Template selected:', template);
    
    selectedTemplate = template;
    
    // Actualizar estilos visuales de las cards
    const allCards = document.querySelectorAll('.template-card');
    allCards.forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.template === template) {
            card.classList.add('selected');
            card.style.border = '2px solid #00d4ff';
            card.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
        } else {
            card.style.border = '2px solid rgba(255, 255, 255, 0.2)';
            card.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
    
    // Mostrar campo adicional para restaurantes
    if (menuField) {
        menuField.style.display = template === 'restaurante' ? 'block' : 'none';
    }
    
    console.log('✅ Template selection completed');
}

// Envío del formulario
function submitForm() {
    console.log('📤 Submitting form...');
    
    if (!validateCurrentStep()) {
        console.log('❌ Final validation failed');
        return;
    }
    
    // Recopilar todos los datos del formulario
    const formDataToSend = new FormData(dynamicForm);
    formDataToSend.append('plantilla', selectedTemplate);
    
    console.log('✅ Form data ready for submission');
    alert(`¡Gracias! Tu proyecto de ${selectedTemplate} ha sido enviado. Te contactaremos pronto.`);
}

// Navegación móvil
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Event Listeners - Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Initializing form');
    
    // Event listeners para navegación móvil
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Event listeners para navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Cerrar menú móvil si está abierto
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Event listener para el CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const formularioSection = document.querySelector('#formulario');
            if (formularioSection) {
                formularioSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Event listeners para template cards
    if (templateCards) {
        templateCards.forEach(card => {
            card.addEventListener('click', function() {
                const template = this.dataset.template;
                handleTemplateSelection(template);
            });
            
            // Compatibilidad móvil
            card.addEventListener('touchend', function(e) {
                e.preventDefault();
                const template = this.dataset.template;
                handleTemplateSelection(template);
            });
        });
    }
    
    // Event listeners para botones de navegación
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📱 Next button clicked');
            nextStep();
        });
        
        nextBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            console.log('📱 Next button touched');
            nextStep();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📱 Prev button clicked');
            prevStep();
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📱 Submit button clicked');
            submitForm();
        });
    }
    
    // Inicializar el formulario en el paso 1
    showStep(1);
    
    console.log('✅ Form initialization completed');
});