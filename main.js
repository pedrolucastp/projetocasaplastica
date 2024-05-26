document.addEventListener('DOMContentLoaded', () => {
    // Initialize page content
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPageContent(page);
        });
    });

    // Load initial content
    loadPageContent('home');
});

function loadPageContent(pageKey) {
    // Hide all sections
    document.querySelectorAll('main section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const selectedSection = document.getElementById(pageKey);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    } else {
        console.error(`No content found for page: ${pageKey}`);
    }

    if (pageKey === 'map-section') {
        initMap();
    }
}
