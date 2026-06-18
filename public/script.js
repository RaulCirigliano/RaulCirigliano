// ==========================================================================
// GOOGLE ANALYTICS (GA4)
// ==========================================================================
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-WRJ2MJ2CMF';
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WRJ2MJ2CMF');

// Mobile menu toggle

    // ==========================================================================
    // INYECCIÓN DINÁMICA DE LA NAVEGACIÓN DE TIENDA
    // ==========================================================================
    function injectShopNavigation() {
        // Determine current page to set the active button
        let currentPath = window.location.pathname.split('/').pop();
        currentPath = decodeURIComponent(currentPath).split('?')[0].split('#')[0];
        if (currentPath === '' || currentPath === 'index.html') {
            currentPath = 'inicio.html'; // Default case
        }

        const isHorneadas = currentPath === 'tienda_horneadas.html';
        const isTienda = currentPath === 'tienda.html';
        const isJuegos = currentPath === 'tienda_juegos.html';

        const shopNavContent = `
            <div class="view-more">
                <button class="horneadas_btn ${isHorneadas ? 'active' : ''}" onclick="window.location.href='tienda_horneadas.html'">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Obras</span>
                </button>
                 <button class="horneadas_btn ${isJuegos ? 'active' : ''}" onclick="window.location.href='tienda_juegos.html'">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Juegos</span>
                </button>
                <button class="horneadas_btn ${isTienda ? 'active' : ''}" onclick="window.location.href='tienda.html'">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Guia</span>
                </button>
            </div>
        `;

        const placeholders = document.querySelectorAll('.shop-navigation-placeholder');
        placeholders.forEach(placeholder => {
            placeholder.innerHTML = shopNavContent;
        });
    }

    // ==========================================================================
    // LÓGICA DE INTERACCIÓN (Espera a que cargue la página)
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {

        // ==========================================================================
        // OCULTAR HEADER Y FOOTER EN GALERÍAS ESPECÍFICAS
        // ==========================================================================
        const rutaActual = window.location.pathname.toLowerCase();
        const ocultarHeaderFooter = rutaActual.includes("galeria_obras") || 
                                    rutaActual.includes("galeria_terminadas") ||
                                    rutaActual.includes("carrusel") ||
                                    rutaActual.includes("galeria_calesita") ||
                                    rutaActual.includes("letras_personal") ||
                                    rutaActual.includes("letras_tecno_anima") ||
                                    rutaActual.includes("letras_ensayos") ||
                                    rutaActual.includes("ventas") ||
                                    rutaActual.includes("tienda.html") ||
                                    rutaActual.includes("tienda_juegos") ||
                                    rutaActual.includes("contacto") ||
                                    rutaActual.includes("tienda_horneadas");
        
        if (ocultarHeaderFooter) {
            const headerEl = document.querySelector("header");
            const footerEl = document.querySelector("footer");
            if (headerEl) headerEl.style.display = "none";
            if (footerEl) footerEl.style.display = "none";

            // Contenedor para botones flotantes
            const btnContainer = document.createElement("div");
            btnContainer.className = "botones-flotantes-container";

            // Botón flotante de Volver
            const btnVolver = document.createElement("button");
            btnVolver.innerHTML = '<i class="fas fa-arrow-left"></i> Volver';
            btnVolver.className = "btn-volver-galeria";
            btnVolver.onclick = () => {
                if (document.referrer.includes(window.location.host)) {
                    window.history.back(); // Vuelve a la página anterior
                } else {
                    window.location.href = 'galeria.html'; // Si abrió en pestaña nueva, va a Galerías
                }
            };

            // Botón flotante hacia Galerías
            const btnGalerias = document.createElement("button");
            btnGalerias.innerHTML = '<i class="fas fa-th"></i> Galerías';
            btnGalerias.className = "btn-volver-galeria";
            btnGalerias.onclick = () => {
                window.location.href = 'galeria.html';
            };

            btnContainer.appendChild(btnVolver);
            btnContainer.appendChild(btnGalerias);
            document.body.appendChild(btnContainer);
        }

        injectShopNavigation(); // Inyecta la barra de navegación de la tienda

        // ==========================================================================
        // RASTREO DE CLICS EN WHATSAPP (GA4 Directo)
        // ==========================================================================
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', () => {
                if (typeof gtag === 'function') {
                    gtag('event', 'clic_whatsapp');
                }
            });
        });

        const mobileMenuBtn = document.getElementById('mobile-menu');
        const navLinks = document.getElementById('nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        }
        
        // Update active navigation link on scroll

        // Then handle scroll-spy for internal sections if they exist
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');

        // Detectar en qué página estamos, ignorando si el servidor oculta el ".html"
        let currentPath = window.location.pathname.split('/').pop();
        currentPath = decodeURIComponent(currentPath).split('?')[0].split('#')[0]; // Limpiar la URL de extras y decodificar
        
        if (currentPath === '' || currentPath === 'index.html') {
            currentPath = 'inicio.html';
        }
        
        const currentBase = currentPath.replace('.html', '').toLowerCase();
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href) {
                const decodedHref = decodeURIComponent(href);
                const hrefBase = decodedHref.replace('.html', '').split('?')[0].split('#')[0].toLowerCase();
                
                // Definimos qué subpáginas pertenecen a qué sección principal del menú
                const galeriaSubpages = ['galeria_obras_proceso', 'galeria_obras_terminadas', 'galeria_carrusel_mundo', 'galeria_calesita', 'letras_ensayos', 'letras_personal', 'letras_tecno_anima'];
                const ventasSubpages = ['tienda_horneadas', 'tienda_juegos', 'tienda'];

                // Si las bases coinciden, aplicamos la clase active
                if (hrefBase === currentBase) {
                    item.classList.add('active');
                } else if ((hrefBase === 'galerias' && galeriaSubpages.includes(currentBase)) || (hrefBase === 'tienda' && ventasSubpages.includes(currentBase))) {
                    item.classList.add('active');
                } else if (hrefBase === 'guia_del_hacer' && currentBase.startsWith('guia_del_hacer_')) {
                    item.classList.add('active');
                }
            }
        });
        
        if (sections.length && navItems.length) {
            window.addEventListener('scroll', () => {
                let current = '';
                const { scrollY } = window;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navItems.forEach(item => {
                    const href = item.getAttribute('href');
                    if (href && href.includes('#')) {
                        const [pathPart, hashPart] = href.split('#');
                        const decodedPathPart = decodeURIComponent(pathPart).split('?')[0].replace('.html', '').toLowerCase();
                        const isCurrentPage = pathPart === '' || decodedPathPart === currentBase;
                        
                        if (isCurrentPage) {
                            if (current && hashPart === current) {
                                item.classList.add('active');
                            } else {
                                item.classList.remove('active');
                            }
                        }
                    }
                });
            });
        }
        
        // Gallery filtering

        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (filterButtons.length && galleryItems.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        }

        // Image zoom modal

        const imageModal = document.getElementById('image-modal');
        const imageModalImg = document.getElementById('image-modal-img');
        const imageModalClose = document.getElementById('image-modal-close');
        const imageModalNext = document.getElementById('image-modal-next');
        const imageModalPrev = document.getElementById('image-modal-prev');
        const galleryImages = Array.from(document.querySelectorAll('.gallery-item img, .slide img'));
        let currentImageIndex = 0;

        function openImageModal(index) {
            currentImageIndex = index;
            const img = galleryImages[index];
            imageModalImg.src = img.src;
            imageModalImg.alt = img.alt || 'Imagen ampliada';
            imageModal.classList.add('open');
        }

        if (imageModal && imageModalImg && imageModalClose && imageModalNext && imageModalPrev && galleryImages.length) {
            galleryImages.forEach((img, index) => {
                img.addEventListener('dblclick', () => {
                    openImageModal(index);
                });
            });

            imageModalNext.addEventListener('click', (event) => {
                event.stopPropagation();
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                openImageModal(currentImageIndex);
            });

            imageModalPrev.addEventListener('click', (event) => {
                event.stopPropagation();
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                openImageModal(currentImageIndex);
            });

            imageModalClose.addEventListener('click', () => {
                imageModal.classList.remove('open');
                imageModalImg.src = '';
            });

            imageModal.addEventListener('click', (event) => {
                if (event.target === imageModal) {
                    imageModal.classList.remove('open');
                    imageModalImg.src = '';
                }
            });
        }
        
        // Contact form submission

        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Here you would normally send the form data to a server

                alert('¡Gracias por tu mensaje! Te contactaré pronto.');
                contactForm.reset();
            });
        }
       
        // Mil millones de años de soledad
        // Colapsable
        
        const collapsibles = document.querySelectorAll(".collapsible");
        collapsibles.forEach(button => {
            button.addEventListener("click", function() {
                this.classList.toggle("active");
            });
        });

        // Video modal
        const videoModal = document.getElementById('video-modal');
        const videoModalIframe = document.getElementById('video-modal-iframe');
        const videoModalClose = document.getElementById('video-modal-close');
        const videoItems = document.querySelectorAll('.video-item');

        if (videoModal && videoModalIframe && videoModalClose && videoItems.length) {
            videoItems.forEach(item => {
                item.addEventListener('click', () => {
                    const videoId = item.getAttribute('data-video-id');
                    videoModalIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
                    videoModal.classList.add('open');
                });
            });

            videoModalClose.addEventListener('click', () => {
                videoModal.classList.remove('open');
                videoModalIframe.src = '';
            });

            videoModal.addEventListener('click', (event) => {
                if (event.target === videoModal) {
                    videoModal.classList.remove('open');
                    videoModalIframe.src = '';
                }
            });
        }

        // ==========================================================================
        // Efectos de Scroll: Smart Header, Footer y Botón Volver Arriba
        // ==========================================================================
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");
        
        // Crear el botón Volver Arriba dinámicamente
        const backToTopBtn = document.createElement("button");
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = "back-to-top-btn";
        document.body.appendChild(backToTopBtn);

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        if (header) header.style.transition = "transform 0.4s ease";
        if (footer) footer.style.transition = "opacity 0.4s ease, visibility 0.4s ease";

        // Optimización: Aplicar transición a la barra lateral una sola vez si existe
        const sidebar = document.querySelector("nav.sticky");
        if (sidebar) {
            sidebar.style.transition = "top 0.4s ease, height 0.4s ease";
        }

        let lastScrollY = window.scrollY;
        let reachedFooter = false;

        window.addEventListener("scroll", () => {
            const { scrollY, innerWidth, innerHeight } = window;
            
            // 1. Smart Header (Ocultar al bajar, mostrar al subir)
            if (header) {
                if (scrollY > lastScrollY && scrollY > 100) {
                    header.style.transform = "translateY(-100%)";
                    if (sidebar) { 
                        sidebar.style.top = "0px"; 
                        if (innerWidth >= 768) sidebar.style.height = "100vh"; 
                    }
                } else {
                    header.style.transform = "translateY(0)";
                    if (sidebar) { 
                        sidebar.style.top = "100px"; 
                        if (innerWidth >= 768) sidebar.style.height = "calc(100vh - 100px)"; 
                    }
                }
                
                if (sidebar && innerWidth < 768) sidebar.style.height = "";
            }

            // 2. Botón Volver Arriba
            if (scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }

            // 3. Footer Desvanecible (Se oculta suavemente al subir luego de llegar al fondo)
            if (footer) {
                const { style } = footer;
                const { offsetHeight } = document.body;
                const isAtBottom = (innerHeight + scrollY) >= offsetHeight - 50;
                if (isAtBottom) {
                    reachedFooter = true;
                    style.opacity = "1";
                    style.visibility = "visible";
                } else if (reachedFooter && scrollY < lastScrollY && !isAtBottom) {
                    style.opacity = "0";
                    style.visibility = "hidden";
                    reachedFooter = false;
                } else if (scrollY > lastScrollY) {
                    style.opacity = "1";
                    style.visibility = "visible";
                }
            }

            lastScrollY = scrollY;
        });

        // ==========================================================================
        // REPRODUCTOR Y CARRUSEL DE VIDEOS
        // ==========================================================================
        const player = document.getElementById("main-video-player");
        const mainThumb = document.getElementById("main-video-thumb");
        const mainTitle = document.getElementById("main-video-title");
        const customCarouselItems = document.querySelectorAll(".carousel-item");
        
        if (player && mainThumb && mainTitle && customCarouselItems.length) {
            const activeItem = document.querySelector(".carousel-item.active");
            if (activeItem) mainTitle.textContent = activeItem.dataset.title;
            
            player.addEventListener("click", function() {
                const videoId = this.dataset.videoId;
                if (this.querySelector("iframe")) return;
                const iframe = document.createElement("iframe");
                iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
                iframe.setAttribute("title", mainTitle.textContent);
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
                iframe.setAttribute("allowfullscreen", "1");
                iframe.style.position = "absolute";
                iframe.style.top = "0";
                iframe.style.left = "0";
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                this.appendChild(iframe);
            });
            
            customCarouselItems.forEach(item => {
                item.addEventListener("click", function() {
                    customCarouselItems.forEach(i => i.classList.remove("active"));
                    this.classList.add("active");
                    const newVideoId = this.dataset.id;
                    player.dataset.videoId = newVideoId;
                    mainTitle.textContent = this.dataset.title;
                    
                    const existingIframe = player.querySelector("iframe");
                    if (existingIframe) existingIframe.remove();
                    
                    mainThumb.src = `https://img.youtube.com/vi/${newVideoId}/maxresdefault.jpg`;
                });
            });
        }
    });

// ==========================================================================
// EFECTO PARALLAX DE ENTRADA (index.html)
// Se mueve fuera de DOMContentLoaded para asegurar su ejecución sin conflictos,
// ya que el script se carga al final del body y los elementos ya existen.
// ==========================================================================
const entryMain = document.querySelector('.site-entry');
const entryGrid = document.querySelector('.site-entry-grid');

if (entryMain && entryGrid) {
    const updateMotion = (event) => {
        const rect = entryMain.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        entryGrid.style.setProperty('--entry-move-x', `${offsetX}px`);
        entryGrid.style.setProperty('--entry-move-y', `${offsetY}px`);
    };
    const resetMotion = () => {
        entryGrid.style.setProperty('--entry-move-x', '0px');
        entryGrid.style.setProperty('--entry-move-y', '0px');
    };
    entryMain.addEventListener('pointermove', updateMotion);
    entryMain.addEventListener('pointerleave', resetMotion);
}
//Fin
