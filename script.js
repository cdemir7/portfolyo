document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = sidebar.querySelectorAll('nav ul li a');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when a nav link is clicked (useful on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Optional: Close sidebar if user clicks outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    document.querySelector(".btn.btn-outline").addEventListener("click", function () {
        const link = document.createElement("a");
        link.href = "other/Cihan-Demir-CV.pdf";  
        link.download = "Cihan-Demir-CV.pdf";    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
});
