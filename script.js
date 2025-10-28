// KINETIC WINDSURF EXPERIENCE INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    // Initialize kinetic functionality
    initNavigation();
    initKineticScrolling();
    initMomentumParallax();
    initSailFlapAnimations();
    initCounters();
    initContactForm();
    initWindResponsiveEffects();
    initGlidingEffects();
});

// Wind-Responsive Effects
function initWindResponsiveEffects() {
    // Kinetic button effects with wind-like movement
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .event-signup');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
            
            button.style.transform = `translateY(-8px) translateX(${x}px) rotateX(${y * 0.5}deg) scale(1.05)`;
            button.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) translateX(0) rotateX(0deg) scale(1)';
            button.style.filter = 'brightness(1) saturate(1)';
        });
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
            
            button.style.transform = `translateY(-8px) translateX(${x}px) rotateX(${y * 0.3}deg) scale(1.05)`;
        });
    });
    
    // Sail-like card movements
    const cards = document.querySelectorAll('.experience-card, .event-card, .council-member');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.02;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.02;
            
            card.style.transform = `translateY(-15px) translateX(${x}px) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg) scale(1.02)`;
            card.style.filter = 'brightness(1.05) contrast(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) translateX(0) rotateY(0deg) rotateX(0deg) scale(1)';
            card.style.filter = 'brightness(1) contrast(1)';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.01;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.01;
            
            card.style.transform = `translateY(-15px) translateX(${x}px) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg) scale(1.02)`;
        });
    });
    
    // Add ripple effect to clickable elements
    const clickableElements = document.querySelectorAll('button, .primary-btn, .secondary-btn, .event-signup');
    clickableElements.forEach(element => {
        element.addEventListener('click', createRipple);
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Ensure navbar is loaded and visible
    setTimeout(() => {
        if (navbar) {
            navbar.classList.add('loaded');
        }
    }, 4000);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Debug: Ensure logo is visible
            const logoText = navbar.querySelector('.logo-text');
            if (logoText) {
                logoText.style.color = 'var(--deep-ocean)';
                logoText.style.opacity = '1';
            }
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('experience-grid') || 
                    entry.target.classList.contains('gear-grid') ||
                    entry.target.classList.contains('events-grid') ||
                    entry.target.classList.contains('council-grid')) {
                    
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.experience-card, .gear-step, .event-card, .council-member, .experience-grid, .gear-grid, .events-grid, .council-grid'
    );
    
    animateElements.forEach(el => observer.observe(el));
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');

    // Floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'var(--electric-turquoise)';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                
                // Remove focused class from all form groups
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
            }, 2000);
        }, 1500);
    });
}

