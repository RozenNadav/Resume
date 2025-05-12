document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        // Create close icon element
        const closeIcon = document.createElement('i');
        closeIcon.className = 'fas fa-times';
        closeIcon.style.display = 'none';
        mobileMenuBtn.appendChild(closeIcon);
        
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle menu state
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            this.classList.toggle('active');
            
            // Toggle icons
            const barsIcon = this.querySelector('.fa-bars');
            const timesIcon = this.querySelector('.fa-times');
            
            if (navLinks.classList.contains('active')) {
                barsIcon.style.display = 'none';
                timesIcon.style.display = 'block';
            } else {
                barsIcon.style.display = 'block';
                timesIcon.style.display = 'none';
            }
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach((link, index) => {
            link.addEventListener('click', () => {
                // Animate out each link before closing menu
                link.style.transition = `all 0.3s ease ${0.1 * (5 - index)}s`;
                link.style.transform = 'translateY(20px)';
                link.style.opacity = '0';
                
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    mobileMenuBtn.classList.remove('active');
                    
                    // Reset icons
                    const barsIcon = mobileMenuBtn.querySelector('.fa-bars');
                    const timesIcon = mobileMenuBtn.querySelector('.fa-times');
                    barsIcon.style.display = 'block';
                    timesIcon.style.display = 'none';
                    
                    // Reset link animations
                    link.style.transition = '';
                    link.style.transform = '';
                    link.style.opacity = '';
                }, 300);
            });
        });
    }
});
    
    // =====================
    // Scroll Animations
    // =====================
    const sections = document.querySelectorAll('.section');
    const background = document.querySelector('.background-animation');
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.75;
        
        // Section animations
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerPoint) {
                section.classList.add('visible');
            }
        });
        
        // Parallax background effect
        if (background) {
            const scrollPosition = window.pageYOffset;
            background.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    }

    // =====================
    // Smooth Scrolling
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================
    // Skills Bars Animation (UPDATED)
    // =====================
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (isElementInViewport(bar)) {
                bar.querySelector('.skill-level').style.width = level + '%';
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Initialize skill bars at 0
    skillBars.forEach(bar => {
        bar.querySelector('.skill-level').style.width = '0';
    });

    // =====================
    // Education Toggle
    // =====================
    const educationButtons = document.querySelectorAll('.education-details-btn');
    
    educationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('active');
            
            this.textContent = details.classList.contains('active') 
                ? 'Hide Details' 
                : 'View Details';
        });
    });

    // =====================
    // Experience Timeline Accordion
    // =====================
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const details = content.querySelector('p, ul');
        
        // Initialize first item as open
        if (index === 0) {
            item.classList.add('active');
        } else {
            details.style.display = 'none';
        }
        
        item.addEventListener('click', function() {
            // Close all other items
            timelineItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('p, ul').style.display = 'none';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const display = item.classList.contains('active') ? 'block' : 'none';
            details.style.display = display;
        });
    });

    // =====================
    // Contact Form
    // =====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // =====================
    // Stats Counter
    // =====================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            
            let current = 0;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Start counters when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });

    // =====================
    // Initialize Everything
    // =====================
    window.addEventListener('scroll', function() {
        animateSkillBars();
        checkScroll();
    });
    
    window.addEventListener('load', function() {
        animateSkillBars();
        checkScroll();
    });
