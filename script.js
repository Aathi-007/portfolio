/* ==========================================================================
   AATHILAKSHMI S P - PORTFOLIO INTERACTIVE CONTROLLER
   ========================================================================== */

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


    /* ==========================================
       SCROLL INDICATOR & HEADER BLUR STYLE
       ========================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0 && scrollProgress) {
            const scrollPercent = (window.scrollY / totalScroll) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }

        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.08)';
                header.style.background = 'rgba(8, 8, 13, 0.9)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(8, 8, 13, 0.7)';
            }
        }
    });


    /* ==========================================
       TYPEWRITER SUBTITLE CYCLE (ALIGNED TO RESUME)
       ========================================== */
    const titles = [
        "Cybersecurity Enthusiast",
        "UI/UX Designer",
        "Full-Stack Developer",
        "Indian Patent Co-Inventor",
        "Springer Nature Author",
        "SIH 2026 National Finalist"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextEl = document.getElementById('typing-text');
    let typingSpeed = 90;

    function typeEffect() {
        if (!typingTextEl) return;
        
        const currentWord = titles[wordIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2200; // Hold completed word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % titles.length;
            typingSpeed = 400; // Pause before typing next title
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();


    /* ==========================================
       CANVAS PARTICLES - CYBER GRAPH MATRIX
       ========================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 130 };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.45)' : 'rgba(59, 130, 246, 0.45)';
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse repel shield effect
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 1.8;
                        this.y += Math.sin(angle) * force * 1.8;
                    }
                }
            }
        }

        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 75);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = ((110 - dist) / 110) * 0.18;
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
       SCROLL-REVEAL & STAT PROGRESS OBSERVER
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill progress bars
                const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                if (progressBars.length > 0) {
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 120);
                    });
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================
       INTERACTIVE PROJECT FILTERS
       ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.featured-project-card, .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================
       INTERACTIVE SKILL CATEGORY FILTERS
       ========================================== */
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillCategories = document.querySelectorAll('.skill-category');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            skillCategories.forEach(cat => {
                const catType = cat.getAttribute('data-category');
                if (filter === 'all' || catType === filter) {
                    cat.style.display = '';
                    cat.style.opacity = '0';
                    cat.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        cat.style.transition = 'all 0.4s ease';
                        cat.style.opacity = '1';
                        cat.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================
       ACTIVE NAVIGATION SPY
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
        threshold: 0.35,
        rootMargin: '-15% 0px -40% 0px'
    });

    sections.forEach(sec => scrollSpyObserver.observe(sec));
});


/* ==========================================
   TOAST NOTIFICATION ENGINE
   ========================================== */
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


/* ==========================================
   CLIPBOARD UTILITY (COPY CONTACT / CITATIONS)
   ========================================== */
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

function copyCitation(citationText, feedbackMsg = 'Citation copied!') {
    navigator.clipboard.writeText(citationText).then(() => {
        showToast(feedbackMsg, 'fa-solid fa-book-bookmark');
    }).catch(() => {
        showToast(feedbackMsg, 'fa-solid fa-book-bookmark');
    });
}


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

    // Simulated API submission
    setTimeout(() => {
        status.className = "form-status success";
        status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.`;
        
        showToast("Message sent successfully!", "fa-regular fa-paper-plane");
        form.reset();
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
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

// Close modal with Escape key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeResumeModal();
    }
});

// Print or Save as PDF
function printResume() {
    window.print();
}
