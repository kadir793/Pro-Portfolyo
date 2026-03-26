// ===== Carousel Functions =====
function changeCarousel(button, direction) {
    const projectImage = button.closest('.project-image');
    const carousel = projectImage.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const dots = projectImage.querySelectorAll('.dot');
    
    let currentIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
    currentIndex = (currentIndex + direction + items.length) % items.length;
    
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    items[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function currentCarousel(dot, index) {
    const projectImage = dot.closest('.project-image');
    const carousel = projectImage.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const dots = projectImage.querySelectorAll('.dot');
    
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    items[index].classList.add('active');
    dots[index].classList.add('active');
}

// ===== Navigation Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .timeline-item, .skill-category, .education-card, .language-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Typing Effect for Hero Title =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const html = element.innerHTML;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = html;
        }
    }
    
    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const fullText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, fullText, 50);
        }, 500);
    }
});

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetNumber = parseInt(statNumber.textContent);
            entry.target.classList.add('counted');
            animateCounter(statNumber, targetNumber, 2000);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.classList.add('scroll-top-btn');
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0) scale(1)';
});

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Profile Image and About Me Text Color Change =====
window.addEventListener('scroll', () => {
    const profileImg = document.querySelector('.profile-img');
    const aboutSection = document.querySelector('.about');
    const sectionTitle = document.querySelector('.about .section-title');
    
    if (profileImg && aboutSection && sectionTitle) {
        const profileRect = profileImg.getBoundingClientRect();
        const titleRect = sectionTitle.getBoundingClientRect();
        
        // Check if profile image is overlapping with the "About Me" title
        const isOverlapping = profileRect.bottom > titleRect.top && 
                             profileRect.top < titleRect.bottom;
        
        if (isOverlapping) {
            sectionTitle.style.color = 'white';
            sectionTitle.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            sectionTitle.style.color = '';
            sectionTitle.style.textShadow = '';
        }
    }
});

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Console Message =====
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #64748b;');
console.log('%cIf you want to get in touch, feel free to reach out!', 'font-size: 14px; color: #64748b;');

// ===== Dynamic Year in Footer =====
const footer = document.querySelector('.footer p');
if (footer && footer.textContent.includes('2026')) {
    const currentYear = new Date().getFullYear();
    footer.textContent = footer.textContent.replace('2026', currentYear);
}