document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = sidebar ? sidebar.querySelectorAll('nav ul li a') : [];
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    const setMenuState = (isOpen) => {
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        }
    };

    // Sidebar Toggle
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            const isOpen = sidebar.classList.toggle('active');
            setMenuState(isOpen);
        });
    }

    // Close sidebar on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                setMenuState(false);
            }
        });
    });

    // Close sidebar on click outside
    if (menuToggle && sidebar) {
        document.addEventListener('click', function (event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuToggle = menuToggle.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                setMenuState(false);
            }
        });
    }



    // Dark/Light Mode Toggle
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme && icon) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.setAttribute('aria-pressed', 'true');
        }
    }

    if (themeToggle && icon) {
        themeToggle.addEventListener('click', function () {
            let theme = 'light';
            if (document.documentElement.getAttribute('data-theme') !== 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                theme = 'dark';
                themeToggle.setAttribute('aria-pressed', 'true');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                themeToggle.setAttribute('aria-pressed', 'false');
            }
            localStorage.setItem('theme', theme);
        });
    }

    // Micro Animations (Scroll Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sections = document.querySelectorAll('.timeline-section, .profile-header');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
        sections.forEach(section => {
            section.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerRef.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});
