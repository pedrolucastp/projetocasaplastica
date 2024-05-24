document.addEventListener('DOMContentLoaded', () => {
    const headerContent = createHeader();
    const footerContent = createFooter();

    document.getElementById('header').innerHTML = headerContent;
    document.getElementById('footer').innerHTML = footerContent;

    function createHeader() {
        return `
            <nav>
                <a href="/" data-page="home"><img src="logo.png" alt="Casa Plastica" class="logo"></a>
                <ul>
                    <li><a href="#" data-page="home">Home</a></li>
                    <li><a href="#" data-page="sobre">Sobre</a></li>
                    <li><a href="#" data-page="servicos">Serviços</a></li>
                    <li><a href="#" data-page="contato">Contato</a></li>
                    <li><a href="#" data-page="map">Mapa</a></li>
                </ul>
            </nav>
        `;
    }

    function createFooter() {
        return `
            <p>&copy; 2024 Projeto Casa Plastica. <br> Todos os direitos reservados.</p>
        `;
    }

    function initMap() {
        const mapDiv = document.getElementById('map');
        if (!mapDiv) {
            console.error("Map div not found");
            return;
        }

        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const locationButton = document.createElement("button");
        locationButton.textContent = "Find Nearest Recycling Center";
        locationButton.classList.add("custom-map-control-button");
        mapDiv.appendChild(locationButton);

        locationButton.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = [position.coords.latitude, position.coords.longitude];
                        map.setView(pos, 13);

                        // Perform nearby search using Overpass API
                        const radius = document.getElementById('radius').value;
                        searchRecyclingCenters(pos, radius, map);
                    },
                    () => {
                        handleLocationError(true, map.getCenter());
                    }
                );
            } else {
                handleLocationError(false, map.getCenter());
            }
        });

        function handleLocationError(browserHasGeolocation, pos) {
            const popup = L.popup()
                .setLatLng(pos)
                .setContent(browserHasGeolocation ?
                    "Error: The Geolocation service failed." :
                    "Error: Your browser doesn't support geolocation.")
                .openOn(map);
        }

        function searchRecyclingCenters(pos, radius, map) {
            const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=reciclagem](around:${radius},${pos[0]},${pos[1]});out;`;
            
            axios.get(overpassUrl).then(response => {
                const data = response.data;
                if (data && data.elements) {
                    data.elements.forEach(element => {
                        if (element.lat && element.lon) {
                            L.marker([element.lat, element.lon]).addTo(map)
                                .bindPopup(`<b>Recycling Center</b><br>${element.tags.name || 'Unnamed'}`);
                        }
                    });
                }
            }).catch(error => {
                console.error("Error fetching recycling centers:", error);
            });
        }
    }

    const initialPageContent = loadPageContent('home');
    document.getElementById('main').innerHTML = initialPageContent;

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            const pageContent = loadPageContent(page);
            document.getElementById('main').innerHTML = pageContent;

            if (page === 'map') {
                initMap();
            }
        });
    });
});
