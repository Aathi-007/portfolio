// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
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

    // Close mobile menu when a nav link is clicked
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


    /* ==========================================================================
       SCROLL INDICATOR & GLASSMORPHISM HEADER
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Scroll progress bar width
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0 && scrollProgress) {
            const scrollPercent = (window.scrollY / totalScroll) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Header glassmorphism shadow addition
        if (header) {
            if (window.scrollY > 40) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.55), 0 1px 0 rgba(213, 133, 31, 0.15)';
                header.style.background = 'rgba(18, 16, 14, 0.9)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(18, 16, 14, 0.72)';
            }
        }
    });


    /* ==========================================================================
       TYPEWRITER SUBTITLE CYCLE (NEUTRAL & HIGH-IMPACT)
       ========================================================================== */
    const words = [
        "Software Engineer",
        "Full Stack Developer",
        "Systems & AI Researcher",
        "Creative Problem Solver"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextEl = document.getElementById('typing-text');
    let typingSpeed = 90;

    function typeEffect() {
        if (!typingTextEl) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        // Cycle control
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2200; // Hold completed word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 450;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typewriter
    typeEffect();


    /* ==========================================================================
       INTERACTIVE CANVAS PARTICLES (WARM AMBER & SAGE GREEN NETWORK)
       ========================================================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 130 };

        // Handle resizing
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse position relative to window
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle constructor with warm golden & sage color scheme
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 2 + 1;
                // Alternate between Golden Amber (#D5851F), Sage Green (#87A96B), and Warm Gold
                const rand = Math.random();
                if (rand < 0.55) {
                    this.color = 'rgba(213, 133, 31, 0.45)'; // Warm Amber
                } else if (rand < 0.85) {
                    this.color = 'rgba(135, 169, 107, 0.42)'; // Sage Green
                } else {
                    this.color = 'rgba(245, 158, 11, 0.55)'; // Bright Golden Glow
                }
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

                // Mouse repel interaction
                if (mouse.x != null && mouse.y != null) {
                    let dx = this.x - mouse.x;
                    let dy = this.y - mouse.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        let force = (mouse.radius - dist) / mouse.radius;
                        let angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 1.6;
                        this.y += Math.sin(angle) * force * 1.6;
                    }
                }
            }
        }

        // Initialize particles based on screen real estate
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 17000), 75);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Render loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections (warm mesh network)
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 105) {
                        const alpha = ((105 - dist) / 105) * 0.16;
                        // Warm amber-gold connecting strands
                        ctx.strokeStyle = `rgba(213, 133, 31, ${alpha})`;
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


    /* ==========================================================================
       SPOTLIGHT GLOW CURSOR POSITION TRACKING
       ========================================================================== */
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


    /* ==========================================================================
       SCROLL-REVEAL OBSERVER (FADE-IN EFFECT & PROGRESS BARS)
       ========================================================================== */
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
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================================================
       INTERACTIVE PROJECT CATEGORY FILTERS
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card, .research-highlight-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCat = card.getAttribute('data-category');
                    if (filter === 'all' || cardCat === filter) {
                        card.style.display = '';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.35s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 40);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }


    /* ==========================================================================
       ACTIVE NAV LINK HIGHLIGHT SPY
       ========================================================================== */
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
        threshold: 0.35,
        rootMargin: '-20% 0px -40% 0px'
    });

    sections.forEach(sec => scrollSpyObserver.observe(sec));
});


/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message, icon = 'fa-solid fa-circle-check') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toast-out 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3200);
}


/* ==========================================================================
   CLIPBOARD UTILITY (COPY CONTACT / CITATIONS)
   ========================================================================== */
function copyContact(text, feedbackMsg = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(feedbackMsg, 'fa-solid fa-copy');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(feedbackMsg, 'fa-solid fa-copy');
    });
}

function copyCitation(citationText, feedbackMsg = 'Citation copied to clipboard!') {
    navigator.clipboard.writeText(citationText).then(() => {
        showToast(feedbackMsg, 'fa-solid fa-book-bookmark');
    }).catch(() => {
        showToast(feedbackMsg, 'fa-solid fa-book-bookmark');
    });
}


/* ==========================================================================
   CONTACT FORM SUBMISSION HANDLER
   ========================================================================== */
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

    // Realistic API interaction simulation
    setTimeout(() => {
        status.className = "form-status success";
        status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.`;
        
        showToast("Message sent successfully!", "fa-regular fa-paper-plane");
        form.reset();
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Fade out success message
        setTimeout(() => {
            status.style.opacity = '0';
            setTimeout(() => {
                status.className = "form-status";
                status.innerHTML = "";
                status.style.opacity = '1';
            }, 500);
        }, 6000);

    }, 1200);
}


/* ==========================================================================
   RESUME PREVIEW MODAL CONTROL
   ========================================================================== */
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal if user clicks outside of modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('resume-modal');
    if (event.target === modal) {
        closeResumeModal();
    }
});

// Close modal with Escape key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeResumeModal();
    }
});

// Print or Save PDF
function printResume() {
    window.print();
}
