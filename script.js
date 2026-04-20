        // Mobile menu toggle

        document.addEventListener('DOMContentLoaded', () => {
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

        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        if (sections.length && navItems.length) {
            window.addEventListener('scroll', () => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href').substring(1) === current) {
                        item.classList.add('active');
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
        const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
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
                img.addEventListener('click', () => {
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
        
        var coll = document.getElementsByClassName("collapsible");
        var i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    });
//Fin
