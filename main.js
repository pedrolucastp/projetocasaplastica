document.addEventListener('DOMContentLoaded', () => {
    // Initialize page content
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page === 'map-section') {
                requestUserLocation();
            } else {
                loadPageContent(page);
            }
        });
    });

    // Load initial content
    loadPageContent('home');
});

function requestUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userPosition = [position.coords.latitude, position.coords.longitude];
                loadPageContent('map-section');
            },
            (error) => {
                console.error("Geolocation error:", error);
                loadPageContent('map-section'); // Load map-section even if geolocation fails
            }
        );
    } else {
        console.warn("Geolocation not supported");
        loadPageContent('map-section'); // Load map-section if geolocation is not supported
    }
}

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
