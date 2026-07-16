// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       MOBILE NAVIGATION MENU
       ========================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
                }
            }
        });
    });


    /* ==========================================
       SCROLL INDICATOR & HEADER STYLE
       ========================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Scroll progress bar width
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
            const scrollPercent = (window.scrollY / totalScroll) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Header glassmorphism shadow addition
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05)';
            header.style.background = 'rgba(8, 8, 13, 0.85)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(8, 8, 13, 0.6)';
        }
    });


    /* ==========================================
       TYPEWRITER SUBTITLE CYCLE
       ========================================== */
    const words = ["Cyber Security Engineer", "Full Stack Developer", "AI Research Enthusiast", "Software Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextEl = document.getElementById('typing-text');
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingTextEl) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete characters
            typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            // Add characters
            typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Type standard speed
        }

        // Cycle control
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at full word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typewriter
    typeEffect();


    /* ==========================================
       INTERACTIVE CANVAS PARTICLES (CYBER GRAPH)
       ========================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        // Handle resizing
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse position relative to window
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle constructor
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.4)'; // Cyan or Blue
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Bounds check
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Mouse repel interaction (Cybersecurity barrier effect)
                if (mouse.x != null && mouse.y != null) {
                    let dx = this.x - mouse.x;
                    let dy = this.y - mouse.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        let force = (mouse.radius - dist) / mouse.radius;
                        let angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 1.5;
                        this.y += Math.sin(angle) * force * 1.5;
                    }
                }
            }
        }

        // Initialize particles
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 80);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Render loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections (node network graph)
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        // Node connection opacity based on distance
                        const alpha = (100 - dist) / 100 * 0.15;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }


    /* ==========================================
       SPOTLIGHT GLOW CURSOR POSITION TRACKING
       ========================================== */
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    /* ==========================================
       SCROLL-REVEAL OBSERVER (FADE-IN EFFECT)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate progress bars when skills section is revealed
                const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                if (progressBars.length > 0) {
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
                
                // Keep observing or unobserve to freeze in active state
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================
       ACTIVE NAV LINK HIGHLIGHT SPY
       ========================================== */
    const sections = document.querySelectorAll('section');
    
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '-20% 0px -40% 0px'
    });

    sections.forEach(sec => scrollSpyObserver.observe(sec));
});


/* ==========================================
   CONTACT FORM SUBMISSION HANDLER
   ========================================== */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    if (!form || !status) return;

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    status.className = "form-status";
    status.textContent = "";

    // Mock API Delay
    setTimeout(() => {
        // Success feedback
        status.className = "form-status success";
        status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.`;
        
        // Reset fields
        form.reset();
        
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Smoothly fade out success alert after 6 seconds
        setTimeout(() => {
            status.style.opacity = '0';
            setTimeout(() => {
                status.className = "form-status";
                status.innerHTML = "";
                status.style.opacity = '1';
            }, 500);
        }, 6000);

    }, 1500);
}


/* ==========================================
   RESUME PREVIEW MODAL CONTROL
   ========================================== */
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
}

// Close modal if user clicks outside of content box
window.addEventListener('click', (event) => {
    const modal = document.getElementById('resume-modal');
    if (event.target === modal) {
        closeResumeModal();
    }
});

// Print/PDF Handler
function printResume() {
    window.print();
}
