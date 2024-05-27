let userPosition = null;
let map = null;
let addedLocations = new Set();

function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) {
        console.error("Map div not found");
        return;
    }

    map = L.map('map')
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    map.setView([-22, -42], 3);

    const locationButton = document.getElementById('locationButton');
    locationButton.addEventListener("click", () => {
        const userPermission = window.confirm("Do you allow us to use your location?");
        if (userPermission) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        userPosition = [position.coords.latitude, position.coords.longitude];
                        map.setView(userPosition, 10);

                        const userLocationIcon = L.divIcon({
                            className: 'user-location-marker'
                        });

                        L.marker(userPosition, { icon: userLocationIcon }).addTo(map)
                            .bindPopup('Your location');
                        const radius = document.getElementById('radius') ? document.getElementById('radius').value : 5000;
                        searchLocations(radius);
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                        handleLocationError(true, map.getCenter());
                    }
                );
            } else {
                handleLocationError(false, map.getCenter());
            }
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

function createPopupContent(name, element) {
    const latLng = `${element.lat.toFixed(6)}, ${element.lon.toFixed(6)}`;
    const address = element.formatted_address ? element.formatted_address : 'No address available';
    const businessStatus = element.business_status ? element.business_status : 'No status available';
    const isOpen = element.isOpen ? (element.isOpen() ? 'Open now' : 'Closed') : 'Opening hours not available';
    const rating = element.rating ? element.rating : 'No rating';
    const userRatingsTotal = element.user_ratings_total ? element.user_ratings_total : 'No reviews';
    const photoUrl = element.photos && element.photos.length > 0 && element.photos[0].raw_reference ? element.photos[0].raw_reference.fife_url : '';

    return `<b>${name}</b><br>
            <b>Location:</b> ${latLng}<br>
            <b>Address:</b> ${address}<br>
            <b>Business Status:</b> ${businessStatus}<br>
            <b>Opening Hours:</b> ${isOpen}<br>
            <b>Rating:</b> ${rating} (${userRatingsTotal} reviews)<br>
            ${photoUrl ? `<img src="${photoUrl}" alt="${name} photo" style="width:100px;height:100px;"><br>` : ''}`;
}

function searchLocations(radius = 5000) {
    if (!userPosition) {
        console.error("User location not available.");
        return;
    }

    searchRecyclingCenters(userPosition, radius, map);
    searchGooglePlaces(userPosition, radius, map);
}

const amenities = ['recycling'];

function searchRecyclingCenters(pos, radius, map) {
    amenities.forEach(amenity => {
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=${amenity}](around:${radius},${pos[0]},${pos[1]});out;`;
        console.log(`Querying Overpass API with URL: ${overpassUrl}`);

        axios.get(overpassUrl).then(response => {
            const data = response.data;
            console.log(`Overpass API response for ${amenity}:`, data);
            if (data && data.elements.length > 0) {
                data.elements.forEach(element => {
                    if (element.lat && element.lon && !addedLocations.has(element.id)) {
                        addedLocations.add(element.id);
                        const name = element.tags && element.tags.name ? element.tags.name : 'Unnamed';
                        L.marker([element.lat, element.lon]).addTo(map)
                            .bindPopup(createPopupContent(name, element));
                        addResultToList(name, element);
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
    const keywords = amenities;
    const fields = ['name', 'geometry', 'place_id', 'formatted_address', 'business_status', 'opening_hours', 'rating', 'user_ratings_total', 'photos'];

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
                    if (place.geometry && place.geometry.location && !addedLocations.has(place.place_id)) {
                        addedLocations.add(place.place_id);
                        const detailsRequest = {
                            placeId: place.place_id,
                            fields: ['name', 'geometry', 'formatted_address', 'business_status', 'opening_hours', 'rating', 'user_ratings_total', 'photos']
                        };

                        service.getDetails(detailsRequest, (placeDetails, status) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                const latLng = [placeDetails.geometry.location.lat(), placeDetails.geometry.location.lng()];
                                const amenity = keyword;
                                const element = {
                                    lat: placeDetails.geometry.location.lat(),
                                    lon: placeDetails.geometry.location.lng(),
                                    tags: { name: placeDetails.name },
                                    formatted_address: placeDetails.formatted_address,
                                    business_status: placeDetails.business_status,
                                    isOpen: () => placeDetails.opening_hours && placeDetails.opening_hours.isOpen(),
                                    rating: placeDetails.rating,
                                    user_ratings_total: placeDetails.user_ratings_total,
                                    photos: placeDetails.photos
                                };
                                console.log('element', element)
                                L.marker(latLng).addTo(map)
                                    .bindPopup(createPopupContent(placeDetails.name, element));
                                addResultToList(placeDetails.name, element);
                            } else {
                                console.error(`Google Places API error for details request: ${status}`);
                            }
                        });
                    }
                });
            } else {
                console.error(`Google Places API error for keyword '${keyword}': ${status}`);
            }
        });
    });
}

function addResultToList(name, element) {
    const resultsPanel = document.getElementById('results-panel');
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';
    const latLng = `${element.lat.toFixed(6)}, ${element.lon.toFixed(6)}`;
    const address = element.formatted_address ? element.formatted_address : 'No address available';
    const businessStatus = element.business_status ? element.business_status : 'No status available';
    const isOpen = element.isOpen ? (element.isOpen() ? 'Open now' : 'Closed') : 'Opening hours not available';
    const rating = element.rating ? element.rating : 'No rating';
    const userRatingsTotal = element.user_ratings_total ? element.user_ratings_total : 'No reviews';
    const photoUrl = element.photos && element.photos.length > 0 && element.photos[0].raw_reference ? element.photos[0].raw_reference.fife_url : '';

    resultCard.innerHTML = `
        <b>${name}</b><br>
        <b>Location:</b> ${latLng}<br>
        <b>Address:</b> ${address}<br>
        <b>Business Status:</b> ${businessStatus}<br>
        <b>Opening Hours:</b> ${isOpen}<br>
        <b>Rating:</b> ${rating} (${userRatingsTotal} reviews)<br>
        ${photoUrl ? `<img src="${photoUrl}" alt="${name} photo" style="width:100px;height:100px;"><br>` : ''}`;
    resultsPanel.appendChild(resultCard);
}

//window.onload = initMap;