// Kinetic Momentum-Based Parallax
function initMomentumParallax() {
    let scrollVelocity = 0;
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        scrollVelocity = scrollTop - lastScrollTop;
        lastScrollTop = scrollTop;
        
        // Hero video kinetic movement
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            const videoOffset = scrollTop * 0.3;
            const velocityEffect = scrollVelocity * 0.1;
            heroVideo.style.transform = `scale(1.05) translateY(${videoOffset}px) translateX(${velocityEffect}px)`;
        }
        
        // Water-like section movements
        const sections = document.querySelectorAll('.experience, .events, .council');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const speed = 0.2 + (index * 0.1);
            const offset = (window.innerHeight - rect.top) * speed;
            const wave = Math.sin(offset * 0.01) * 10;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.style.transform = `translateY(${wave}px) translateX(${scrollVelocity * 0.05}px)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Event card interactions
document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0)';
        });
    });
});

// Add wave animation to hero section
function createWaveEffect() {
    const hero = document.querySelector('.hero');
    const wave = document.createElement('div');
    wave.className = 'wave-animation';
    wave.innerHTML = `
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
    `;
    hero.appendChild(wave);
}

// Initialize kinetic floating elements
document.addEventListener('DOMContentLoaded', () => {
    createKineticParticles();
});

// Kinetic Water Particles
function createKineticParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'kinetic-particles';
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'water-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 12) + 's';
        
        // Different particle types for variety
        const types = ['spray', 'droplet', 'mist'];
        particle.classList.add(types[Math.floor(Math.random() * types.length)]);
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations go here
}, 16)); // ~60fps

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
        'https://images.unsplash.com/photo-1530549387789-4c1017266635',
        'https://images.unsplash.com/photo-1502680390469-be75c86b636f'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading and enhanced entrance
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add entrance animation class to body after load
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('entrance-complete');
        }, 3000);
    });
});

// Enhanced S.A.C. Opening Transition
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">S.A.C.</div>
            <div class="loader-subtitle">VELOCITY UNLEASHED</div>
            <div class="wave-loader">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
            <div class="loading-progress">
                <div class="progress-bar"></div>
            </div>
            <p class="loading-text">Igniting the kinetic experience...</p>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Enhanced visible entrance sequence
    let loadingProgress = 0;
    const progressBar = loader.querySelector('.progress-bar');
    const loadingText = loader.querySelector('.loading-text');
    
    const progressInterval = setInterval(() => {
        loadingProgress += Math.random() * 8 + 4;
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(progressInterval);
            
            // Update progress bar
            progressBar.style.width = '100%';
            loadingText.textContent = 'Experience ready. Launching...';
            
            // Dramatic exit animation
            setTimeout(() => {
                loader.style.transform = 'scale(1.1)';
                loader.style.filter = 'blur(5px)';
                loader.style.opacity = '0';
                
                setTimeout(() => {
                    loader.remove();
                    document.body.classList.add('loaded');
                    initSailFlapAnimations();
                }, 800);
            }, 1200);
        } else {
            // Update progress bar smoothly
            progressBar.style.width = loadingProgress + '%';
            
            // Update loading text based on progress
            if (loadingProgress < 30) {
                loadingText.textContent = 'Calibrating wind sensors...';
            } else if (loadingProgress < 60) {
                loadingText.textContent = 'Preparing kinetic systems...';
            } else if (loadingProgress < 90) {
                loadingText.textContent = 'Charging velocity engines...';
            } else {
                loadingText.textContent = 'Final preparations...';
            }
        }
    }, 120);
    
    // Ensure loader is removed even if progress doesn't complete
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (document.querySelector('.page-loader')) {
                clearInterval(progressInterval);
                progressBar.style.width = '100%';
                loadingText.textContent = 'Launch complete!';
                
                setTimeout(() => {
                    loader.style.transform = 'scale(1.1)';
                    loader.style.filter = 'blur(5px)';
                    loader.style.opacity = '0';
                    
                    setTimeout(() => {
                        loader.remove();
                        document.body.classList.add('loaded');
                        initSailFlapAnimations();
                    }, 800);
                }, 500);
            }
        }, 3000);
    });
}

// Initialize loading animation
showLoadingAnimation();

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Sail-Flap Section Animations
function initSailFlapAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('sail-flap-in');
                
                // Stagger child elements
                const children = element.querySelectorAll('.experience-card, .event-card, .gear-step, .council-member');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('wind-reveal');
                    }, index * 150);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Gliding Effects for Smooth Transitions
function initGlidingEffects() {
    // Smooth momentum scrolling
    let isScrolling = false;
    let scrollVelocity = 0;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                scrollVelocity = currentScroll - (scrollVelocity || currentScroll);
                
                // Apply subtle gliding effect to navigation (reduced to avoid visibility issues)
                const navbar = document.querySelector('.navbar');
                if (navbar && !navbar.classList.contains('scrolled')) {
                    const glide = Math.max(-3, Math.min(3, scrollVelocity * 0.05));
                    navbar.style.transform = `translateY(${glide}px)`;
                } else if (navbar && navbar.classList.contains('scrolled')) {
                    // Ensure navbar stays in place when scrolled
                    navbar.style.transform = 'translateY(0px)';
                }
                
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
}

// Kinetic Scroll Behavior
function initKineticScrolling() {
    // Enhanced smooth scrolling with momentum
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = Math.min(1500, Math.max(800, Math.abs(distance) * 0.5));
                
                let start = null;
                
                function kineticScroll(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Kinetic easing function
                    const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
                    const currentPosition = startPosition + (distance * easeOutQuart);
                    
                    window.scrollTo(0, currentPosition);
                    
                    if (progress < duration) {
                        requestAnimationFrame(kineticScroll);
                    }
                }
                
                requestAnimationFrame(kineticScroll);
            }
        });
    });
}


// Initialize scroll progress
document.addEventListener('DOMContentLoaded', initScrollProgress);
