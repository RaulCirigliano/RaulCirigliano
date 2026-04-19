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
                    
                    if (pageYOffset >= (sectionTop - 200)) {
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
                        if (filter === 'all') {
                            item.style.display = 'block';
                        } else if (filter === 'disponible') {
                            if (item.getAttribute('data-available') === 'true') {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        } else if (item.getAttribute('data-category') === filter) {
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
        
        // Checkout modal functionality

        const checkoutModal = document.getElementById('checkout-modal');
        const closeCheckout = document.getElementById('close-checkout');
        const checkoutForm = document.getElementById('checkout-form');
        const successMessage = document.getElementById('success-message');
        const closeSuccess = document.getElementById('close-success');
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        
        if (checkoutModal && closeCheckout && checkoutForm && successMessage && closeSuccess && addToCartButtons.length) {
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productCard = button.closest('.product-card');
                    const productId = productCard.getAttribute('data-id');
                    const productName = productCard.querySelector('.product-title').textContent;
                    const productPrice = productCard.querySelector('.product-price').textContent;
                    
                    document.getElementById('product-id').value = productId;
                    document.getElementById('product-name').value = productName;
                    document.getElementById('product-price').value = productPrice;
                    
                    checkoutModal.style.display = 'flex';
                });
            });
            
            closeCheckout.addEventListener('click', () => {
                checkoutModal.style.display = 'none';
            });
            
            closeSuccess.addEventListener('click', () => {
                checkoutModal.style.display = 'none';
                successMessage.style.display = 'none';
                checkoutForm.reset();
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === checkoutModal) {
                    checkoutModal.style.display = 'none';
                }
            });
        }
        
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data

                const formData = {
                    productId: document.getElementById('product-id').value,
                    productName: document.getElementById('product-name').value,
                    productPrice: document.getElementById('product-price').value,
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    country: document.getElementById('country').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    zip: document.getElementById('zip').value,
                    message: document.getElementById('message').value
                };
                
                // In a real application, you would send this data to your server
                // which would then send an email notification
                // Simulate email sending

                console.log('Datos de compra:', formData);
                console.log('Email de notificación enviado al artista');
                console.log('Email de confirmación enviado al comprador:', formData.email);
                
                // Show success message

                checkoutForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Mark product as sold

                const productCard = document.querySelector(`.product-card[data-id="${formData.productId}"]`);
                if (productCard) {
                    productCard.setAttribute('data-available', 'false');
                    productCard.querySelector('.add-to-cart-btn').classList.replace('btn', 'btn-disabled');
                    productCard.querySelector('.add-to-cart-btn').textContent = 'Agotado';
                    productCard.querySelector('.add-to-cart-btn').disabled = true;
                    productCard.querySelector('.sold-out-badge').style.display = 'block';
                }
                
                // Update gallery items

                const galleryItem = document.querySelector(`.gallery-item[data-id="${formData.productId}"]`);
                if (galleryItem) {
                    galleryItem.setAttribute('data-available', 'false');
                    galleryItem.querySelector('.sold-out-badge').style.display = 'block';
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
        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.classList.contains("open")) {
                    content.classList.remove("open");
                    content.style.maxHeight = null;
                } else {
                    content.classList.add("open");
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });
//Fin