// RTL Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('rtl-toggle');
    const html = document.documentElement;
    
    // Check local storage
    const currentDir = localStorage.getItem('dir') || 'ltr';
    html.setAttribute('dir', currentDir);
    updateFont(currentDir);

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newDir = html.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateFont(newDir);
        });
    }

    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        initAnimations();
    }

    // Mobile Menu Logic - Enhanced for all pages
    initMobileMenu();

    // Initialize Scroll Reveal Animations
    initScrollReveal();

    // Initialize smooth scroll for anchor links
    initSmoothScroll();

    // Initialize counter animations
    initCounterAnimations();

    // Initialize parallax effects
    initParallax();
});

// ========== SCROLL REVEAL ANIMATIONS ==========
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after revealing
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== COUNTER ANIMATIONS ==========
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    
    let start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = prefix + current.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target.toLocaleString() + suffix;
        }
    }

    requestAnimationFrame(updateCounter);
}

// ========== PARALLAX EFFECTS ==========
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });
}

// ========== MAGNETIC BUTTON EFFECT ==========
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Enhanced Mobile Menu Initialization
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if(mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu(mobileMenu);
        });
    }

    if(closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu(mobileMenu);
        });
    }

    // Close menu when clicking outside or on a link
    if(mobileMenu) {
        // Close when clicking on links (except submenu toggles)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu(mobileMenu);
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                closeMobileMenu(mobileMenu);
            }
        });
    }
}

function openMobileMenu(menu) {
    if(!menu) return;
    
    // Handle different menu structures
    if(menu.classList.contains('mobile-menu')) {
        menu.classList.add('active');
    }
    menu.classList.remove('translate-x-full');
    
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
}

function closeMobileMenu(menu) {
    if(!menu) return;
    const mobileMenu = menu || document.getElementById('mobile-menu');
    
    // Handle different menu structures
    if(mobileMenu.classList.contains('mobile-menu')) {
        mobileMenu.classList.remove('active');
    }
    mobileMenu.classList.add('translate-x-full');
    
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
}

// Submenu toggle function for mobile
function toggleSubmenu(btn) {
    if(!btn) return;
    const submenu = btn.nextElementSibling;
    const icon = btn.querySelector('.fa-chevron-down');
    
    if(submenu) {
        submenu.classList.toggle('open');
        if(icon) {
            icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
}

// Make toggleSubmenu available globally
window.toggleSubmenu = toggleSubmenu;

function updateFont(dir) {
    const body = document.body;
    if (dir === 'rtl') {
        body.classList.add('font-arabic');
        body.classList.remove('font-sans');
    } else {
        body.classList.add('font-sans');
        body.classList.remove('font-arabic');
    }
}

function initAnimations() {
    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined' && typeof gsap.registerPlugin === 'function';

    if (hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Only animate elements that exist
    const fadeUpElements = document.querySelectorAll('.animate-fade-up');
    if(fadeUpElements.length > 0) {
        if (hasScrollTrigger) {
            gsap.from('.animate-fade-up', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.animate-fade-up',
                    start: 'top 80%'
                }
            });
        } else {
            // Fallback: animate once without ScrollTrigger if plugin isn't loaded.
            gsap.from('.animate-fade-up', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    }
    
    // Navbar glass effect on scroll (guard nav presence)
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (!nav) return;
        if (window.scrollY > 50) {
            nav.classList.add('glass');
            nav.classList.add('scrolled');
            nav.classList.remove('bg-transparent');
        } else {
            nav.classList.remove('glass');
            nav.classList.remove('scrolled');
            nav.classList.add('bg-transparent');
        }
    });
}
