function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) {
        console.error("Map div not found");
        return;
    }

    map = L.map('map').setView([-22, -42], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userPosition = [position.coords.latitude, position.coords.longitude];
                map.setView(userPosition, 13);

                const userLocationIcon = L.divIcon({
                    className: 'user-location-marker'
                });

                L.marker(userPosition, { icon: userLocationIcon }).addTo(map)
                    .bindPopup('Your location');
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

    const locationButton = document.getElementById('locationButton');
    locationButton.addEventListener("click", () => {
        const radius = document.getElementById('radius') ? document.getElementById('radius').value : 5000;
        searchLocations(radius);
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

function searchLocations(radius = 5000) {
    if (!userPosition) {
        console.error("User location not available.");
        return;
    }

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
    const keywords = ['reciclagem', 'recycling', 'waste disposal'];
    const fields = ['name', 'geometry']; // Specify only the fields you need

    keywords.forEach(keyword => {
        const request = {
            location: { lat: pos[0], lng: pos[1] },
            radius: radius,
            query: keyword,
            fields: fields,
            language: 'pt-BR'
        };

        console.log(`Querying Google Places API with request:`, request);

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(`Google Places API response for keyword '${keyword}':`, results);
                results.forEach(place => {
                    if (place.geometry && place.geometry.location) {
                        const latLng = [place.geometry.location.lat(), place.geometry.location.lng()];
                        const amenity = keyword;
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
                console.error(`Google Places API error for keyword '${keyword}': ${status}`);
            }
        });
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
