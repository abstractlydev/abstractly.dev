document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        });
    });

    // Sticky Header Logic
    const header = document.querySelector('.header');

    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };

    handleHeaderScroll(); // Evaluate on initial load
    window.addEventListener('scroll', handleHeaderScroll);

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header__nav');

    if (mobileMenuToggle && headerNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('is-active');
            headerNav.classList.toggle('is-open');
        });

        // Close mobile menu when a link is clicked
        const navLinks = headerNav.querySelectorAll('a');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('is-active');
                headerNav.classList.remove('is-open');
            });
        });
    }

    // FAQ Accordion logic
    const faqToggles = document.querySelectorAll('.faq-item__toggle');
    faqToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const parent = toggle.parentElement;

            // Close other items
            document.querySelectorAll('.faq-item').forEach((item) => {
                if (item !== parent) {
                    item.classList.remove('active');
                }
            });

            // Toggle current item
            parent.classList.toggle('active');
        });
    });

    // Markdown Project Modal Logic
    const modal = document.getElementById('case-study-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('modal-close');
    const overlay = document.getElementById('modal-overlay');

    const openModal = async (mdFilename) => {
        try {
            const response = await fetch(`projects/${mdFilename}.md`);
            if (!response.ok) throw new Error('Markdown file not found');
            const mdText = await response.text();

            // Strip YAML frontmatter before parsing
            const cleanMd = mdText.replace(/^---\n[\s\S]*?\n---\n/, '');

            // Parse markdown using marked.js
            modalContent.innerHTML = marked.parse(cleanMd);

            // Show modal
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // prevent background scroll
        } catch (error) {
            console.error('Failed to load project details:', error);
            modalContent.innerHTML = `<h2>Oops!</h2><p>Could not load the case study details. Please try again later.</p>`;
            modal.classList.add('is-open');
        }
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        document.body.style.overflow = 'auto'; // restore scroll
    };

    document.querySelectorAll('.work-card.clickable').forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; // Ignore clicks if hitting an embedded link

            const mdFile = card.getAttribute('data-md');
            if (mdFile) {
                openModal(mdFile);
            }
        });
    });

    // Close listeners
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    // Return to Top Logic
    const returnToTopBtn = document.getElementById('return-to-top');
    if (returnToTopBtn) {
        const handleReturnToTopScroll = () => {
            if (window.scrollY > 300) {
                returnToTopBtn.classList.add('is-visible');
            } else {
                returnToTopBtn.classList.remove('is-visible');
            }
        };

        handleReturnToTopScroll(); // Evaluate on initial load
        window.addEventListener('scroll', handleReturnToTopScroll);

        returnToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }

    // Scroll Fade-In Animation Logic
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15, // Trigger when 15% visible
        };

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Run once
                }
            });
        }, observerOptions);

        fadeElements.forEach((el) => fadeObserver.observe(el));
    }
});
