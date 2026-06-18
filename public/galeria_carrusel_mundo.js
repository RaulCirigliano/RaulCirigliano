const images = [
    // Galería MTP (50 imágenes reales)
    "imagenes/galeria_procesos/mtp/mtp_0.webp",
    "imagenes/galeria_procesos/mtp/mtp_1.webp",
    "imagenes/galeria_procesos/mtp/mtp_1b-1.webp",
    "imagenes/galeria_procesos/mtp/mtp_2.webp",
    "imagenes/galeria_procesos/mtp/mtp_3.webp",
    "imagenes/galeria_procesos/mtp/mtp_3b.webp",
    "imagenes/galeria_procesos/mtp/mtp_3c.webp",
    "imagenes/galeria_procesos/mtp/mtp_3cdb3.webp",
    "imagenes/galeria_procesos/mtp/mtp_4.webp",
    "imagenes/galeria_procesos/mtp/mtp_5a.webp",
    "imagenes/galeria_procesos/mtp/mtp_5b.webp",
    "imagenes/galeria_procesos/mtp/mtp_6.webp",
    "imagenes/galeria_procesos/mtp/mtp_7.webp",
    "imagenes/galeria_procesos/mtp/mtp_8.webp",
    "imagenes/galeria_procesos/mtp/mtp_9.webp",
    "imagenes/galeria_procesos/mtp/mtp_10.webp",
    "imagenes/galeria_procesos/mtp/mtp_11.webp",
    "imagenes/galeria_procesos/mtp/mtp_12.webp",
    "imagenes/galeria_procesos/mtp/mtp_13.webp",
    "imagenes/galeria_procesos/mtp/mtp_14.webp",
    "imagenes/galeria_procesos/mtp/mtp_15.webp",
    "imagenes/galeria_procesos/mtp/mtp_16.webp",
    "imagenes/galeria_procesos/mtp/mtp_16b.webp",
    "imagenes/galeria_procesos/mtp/mtp_17.webp",
    "imagenes/galeria_procesos/mtp/mtp_17b.webp",
    "imagenes/galeria_procesos/mtp/mtp_17c.webp",
    "imagenes/galeria_procesos/mtp/mtp_18.webp",
    "imagenes/galeria_procesos/mtp/mtp_19.webp",
    "imagenes/galeria_procesos/mtp/mtp_20.webp",
    "imagenes/galeria_procesos/mtp/mtp_21.webp",
    "imagenes/galeria_procesos/mtp/mtp_21b.webp",
    "imagenes/galeria_procesos/mtp/mtp_22a.webp",
    "imagenes/galeria_procesos/mtp/mtp_22b.webp",
    "imagenes/galeria_procesos/mtp/mtp_23.webp",
    "imagenes/galeria_procesos/mtp/mtp_24.webp",
    "imagenes/galeria_procesos/mtp/mtp_24b.webp",
    "imagenes/galeria_procesos/mtp/mtp_25.webp",
    "imagenes/galeria_procesos/mtp/mtp_26.webp",
    "imagenes/galeria_procesos/mtp/mtp_26b.webp",
    "imagenes/galeria_procesos/mtp/mtp_27.webp",
    "imagenes/galeria_procesos/mtp/mtp_28.webp",
    "imagenes/galeria_procesos/mtp/mtp_29.webp",
    "imagenes/galeria_procesos/mtp/mtp_30.webp",
    "imagenes/galeria_procesos/mtp/mtp_31.webp",
    "imagenes/galeria_procesos/mtp/mtp_31b.webp",
    "imagenes/galeria_procesos/mtp/mtp_32.webp",
    "imagenes/galeria_procesos/mtp/mtp_33.webp",
    "imagenes/galeria_procesos/mtp/mtp_34.webp",
    "imagenes/galeria_procesos/mtp/mtp_49.webp",
    "imagenes/galeria_procesos/mtp/mtp_50.webp"
];

const sphere = document.getElementById('c_m_sphere');
const lightbox = document.getElementById('c_m_lightbox');
const lightboxImg = document.getElementById('c_m_lightbox-img');
const closeBtn = document.getElementById('c_m_close-btn');
const prevBtn = document.getElementById('c_m_prev-btn');
const nextBtn = document.getElementById('c_m_next-btn');

