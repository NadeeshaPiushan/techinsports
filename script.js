// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// WhatsApp integration functions
function openWhatsApp(productName) {
    const phoneNumber = '254701421951';
    const message = `Hi! I'm interested in learning more about ${productName}. Could you please provide more details and pricing information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Contact form handling
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name') || this.querySelector('input[type="text"]').value;
    const email = formData.get('email') || this.querySelector('input[type="email"]').value;
    const category = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
    
    const whatsappMessage = `Hi! I'm ${name} (${email}). I'm interested in ${category}. ${message}`;
    const phoneNumber = '254701421951';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(139, 69, 193, 0.98)';
    } else {
        navbar.style.background = 'rgba(139, 69, 193, 0.95)';
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .tech-card, .arrival-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/techinsport-logo-xUaugB1hW5IA0ZOuX1wG2E1Urro2Wc.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

preloadImages();

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // This is where you would integrate with analytics services
    console.log(`Clicked: ${element} - Action: ${action}`);
}

// Add event listeners for tracking
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackClick('button', e.target.textContent.trim());
    });
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add error handling for failed image loads
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = '/placeholder.svg?height=250&width=300';
        this.alt = 'Image not available';
    });
});