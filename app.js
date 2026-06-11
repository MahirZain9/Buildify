/**
 * Buildify Premium Home Services - JavaScript Logic
 * Contains: Before/After Slider, Scroll Animations, Mobile Navigation, and Sticky Header
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Header scroll transition
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case page starts scrolled

    // 2. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            // Prevent scrolling behind mobile menu when open
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav when clicking on a nav link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Interactive Before/After Image Comparison Slider
    const slider = document.getElementById('comparisonSlider');
    
    if (slider) {
        let isDragging = false;

        const updateSliderPosition = (clientX) => {
            const rect = slider.getBoundingClientRect();
            const x = clientX - rect.left;
            
            // Calculate percentage
            let percentage = (x / rect.width) * 100;
            
            // Clamp percentage between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            // Update CSS custom property
            slider.style.setProperty('--clip-pos', `${percentage}%`);
        };

        // Event listeners using PointerEvents for universal mouse/touch support
        slider.addEventListener('pointerdown', (e) => {
            // Only respond to left clicks or touch inputs
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            
            isDragging = true;
            updateSliderPosition(e.clientX);
            slider.setPointerCapture(e.pointerId);
        });

        slider.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            updateSliderPosition(e.clientX);
        });

        const stopDragging = (e) => {
            if (!isDragging) return;
            isDragging = false;
            slider.releasePointerCapture(e.pointerId);
        };

        slider.addEventListener('pointerup', stopDragging);
        slider.addEventListener('pointercancel', stopDragging);
    }

    // 4. Scroll triggered animations (Intersection Observer)
    const animatableElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // relative to viewport
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // offset bottom slightly for better visual timing
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatableElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        animatableElements.forEach(element => {
            element.classList.add('appear');
        });
    }
});
