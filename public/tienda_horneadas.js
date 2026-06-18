// Loader: keep brand jolt visible briefly, then fade
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('gone'), 750);
  setTimeout(() => loader.classList.add('hidden'), 1200);
});
// Fallback if 'load' is slow
setTimeout(() => {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('gone');
    setTimeout(() => loader.classList.add('hidden'), 500);
  }
}, 1200);

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Menú de navegación móvil
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isExpanded);
});

// Cierra el menú al hacer clic en un enlace
navLinksContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Move sticky CTA when it overlaps the footer disclaimer
const stickyCta = document.querySelector('.sticky-cta');
const disclaimEl = document.querySelector('.disclaim');

if (stickyCta && disclaimEl) {
  const observer = new IntersectionObserver(
    ([entry]) => stickyCta.classList.toggle('is-at-bottom', entry.isIntersecting),
    { threshold: 0.1 }
  );
  observer.observe(disclaimEl);
}

// ==========================================================================
// LÓGICA DE COMPRA Y CONTACTO (WhatsApp)
// ==========================================================================

// Función para seleccionar una obra de la grilla
window.seleccionarYComprar = function(elemento, nombreObra) {
  // 1. Remueve la selección visual previa de cualquier otra tarjeta
  document.querySelectorAll('.work').forEach(el => {
    el.style.outline = 'none';
    el.style.transform = 'scale(1)';
  });
  
  // 2. Muestra la obra actual como "seleccionada" (resaltada)
  elemento.style.outline = '3px solid #8B5A2B';
  elemento.style.transform = 'scale(1.02)';
  elemento.style.transition = 'all 0.3s ease';

  // 3. Genera la URL segura y destaca el nombre en WhatsApp (en negrita)
  const telefono = '5491126608813';
  const mensaje = `Hola Raúl, me interesa comprar la obra *${nombreObra}*. ¿Sigue disponible?`;
  const urlSegura = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  
  // 4. Abre WhatsApp en una pestaña nueva
  window.open(urlSegura, '_blank');
};

// Evento para el formulario de WhatsApp al final de la página
const whatsappForm = document.getElementById('whatsapp-form');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const text = document.getElementById('whatsapp-message').value;
    if (text.trim()) {
      const phone = '5491126608813';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank').focus();
    } else {
      alert('Por favor, escribe un mensaje antes de enviar.');
    }
  });
}