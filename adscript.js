
document.addEventListener('DOMContentLoaded', function() {
    // Video popup on page load
    const videoPopup = document.createElement('div');
    videoPopup.className = 'video-popup active'; // Add active class for visibility
    videoPopup.innerHTML = `
        <div class="video-popup-content">
            <button class="close-popup">&times;</button>
            <video controls autoplay>
                <source src="assets/admissions/admissions_2025.mp4" type="video/mp4" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    document.body.appendChild(videoPopup);
    // Set to display the video popup initially
    setTimeout(() => {
        videoPopup.style.display = 'flex';
    }, 1000);
    // Close functionality
    document.querySelector('.close-popup').addEventListener('click', () => {
        videoPopup.remove(); // Explicitly remove the popup
    });

    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Specializations Slider
    const slider = document.querySelector('.spec-slider');
    const cards = document.querySelectorAll('.spec-card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let autoSlideInterval;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 32;
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
    }

    function createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        for (let i = 0; i <= cards.length - 1; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
        slider.parentElement.appendChild(dotsContainer);
    }

    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = currentIndex >= cards.length - 1 ? 0 : currentIndex + 1;
        updateSlider();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    createDots();
    resetAutoSlide();

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex <= 0 ? cards.length - 3 : currentIndex - 1;
        updateSlider();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    slider.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.parentElement.addEventListener('mouseleave', resetAutoSlide);

    // Testimonial Toggle
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const videoTestimonial = document.querySelector('.video-testimonial');
    const writtenTestimonials = document.querySelector('.written-testimonials');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.dataset.type === 'video') {
                videoTestimonial.classList.add('active');
                writtenTestimonials.classList.remove('active');
            } else {
                videoTestimonial.classList.remove('active');
                writtenTestimonials.classList.add('active');
            }
        });
    });

    // Video testimonial slider functionality
    const videoContainer = document.querySelector('.video-container');
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    let currentVideoIndex = 0;
    let videoSliderInterval;

    function createVideoNav() {
        const navContainer = document.createElement('div');
        navContainer.className = 'video-nav';
        videoPlaceholders.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `video-nav-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => showVideo(index));
            navContainer.appendChild(dot);
        });
        videoContainer.appendChild(navContainer);
    }

    function showVideo(index) {
        videoPlaceholders.forEach((placeholder, i) => {
            placeholder.style.transform = `translateX(-${index * 100}%)`;
            document.querySelectorAll('.video-nav-dot')[i].classList.toggle('active', i === index);
        });
        currentVideoIndex = index;
    }

    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videoPlaceholders.length;
        showVideo(currentVideoIndex);
    }

    function startVideoSlider() {
        videoSliderInterval = setInterval(nextVideo, 5000);
    }

    createVideoNav();
    startVideoSlider();

    videoContainer.addEventListener('mouseenter', () => clearInterval(videoSliderInterval));
    videoContainer.addEventListener('mouseleave', startVideoSlider);

    // Video play button functionality
    const playBtns = document.querySelectorAll('.play-btn');
    playBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoId = this.dataset.videoId || 'your-video-id';
            const videoPopup = document.createElement('div');
            videoPopup.className = 'video-popup';
            videoPopup.innerHTML = `
                <div class="video-popup-content">
                    <button class="close-popup">&times;</button>
                    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                </div>
            `;
            document.body.appendChild(videoPopup);

            videoPopup.querySelector('.close-popup').addEventListener('click', () => {
                videoPopup.remove();
            });
        });
    });

    // Apply button click handler
    const applyBtn = document.querySelector('.apply-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            alert('Application form would open here');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelector('.slides');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');

            
            let currentSlide = 0;
            const slideCount = document.querySelectorAll('.slide').length;
            
            // Function to update slide position
            function updateSlidePosition() {
                slides.style.transform = translateX(-${currentSlide * 20}%);
                
    
            }
            
            // Next slide
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlidePosition();
            }
            
            // Previous slide
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlidePosition();
            }
            
            // Event listeners
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            

            
            // Auto slide
            let slideInterval = setInterval(nextSlide, 5000);
            
            // Pause auto slide on hover
            const sliderContainer = document.querySelector('.slider-container');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            });
        });
        
        window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('download') === '1') {
                const link = document.createElement('a');
                link.href = 'assets/admissions/Admission prospectus 2025-2027.pdf';
                link.download = '';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // Clean up the URL so ?download=1 disappears
                window.history.replaceState(null, null, window.location.pathname);
            }
        });
        