
// Picture Slider
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function goToSlide(slideIndex) {
    sliderTrack.style.transform = `translateX(-${slideIndex * 100}%)`;

    // Update active dot
    sliderDots.forEach(dot => dot.classList.remove('active'));
    sliderDots[slideIndex].classList.add('active');

    currentSlide = slideIndex;
}

// Add click events to dots
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Auto slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % sliderDots.length;
    goToSlide(currentSlide);
}, 5000);



// Payment Method Selection
const paymentOptions = document.querySelectorAll('.payment-option');
const mpesaFields = document.getElementById('mpesaFields');
const cardFields = document.getElementById('cardFields');

paymentOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Remove active class from all options
        paymentOptions.forEach(opt => opt.classList.remove('active'));

        // Add active class to clicked option
        this.classList.add('active');

        // Show/hide relevant fields
        const method = this.getAttribute('data-method');

        if (method === 'mpesa') {
            mpesaFields.style.display = 'block';
            cardFields.style.display = 'none';
        } else if (method === 'card') {
            mpesaFields.style.display = 'none';
            cardFields.style.display = 'block';
        } else {
            mpesaFields.style.display = 'none';
            cardFields.style.display = 'none';
        }
    });
});

// Donation Form Submission
document.getElementById('donationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your donation! In a real implementation, this would process your payment.');
    // In a real implementation, you would integrate with payment gateway APIs here
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    // In a real implementation, you would send this data to a server
});

// Animated Counter for Donation Metrics
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = formatNumber(value);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function formatNumber(num) {
    if (num >= 1000) {
        return 'ksh' + (num / 1000).toFixed(1);
    }
    return '$' + num;
}

// Initialize counters when page loads
window.addEventListener('load', function () {
    animateValue(document.getElementById('totalRaised'), 0, 24580, 2000);
    animateValue(document.getElementById('donorsCount'), 0, 1247, 2000);

    // Days left calculation (for demonstration, using a fixed end date)
    const endDate = new Date('2023-12-31');
    const today = new Date();
    const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    document.getElementById('daysLeft').textContent = daysLeft > 0 ? daysLeft : 0;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            nav.classList.remove('active');
        }
    });
});