let currentIndex = 0;
let isLightboxOpen = false;
const radius = window.innerWidth <= 768 ? 200 : 450; // Radio adaptativo para celular

// Construir la esfera usando Fibonacci Sphere (distribuciÃ³n uniforme)
images.forEach((src, i) => {
    // Math para distribuir en esfera de Fibonacci
    const phi = Math.acos(-1 + (2 * i) / images.length);
    const theta = Math.sqrt(images.length * Math.PI) * phi;

    const el = document.createElement('div');
    el.className = 'c_m_image-item';
    
    // Reemplazar espacios por %20 para que la URL sea vÃ¡lida
    const formattedSrc = src.replace(/ /g, '%20');
    el.style.backgroundImage = `url("${formattedSrc}")`;
    
    // Coordenadas cartesianas
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    // Calcular la rotación para que miren hacia afuera
    const ry = Math.atan2(x, z);
    const rx = Math.asin(-y / radius);
    
    // Aplicar transformaciones 3D
    el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${ry}rad) rotateX(${rx}rad)`;
    
    // Al hacer doble click, abrir lightbox
    el.addEventListener('dblclick', (e) => {
        // Prevenir propagación
        e.stopPropagation();
        openLightbox(i);
    });

    sphere.appendChild(el);
});

// Funciones del Lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.remove('c_m_hidden');
    isLightboxOpen = true;
}

function closeLightbox() {
    lightbox.classList.add('c_m_hidden');
    isLightboxOpen = false;
}

function updateLightboxImage() {
    lightboxImg.src = images[currentIndex];
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

// Event Listeners
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// Botón Volver Atrás
const btnBack = document.getElementById('c_m_back_btn');
if (btnBack) {
    btnBack.addEventListener('click', () => window.history.back());
}

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('c_m_hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});

// --- Interacción de Ratón y Animación ---
let isDragging = false;
let isHovering = false;
let previousMousePosition = { x: 0, y: 0 };
let rotX = 0;
let rotY = 0;
let vx = 0;
let vy = 0;


const sceneContainer = document.getElementById('c_m_scene');
const slider = document.getElementById('c_m_slider');

// Sincronizar slider con rotY
function updateSliderFromRotation() {
    if (!slider) return;
    // Normaliza rotY a [0,360]
    let deg = ((rotY % 360) + 360) % 360;
    slider.value = deg;
}

if (slider) {
    slider.addEventListener('input', (e) => {
        rotY = parseFloat(slider.value);
        // Actualiza la rotación inmediatamente
        sphere.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
}

sceneContainer.addEventListener('mouseenter', () => { 
    isHovering = true; 
});

sceneContainer.addEventListener('mouseleave', () => { 
    isHovering = false; 
    vx = 0; 
    vy = 0; 
    isDragging = false; 
});

sceneContainer.addEventListener('mousemove', (e) => {
    if (isLightboxOpen) return;
    
    if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        rotY += deltaX * 0.5;
        rotX -= deltaY * 0.5;
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
    } else if (isHovering) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const normX = (e.clientX - centerX) / centerX;
        const normY = (e.clientY - centerY) / centerY;
        
        // Multiplicador ajusta la velocidad de giro por hover
        vy = normX * 1.5; 
        vx = -normY * 1.5; 
    }
});

sceneContainer.addEventListener('mousedown', (e) => {
    if (isLightboxOpen) return;
    if (e.target.closest('#c_m_lightbox')) return; // No drag en lightbox

    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
    vx = 0;
    vy = 0; // Detener inercia/hover temporalmente
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

function animate() {
    if (!isDragging && isHovering && !isLightboxOpen) {
        rotX += vx;
        rotY += vy;
    } else if (!isDragging && !isHovering && !isLightboxOpen) {
        // Rotación continua muy suave por defecto si no hay hover
        rotY += 0.05;
    }
    if (!isLightboxOpen) {
        sphere.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        updateSliderFromRotation();
    }
    requestAnimationFrame(animate);
}
// Iniciar animación
animate();
