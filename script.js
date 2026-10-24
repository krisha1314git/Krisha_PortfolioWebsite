
/* ==========================================
   KRISHA PORTFOLIO WEBSITE
   Complete JavaScript
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ======================================
       1. MOBILE NAVIGATION
    ====================================== */

    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton && navLinks) {

        menuButton.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');

            menuButton.setAttribute(
                'aria-expanded',
                String(isOpen)
            );

            menuButton.textContent = isOpen ? '✕' : '☰';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');

                menuButton.setAttribute(
                    'aria-expanded',
                    'false'
                );

                menuButton.textContent = '☰';
            });
        });
    }


    /* ======================================
       2. SMOOTH SCROLLING
    ====================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener('click', event => {

            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                ).matches ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });


    /* ======================================
       3. PROJECT FILTER FUNCTIONALITY
    ====================================== */

    const filterButtons =
        document.querySelectorAll('[data-filter]');

    const projectCards =
        document.querySelectorAll('.work-card[data-kind]');

    const filterCount =
        document.querySelector('.filter-count');

    function filterProjects(selectedFilter) {

        let visibleCount = 0;

        projectCards.forEach(card => {

            const category = card.dataset.kind;

            const shouldShow =
                selectedFilter === 'all' ||
                selectedFilter === category;

            card.hidden = !shouldShow;

            card.style.display = shouldShow ? '' : 'none';

            if (shouldShow) {
                visibleCount++;
            }
        });

        filterButtons.forEach(button => {

            const isActive =
                button.dataset.filter === selectedFilter;

            button.classList.toggle('active', isActive);

            button.setAttribute(
                'aria-pressed',
                String(isActive)
            );
        });

        if (filterCount) {
            filterCount.textContent =
                `Showing ${visibleCount} of ${projectCards.length} projects`;
        }
    }

    filterButtons.forEach(button => {

        button.addEventListener('click', () => {
            filterProjects(button.dataset.filter);
        });
    });

    if (filterButtons.length && projectCards.length) {
        filterProjects('all');
    }


    /* ======================================
       4. SCROLL REVEAL ANIMATION
    ====================================== */

    const revealElements =
        document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.08
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add('visible');
        });
    }


    /* ======================================
       5. COPYRIGHT YEAR
    ====================================== */

    const yearElement = document.querySelector('#year');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ======================================
       6. CONTACT FORM - FIXED
    ====================================== */

    const contactForm =
        document.querySelector('#contact-form');

    if (contactForm) {

        contactForm.addEventListener('submit', event => {

            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            // Krisha's contact email
            const ownerEmail = '25amtics0004@gmail.com';

            const notice =
                document.querySelector('#form-notice');

            const senderName =
                document.querySelector('#contact-name')
                    .value.trim();

            const senderEmail =
                document.querySelector('#contact-email')
                    .value.trim();

            const message =
                document.querySelector('#contact-message')
                    .value.trim();

            if (!senderName || !senderEmail || !message) {

                if (notice) {
                    notice.textContent =
                        'Please fill in all required fields.';
                }

                return;
            }

            // Prepare email subject
            const subject = encodeURIComponent(
                'Portfolio Contact from ' + senderName
            );

            // Prepare email body
            const body = encodeURIComponent(
                'Name: ' + senderName + '\n' +
                'Email: ' + senderEmail + '\n\n' +
                'Message:\n' + message
            );

            // Open the visitor's email application
            const mailtoLink =
                'mailto:' + ownerEmail +
                '?subject=' + subject +
                '&body=' + body;

            window.location.href = mailtoLink;

            if (notice) {
                notice.textContent =
                    'Your email application should open. ' +
                    'Please review and send the message.';
            }
        });
    }

});
