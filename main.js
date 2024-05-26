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

    const locationButton = L.DomUtil.create('button', 'custom-map-control-button', mapDiv);
    locationButton.textContent = "Encontre uma reciclagem próxima";

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = [position.coords.latitude, position.coords.longitude];
                    map.setView(pos, 13);

                    const radius = document.getElementById('radius') ? document.getElementById('radius').value : 5000;
                    searchRecyclingCenters(pos, radius, map);
                    searchGooglePlaces(pos, radius, map);
                },
                (error) => {
                    console.error("Geolocation error:", error);
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

    function createPopupContent(name, amenity, api, element) {
        const latLng = `${element.lat.toFixed(6)}, ${element.lon.toFixed(6)}`;
        return `<b>${name}</b><br>
                <b>Amenity:</b> ${amenity}<br>
                <b>API:</b> ${api}<br>
                <b>Location:</b> ${latLng}`;
    }

    function searchRecyclingCenters(pos, radius, map) {
        const amenities = ['recycling', 'waste_disposal'];
        amenities.forEach(amenity => {
            const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=${amenity}](around:${radius},${pos[0]},${pos[1]});out;`;
            console.log(`Querying Overpass API with URL: ${overpassUrl}`);

            axios.get(overpassUrl).then(response => {
                const data = response.data;
                console.log(`Overpass API response for ${amenity}:`, data);
                if (data && data.elements.length > 0) {
                    data.elements.forEach(element => {
                        if (element.lat && element.lon) {
                            const name = element.tags && element.tags.name ? element.tags.name : 'Unnamed';
                            L.marker([element.lat, element.lon]).addTo(map)
                                .bindPopup(createPopupContent(name, amenity, 'Overpass API', element));
                        }
                    });
                } else {
                    console.error(`No elements found in Overpass API response for ${amenity}.`);
                }
            }).catch(error => {
                console.error(`Error fetching ${amenity}:`, error);
            });
        });
    }

    function searchGooglePlaces(pos, radius, map) {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            location: { lat: pos[0], lng: pos[1] },
            radius: radius,
            type: ['reciclagem'], 
            language: 'pt-BR'
        };

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                results.forEach(place => {
                    if (place.geometry && place.geometry.location) {
                        if (place.types && place.types.length > 0 && place.types[0] === "lodging") return
                        const latLng = [place.geometry.location.lat(), place.geometry.location.lng()];
                        const amenity = place.types && place.types.length > 0 ? place.types[0] : '';
                        const element = {
                            lat: place.geometry.location.lat(),
                            lon: place.geometry.location.lng(),
                            tags: { name: place.name }
                        };
                        L.marker(latLng).addTo(map)
                            .bindPopup(createPopupContent(place.name, amenity, 'Google Places API', element));
                    }
                });
            } else {
                console.error(`Google Places API error: ${status}`);
            }
        });
    }
}

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

    const initialPageContent = loadPageContent('home');
    document.getElementById('main').innerHTML = initialPageContent;

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            const pageContent = loadPageContent(page);
            document.getElementById('main').innerHTML = pageContent;

            if (page === 'map') {
                if (!document.getElementById('map')) {
                    const mapDiv = document.createElement('div');
                    mapDiv.id = 'map';
                    mapDiv.style.height = '400px';
                    mapDiv.style.width = '100%';
                    document.getElementById('main').appendChild(mapDiv);
                }
                initMap();
            }
        });
    });
});

function loadPageContent(pageKey) {
    const pageData = pageTextContent[pageKey];
    if (!pageData) {
        console.error(`No content found for page: ${pageKey}`);
        const errorMsg = `Content not found.`;
        return `<p>${errorMsg}</p>`;
    }

    const titleHTML = createTitleHTML(pageData.title);
    const contentHTML = createContentHTML(pageData.body);

    return `<section>${titleHTML + contentHTML}</section>`;
}
