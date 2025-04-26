// Basit JavaScript işlevselliği
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde animasyon eklemek için
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Gecikme ile animasyon ekle
        setTimeout(() => {
            item.classList.add('visible');
        }, 100 * index);
    });
    
    // Sosyal medya linklerini açmak için (örnek)
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Gerçek linkleri olmadığı için şimdilik engelliyoruz
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Bu link henüz aktif değil.');
            }
        });
    });
});
