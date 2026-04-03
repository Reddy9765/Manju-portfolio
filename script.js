// script.js

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const scrollTopBtn = document.getElementById('scrollTop');
const copyEmail = document.getElementById('copyEmail');
const emailTap = document.getElementById('emailTap');

function setTheme(mode) {
    if (mode === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
        localStorage.setItem('portfolioTheme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = 'Dark Mode';
        localStorage.setItem('portfolioTheme', 'light');
    }
}

const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
});

function copyEmailText(email) {
    navigator.clipboard.writeText(email).then(() => {
        const original = emailTap.textContent;
        emailTap.textContent = 'Copied!';
        setTimeout(() => (emailTap.textContent = original), 1200);
    }).catch(() => {
        alert('Copy failed; please copy manually: ' + email);
    });
}

emailTap?.addEventListener('click', () => copyEmailText(emailTap.textContent));
copyEmail?.addEventListener('click', () => copyEmailText('manjunathreddys585@gmail.com'));

window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const sections = document.querySelectorAll('main .section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

sections.forEach(section => observer.observe(section));

// Optional: highlight active nav link

const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = 'home';
    document.querySelectorAll('section[id]').forEach(sec => {
        const sectionTop = sec.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// Typing headline effect
const heroTagline = document.getElementById('heroTagline');
const lines = [
    'Crafting scalable enterprise automation and intelligent web experiences.',
    'Building Power Platform workflows, responsive UIs, and data-driven dashboards.',
    'Delivering high-impact solutions for business process transformation.'
];
let i = 0;
let char = 0;
let typing = true;

function updateTagline() {
    if (typing) {
        if (char < lines[i].length) {
            heroTagline.textContent += lines[i].charAt(char);
            char++;
            setTimeout(updateTagline, 50);
        } else {
            typing = false;
            setTimeout(updateTagline, 2400);
        }
    } else {
        if (char > 0) {
            heroTagline.textContent = lines[i].substring(0, char - 1);
            char--;
            setTimeout(updateTagline, 25);
        } else {
            typing = true;
            i = (i + 1) % lines.length;
            setTimeout(updateTagline, 300);
        }
    }
}

if (heroTagline) updateTagline();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('show');
        mobileMenuBtn.textContent = mobileNav.classList.contains('show') ? '×' : '⋮';
    });

    // Close menu on item click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('show');
            mobileMenuBtn.textContent = '⋮';
        });
    });
}

// Contact form submit handler
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) {
            contactStatus.textContent = 'Please enter your name, email, and a message.';
            contactStatus.style.color = '#b91c1c';
            return;
        }

        contactStatus.textContent = 'Your message is ready! This demo does not send emails; use your email client to message. Thank you!';
        contactStatus.style.color = '#065f46';
        contactForm.reset();
    });
}

