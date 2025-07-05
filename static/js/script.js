document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    }

    // --- 2. Fade-in on Scroll Animation ---
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);
        faders.forEach(fader => appearOnScroll.observe(fader));
    }

    // --- 3. Dark/Light Mode Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const htmlElement = document.documentElement;

    if (themeToggle && themeToggleIcon) {
        // Function to apply the theme
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                htmlElement.classList.add('dark-mode');
                themeToggleIcon.classList.remove('fa-moon');
                themeToggleIcon.classList.add('fa-sun');
            } else {
                htmlElement.classList.remove('dark-mode');
                themeToggleIcon.classList.remove('fa-sun');
                themeToggleIcon.classList.add('fa-moon');
            }
        };

        // Function to toggle the theme and save preference
        const toggleTheme = () => {
            const currentTheme = htmlElement.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
            applyTheme(currentTheme);
        };

        // Add click listener to the button
        themeToggle.addEventListener('click', toggleTheme);

        // Check for saved theme in localStorage or OS preference on page load
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('light'); // Default
        }
    }
});



document.addEventListener("DOMContentLoaded", function() {

    // (Your existing code for navbar, fade-in, etc. goes here)

    // --- 4. Logic for Dynamic Certificate Modal ---
    const credentialModal = document.getElementById('credentialModal');
    if (credentialModal) {
        credentialModal.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            const button = event.relatedTarget; 
            
            // Extract info from data-bs-* attributes
            const imagePaths = button.getAttribute('data-images');
            const imageTitle = button.getAttribute('data-image-title');

            // Update the modal's title
            const modalTitle = credentialModal.querySelector('.modal-title');
            modalTitle.textContent = imageTitle;

            // Get the carousel elements
            const carouselIndicators = credentialModal.querySelector('#modalCarouselIndicators');
            const carouselInner = credentialModal.querySelector('#modalCarouselInner');
            const carouselControls = credentialModal.querySelectorAll('.carousel-control-prev, .carousel-control-next');

            // Clear previous carousel content
            carouselIndicators.innerHTML = '';
            carouselInner.innerHTML = '';

            // Split the comma-separated image paths into an array
            const imageUrls = imagePaths.split(',');

            // If there's only one image, hide the controls and indicators
            if (imageUrls.length <= 1) {
                carouselControls.forEach(control => control.style.display = 'none');
                carouselIndicators.style.display = 'none';
            } else {
                carouselControls.forEach(control => control.style.display = 'block');
                carouselIndicators.style.display = 'flex';
            }

            // Loop through the image URLs and create carousel items
            imageUrls.forEach((url, index) => {
                const isActive = index === 0 ? 'active' : '';

                // Create indicator
                const indicator = `<button type="button" data-bs-target="#credentialCarousel" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
                carouselIndicators.innerHTML += indicator;

                // Create carousel item
                const item = `
                    <div class="carousel-item ${isActive}">
                        <img src="${url.trim()}" class="d-block w-100" alt="${imageTitle} - Slide ${index + 1}">
                    </div>
                `;
                carouselInner.innerHTML += item;
            });
        });
    }
});