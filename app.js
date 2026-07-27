/**
 * HackPulse 2026 - Main Application Logic
 * Features: Dark/Light Mode, Countdown Timer, Schedule Filter Tabs,
 * Form Validation, Confirmation Modal, FAQ Accordion, Mobile Menu.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // 1. Dark / Light Theme Toggle (Bonus Feature 1)
    // --------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('hackpulse-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('hackpulse-theme', newTheme);
    });

    // --------------------------------------------------------
    // 2. Live Countdown Timer (Bonus Feature 2)
    // --------------------------------------------------------
    const targetDate = new Date('October 24, 2026 09:00:00 EST').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --------------------------------------------------------
    // 3. Interactive Schedule Tabs (Bonus Feature 3)
    // --------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timelinePanels = document.querySelectorAll('.timeline-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Deactivate all buttons & panels
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            timelinePanels.forEach(p => p.classList.remove('active'));

            // Activate clicked tab
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const activePanel = document.getElementById(tabId);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    // --------------------------------------------------------
    // 4. Registration Form Validation & Modal (Bonus Feature 4)
    // --------------------------------------------------------
    const regForm = document.getElementById('registration-form');
    const modalOverlay = document.getElementById('success-modal');
    const modalSummary = document.getElementById('modal-summary-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOkBtn = document.getElementById('modal-ok-btn');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/.*)?$/i;

    function validateField(fieldId, errorId, validationFn) {
        const input = document.getElementById(fieldId);
        const group = input.closest('.form-group');
        const isValid = validationFn(input.value.trim(), input);

        if (!isValid) {
            group.classList.add('has-error');
        } else {
            group.classList.remove('has-error');
        }
        return isValid;
    }

    // Real-time blur feedback
    document.getElementById('fullName').addEventListener('blur', () => {
        validateField('fullName', 'fullName-error', val => val.length >= 2);
    });

    document.getElementById('email').addEventListener('blur', () => {
        validateField('email', 'email-error', val => emailPattern.test(val));
    });

    document.getElementById('teamName').addEventListener('blur', () => {
        validateField('teamName', 'teamName-error', val => val.length >= 2);
    });

    document.getElementById('teamSize').addEventListener('change', () => {
        validateField('teamSize', 'teamSize-error', val => val !== '');
    });

    document.getElementById('track').addEventListener('change', () => {
        validateField('track', 'track-error', val => val !== '');
    });

    document.getElementById('tshirt').addEventListener('change', () => {
        validateField('tshirt', 'tshirt-error', val => val !== '');
    });

    document.getElementById('githubUrl').addEventListener('blur', () => {
        validateField('githubUrl', 'githubUrl-error', val => val === '' || urlPattern.test(val));
    });

    document.getElementById('linkedinUrl').addEventListener('blur', () => {
        validateField('linkedinUrl', 'linkedinUrl-error', val => val === '' || urlPattern.test(val));
    });

    document.getElementById('codeOfConduct').addEventListener('change', () => {
        const checkbox = document.getElementById('codeOfConduct');
        const group = checkbox.closest('.form-group');
        if (!checkbox.checked) {
            group.classList.add('has-error');
        } else {
            group.classList.remove('has-error');
        }
    });

    // Form Submit Handler
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateField('fullName', 'fullName-error', val => val.length >= 2);
        const isEmailValid = validateField('email', 'email-error', val => emailPattern.test(val));
        const isTeamValid = validateField('teamName', 'teamName-error', val => val.length >= 2);
        const isSizeValid = validateField('teamSize', 'teamSize-error', val => val !== '');
        const isTrackValid = validateField('track', 'track-error', val => val !== '');
        const isTshirtValid = validateField('tshirt', 'tshirt-error', val => val !== '');
        const isGithubValid = validateField('githubUrl', 'githubUrl-error', val => val === '' || urlPattern.test(val));
        const isLinkedinValid = validateField('linkedinUrl', 'linkedinUrl-error', val => val === '' || urlPattern.test(val));

        const cocCheckbox = document.getElementById('codeOfConduct');
        const cocGroup = cocCheckbox.closest('.form-group');
        const isCocValid = cocCheckbox.checked;

        if (!isCocValid) {
            cocGroup.classList.add('has-error');
        } else {
            cocGroup.classList.remove('has-error');
        }

        const isFormValid = isNameValid && isEmailValid && isTeamValid && isSizeValid &&
                            isTrackValid && isTshirtValid && isGithubValid && isLinkedinValid && isCocValid;

        if (isFormValid) {
            // Collect Form Values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const teamName = document.getElementById('teamName').value.trim();
            const track = document.getElementById('track').value;
            const tshirt = document.getElementById('tshirt').value;

            // Render Modal Content
            modalSummary.innerHTML = `
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Team:</strong> ${teamName}</p>
                <p><strong>Track:</strong> ${track}</p>
                <p><strong>T-Shirt:</strong> Size ${tshirt}</p>
            `;

            // Show Modal
            modalOverlay.classList.add('open');
            modalOverlay.setAttribute('aria-hidden', 'false');

            // Reset Form
            regForm.reset();
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-group.has-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Close Modal Events
    function closeModal() {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalOkBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // --------------------------------------------------------
    // 5. FAQ Accordion (Bonus Feature 5)
    // --------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked if was closed
            if (!isOpen) {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --------------------------------------------------------
    // 6. Mobile Navigation Menu Toggle
    // --------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // --------------------------------------------------------
    // 7. Active Nav Link on Scroll
    // --------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
});
