// ====== FORMULARIO DE PROYECTO - COMPLETAMENTE NUEVO ======

// Variables principales
let currentStep = 1;
let selectedProject = '';
let formData = {};

// Referencias DOM
const form = document.getElementById('projectForm');
const progressFill = document.getElementById('progressFill');
const progressSteps = document.querySelectorAll('.progress-step');
const stepContents = document.querySelectorAll('.step-content');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');

// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButton = document.querySelector('.cta-button');

// ====== FUNCIONES PRINCIPALES ======

function showStep(stepNumber) {
    console.log(`📍 Mostrando paso ${stepNumber}`);
    
    // Ocultar todos los pasos
    stepContents.forEach(step => {
        step.classList.remove('active');
    });
    
    // Mostrar paso actual
    const activeStep = document.getElementById(`step-${stepNumber}`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
    
    // Actualizar barra de progreso
    const progressWidth = (stepNumber / 3) * 100;
    progressFill.style.width = `${progressWidth}%`;
    
    // Actualizar steps indicator
    progressSteps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < stepNumber) {
            step.classList.add('completed');
        } else if (stepNum === stepNumber) {
            step.classList.add('active');
        }
    });
    
    // Manejar visibilidad de botones
    prevButton.style.display = stepNumber > 1 ? 'block' : 'block';
    prevButton.disabled = stepNumber === 1;
    
    nextButton.style.display = stepNumber < 3 ? 'block' : 'none';
    submitButton.style.display = stepNumber === 3 ? 'block' : 'none';
    
    currentStep = stepNumber;
}

