let userPosition = null;
let map = null;

function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) {
        console.error("Map div not found");
        return;
    }

    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locationButton = document.getElementById('locationButton');
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userPosition = [position.coords.latitude, position.coords.longitude];
                    map.setView(userPosition, 13);
                    searchLocations();
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
}

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

function searchLocations() {
    if (!userPosition) {
        console.error("User location not available.");
        return;
    }

    const radius = document.getElementById('radius') ? document.getElementById('radius').value : 5000;
    searchRecyclingCenters(userPosition, radius, map);
    searchGooglePlaces(userPosition, radius, map);
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
                        addResultToList(name, amenity, 'Overpass API', element);
                    }
                });
            } else {
                console.warn(`No elements found in Overpass API response for ${amenity}.`);
            }
        }).catch(error => {
            console.error(`Error fetching ${amenity} from Overpass API:`, error);
        });
    });
}

function searchGooglePlaces(pos, radius, map) {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const request = {
        location: { lat: pos[0], lng: pos[1] },
        radius: radius,
        keyword: 'reciclagem',
        language: 'pt-BR'
    };

    console.log(`Querying Google Places API with request:`, request);

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(`Google Places API response:`, results);
            results.forEach(place => {
                if (place.geometry && place.geometry.location) {
                    if (place.types && place.types.length > 0 && place.types[0] === "lodging") return;
                    const latLng = [place.geometry.location.lat(), place.geometry.location.lng()];
                    const amenity = place.types && place.types.length > 0 ? place.types[0] : 'reciclagem';
                    const element = {
                        lat: place.geometry.location.lat(),
                        lon: place.geometry.location.lng(),
                        tags: { name: place.name }
                    };
                    L.marker(latLng).addTo(map)
                        .bindPopup(createPopupContent(place.name, amenity, 'Google Places API', element));
                    addResultToList(place.name, amenity, 'Google Places API', element);
                }
            });
        } else {
            console.error(`Google Places API error: ${status}`);
        }
    });
}

function addResultToList(name, amenity, api, element) {
    const resultsPanel = document.getElementById('results-panel');
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';
    resultCard.innerHTML = `
        <b>${name}</b><br>
        <b>Amenity:</b> ${amenity}<br>
        <b>API:</b> ${api}<br>
        <b>Location:</b> ${element.lat.toFixed(6)}, ${element.lon.toFixed(6)}
    `;
    resultsPanel.appendChild(resultCard);
}
