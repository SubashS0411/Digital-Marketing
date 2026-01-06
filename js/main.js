// RTL Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('rtl-toggle');
    const toggleBtnMobile = document.getElementById('rtl-toggle-mobile');
    const html = document.documentElement;

    // Check local storage
    const currentDir = localStorage.getItem('dir') || 'ltr';
    html.setAttribute('dir', currentDir);
    updateFont(currentDir);

    // Desktop RTL toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newDir = html.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateFont(newDir);
        });
    }

    // Mobile RTL toggle
    if (toggleBtnMobile) {
        toggleBtnMobile.addEventListener('click', () => {
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

    // Initialize Navbar logic
    initNavbar();
});

// ========== SCROLL REVEAL ANIMATIONS ==========
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .reveal-v2');

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
                entry.target.classList.add('active'); // Support for v2 styles
                // Optionally unobserve after revealing
                // revealObserver.unobserve(entry.target);
            }
            // Optionally unobserve after revealing
            // revealObserver.unobserve(entry.target);
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// ========== MOBILE MENU LOGIC ==========
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay'); // Optional backdrop

    function toggleMenu(show) {
        if (!mobileMenu) return;
        const isHidden = !show;

        // Toggle Visibility
        if (show) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Lock Scroll
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Unlock Scroll
        }

        // Toggle Button State
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', String(show));
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(true);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(false);
        });
    }

    // Close on link click
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu(false);
    });

    // Submenu Toggles (Mobile)
    const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const submenu = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');
            if (submenu) {
                submenu.classList.toggle('hidden');
                if (icon) icon.classList.toggle('rotate-180');
            }
        });
    });
}

// Submenu toggle function for mobile
function toggleSubmenu(btn) {
    if (!btn) return;
    const submenu = btn.nextElementSibling;
    const icon = btn.querySelector('.fa-chevron-down');

    if (submenu) {
        submenu.classList.toggle('open');
        if (icon) {
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
    if (fadeUpElements.length > 0) {
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

    // Scroll to top button logic
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.remove('opacity-0', 'invisible');
                scrollTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'invisible');
                scrollTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ========== NAVBAR LOGIC ==========
// ========== NAVBAR LOGIC ==========
function initNavbar() {
    const navbar = document.getElementById('navbar') || document.querySelector('.nav-wrapper');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('glass-nav');
        } else {
            navbar.classList.remove('glass-nav');
        }
    });
}