function nextStep() {
    console.log(`➡️ Intentando avanzar desde paso ${currentStep}`);
    
    if (validateStep(currentStep)) {
        if (currentStep < 3) {
            showStep(currentStep + 1);
            // Scroll suave hacia la parte superior del formulario
            const formularioSection = document.querySelector('#formulario');
            if (formularioSection) {
                formularioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
}

function prevStep() {
    console.log(`⬅️ Retrocediendo desde paso ${currentStep}`);
    
    if (currentStep > 1) {
        showStep(currentStep - 1);
        // Scroll suave hacia la parte superior del formulario
        const formularioSection = document.querySelector('#formulario');
        if (formularioSection) {
            formularioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function validateStep(stepNum) {
    console.log(`🔍 Validando paso ${stepNum}`);
    
    if (stepNum === 1) {
        if (!selectedProject) {
            alert('Por favor selecciona un tipo de proyecto para continuar.');
            return false;
        }
        console.log(`✅ Paso 1 válido - Proyecto: ${selectedProject}`);
        return true;
    }
    
    if (stepNum === 2) {
        const requiredFields = ['nombre', 'empresa', 'email'];
        
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                alert(`Por favor completa el campo: ${field ? field.previousElementSibling.textContent : fieldId}`);
                if (field) field.focus();
                return false;
            }
        }
        
        // Validar email
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingresa un email válido.');
            document.getElementById('email').focus();
            return false;
        }
        
        console.log('✅ Paso 2 válido');
        return true;
    }
    
    if (stepNum === 3) {
        const requiredFields = ['presupuesto', 'timeline'];
        
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                alert(`Por favor completa el campo: ${field ? field.previousElementSibling.textContent : fieldId}`);
                if (field) field.focus();
                return false;
            }
        }
        
        console.log('✅ Paso 3 válido');
        return true;
    }
    
    return true;
}

function selectProject(projectType) {
    console.log(`🎯 Proyecto seleccionado: ${projectType}`);
    
    // Remover selección anterior
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Seleccionar nuevo proyecto
    const selectedCard = document.querySelector(`[data-project="${projectType}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        selectedProject = projectType;
    }
}

function submitForm(e) {
    e.preventDefault();
    console.log('📤 Enviando formulario...');
    
    if (!validateStep(3)) {
        return;
    }
    
    // **CAPTURA DE DATOS PARA WHATSAPP**
    // Obtener valores de todos los campos
    const nombre = document.getElementById('nombre').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const instagram = document.getElementById('instagram').value.trim();
    const sitioActual = document.getElementById('sitio_actual').value.trim();
    const presupuesto = document.getElementById('presupuesto').value;
    const timeline = document.getElementById('timeline').value;
    const comentarios = document.getElementById('comentarios').value.trim();
    const plantilla = selectedProject;
    
    // **FORMATO DEL MENSAJE PROFESIONAL**
    let mensaje = `¡Hola Nodus! 👋\n\n`;
    mensaje += `Mi nombre es *${nombre}* de la marca *${empresa}*.\n`;
    mensaje += `Me interesa el paquete de *${plantilla}*.\n\n`;
    mensaje += `📊 *Detalles del proyecto:*\n`;
    mensaje += `• Presupuesto: ${presupuesto}\n`;
    mensaje += `• Timeline: ${timeline}\n`;
    mensaje += `• Email: ${email}\n`;
    
    if (telefono) {
        mensaje += `• Teléfono: ${telefono}\n`;
    }
    
    if (instagram) {
        mensaje += `• Instagram: ${instagram}\n`;
    }
    
    if (sitioActual) {
        mensaje += `• Sitio actual: ${sitioActual}\n`;
    }
    
    if (comentarios) {
        mensaje += `\n💬 *Comentarios adicionales:*\n${comentarios}\n`;
    }
    
    mensaje += `\nme puedes ampl iar la información sobre este proyecto? ¡Gracias! 🙌`;
    
    // **NÚMERO DE TELÉFONO DE NODUS**
    const numeroWhatsApp = '573052433816'; // Tu número de WhatsApp
    
    // **CODIFICACIÓN Y ENLACE A WHATSAPP**
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    console.log('📋 Datos capturados para WhatsApp:');
    console.log('Nombre:', nombre);
    console.log('Empresa:', empresa);
    console.log('Proyecto:', plantilla);
    console.log('Presupuesto:', presupuesto);
    console.log('URL WhatsApp:', urlWhatsApp);
    
    // **REDIRECCIÓN A WHATSAPP**
    window.open(urlWhatsApp, '_blank');
    
    // Mensaje de confirmación
    alert(`¡Perfecto! Serás redirigido a WhatsApp para enviar tu solicitud de ${plantilla}. ¡Nos pondremos en contacto contigo pronto!`);
    
    // **RESETEAR FORMULARIO Y VOLVER AL INICIO**
    form.reset();
    selectedProject = '';
    
    // Remover selección de project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Volver al paso 1
    showStep(1);
    
    // OCULTAR FORMULARIO Y VOLVER AL INICIO
    const formularioSection = document.querySelector('#formulario');
    if (formularioSection) {
        formularioSection.classList.add('hidden');
        formularioSection.classList.remove('show');
    }
    
    // Scroll suave al inicio de la página
    setTimeout(() => {
        const inicioSection = document.querySelector('#inicio');
        if (inicioSection) {
            inicioSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
    
    console.log('✅ Formulario enviado por WhatsApp y reseteado');
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// ====== EVENT LISTENERS ======

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando formulario de proyecto');
    
    // Navegación móvil
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navegación suave
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
    
    // CTA button - MOSTRAR FORMULARIO AL HACER CLIC
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostrar el formulario
            const formularioSection = document.querySelector('#formulario');
            if (formularioSection) {
                formularioSection.classList.remove('hidden');
                formularioSection.classList.add('show');
                
                // Scroll suave al formulario después de un pequeño delay
                setTimeout(() => {
                    formularioSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
    }
    
    // Selección de proyecto
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectType = this.getAttribute('data-project');
            selectProject(projectType);
        });
    });
    
    // Botones de navegación
    if (nextButton) {
        nextButton.addEventListener('click', nextStep);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevStep);
    }
    
    if (submitButton) {
        submitButton.addEventListener('click', submitForm);
    }
    
    // Prevenir envío por defecto del formulario
    if (form) {
        form.addEventListener('submit', submitForm);
    }
    
    // Inicializar en paso 1
    showStep(1);
    
    console.log('✅ Formulario inicializado correctamente');
});