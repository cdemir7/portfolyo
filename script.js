document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = sidebar.querySelectorAll('nav ul li a');
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Sidebar Toggle
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Close sidebar on click outside
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // CV Download Fix
    document.querySelector(".btn.btn-outline").addEventListener("click", function () {
        const link = document.createElement("a");
        // Corrected filename from "Cihan-Demir-CV.pdf" to "CV-Cihan-Demir.pdf" as found in directory listing
        link.href = "other/Cihan-Demir-CV.pdf";  
        link.download = "Cihan-Demir-CV.pdf";    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Dark/Light Mode Toggle
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    themeToggle.addEventListener('click', function() {
        let theme = 'light';
        if (document.documentElement.getAttribute('data-theme') !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            theme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme);
    });

    // Micro Animations (Scroll Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.timeline-section, .profile-header');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});
