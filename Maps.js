let directionsService;
let directionsRenderer;
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.4545, lng: -2.5879 },
        zoom: 14
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const locations = [
        {lat: 51.4545, lng: -2.589, title: "Statue 1"},
        {lat: 51.4556, lng: -2.5915, title: "Statue 2"},
        {lat: 51.4496, lng: -2.6004, title: "Statue 3"},
        {lat: 51.4511, lng: -2.6081, title: "Statue 4"},
        {lat: 51.4582, lng: -2.5855, title: "Statue 5"},
        {lat: 51.4558, lng: -2.5881, title: "Statue 6"},
        {lat: 51.4591, lng: -2.5994, title: "Statue 7"},
        {lat: 51.4492, lng: -2.6080, title: "Statue 8"},
        {lat: 51.4540, lng: -2.5898, title: "Bench 1 - College Green"},
        {lat: 51.4561, lng: -2.6025, title: "Bench 2 - Brandon Hill Park"},
        {lat: 51.4517, lng: -2.5979, title: "Bench 3 - Queen Square"},
        {lat: 51.4580, lng: -2.5912, title: "Bench 4 - Stokes Croft Area"},
        {lat: 51.4524, lng: -2.6082, title: "Bench 5 - Harbourside Walk"},
        {lat: 51.4550, lng: -2.5985, title: "WC 1 - Millennium Square Toilets"},
        {lat: 51.4532, lng: -2.5870, title: "WC 2 - Broadmead Shopping Area Toilets"},
        {lat: 51.4572, lng: -2.6031, title: "WC 3 - Clifton Down Public Toilets"},
        {lat: 51.4490, lng: -2.6010, title: "WC 4 - Wapping Wharf Toilets"},
        {lat: 51.4520, lng: -2.5890, title: "WC 5 - Castle Park Toilets"}
    ];

    locations.forEach((location, index) => {
        const markerOptions = {
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title
        };
        if (index >= 8 && index <= 12) {
            markerOptions.icon = {
                url: "../Assets/bench.png",
                scaledSize: new google.maps.Size(40, 40)
            };
        } else if (index >= 13) {
            markerOptions.icon = {
                url: "../Assets/WC.png",
                scaledSize: new google.maps.Size(40, 40)
            };
        } else {
            markerOptions.label = {
                text: String(index + 1),
                color: "white",
                fontWeight: "bold"
            };
        }
        new google.maps.Marker(markerOptions);
    });
}
document.querySelector('.create-route-btn').addEventListener('click', createRoute);

function createRoute(event) {
    event.preventDefault();

    const selectedCheckboxes = document.querySelectorAll('.location-checkbox:checked');
    if (selectedCheckboxes.length < 2) {
        alert("Please select at least two locations");
        return;
    }

    const locations = [
        {lat: 51.4545, lng: -2.589, title: "Statue 1"},
        {lat: 51.4556, lng: -2.5915, title: "Statue 2"},
        {lat: 51.4496, lng: -2.6004, title: "Statue 3"},
        {lat: 51.4511, lng: -2.6081, title: "Statue 4"},
        {lat: 51.4582, lng: -2.5855, title: "Statue 5"},
        {lat: 51.4558, lng: -2.5881, title: "Statue 6"},
        {lat: 51.4591, lng: -2.5994, title: "Statue 7"},
        {lat: 51.4492, lng: -2.6080, title: "Statue 8"}
    ];

    const selectedLocations = Array.from(selectedCheckboxes).map(cb => {
        const index = parseInt(cb.dataset.index);
        return locations[index];
    });

    const origin = selectedLocations[0];
    const destination = selectedLocations[selectedLocations.length - 1];
    const waypoints = selectedLocations.slice(1, -1).map(loc => ({
        location: loc,
        stopover: true
    }));

   const request = {
        origin: origin,
        destination: destination,
         waypoints: waypoints, 
        travelMode: 'WALKING',
        optimizeWaypoints: true, 
        provideRouteAlternatives: false
    };

    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            alert('Directions request failed due to ' + status);
        }
    });
}
function downloadHardcodedMap() {
        const url = "https://maps.googleapis.com/maps/api/staticmap" +
            "?size=600x600" +                 
            "&maptype=roadmap" +              
            "&markers=color:blue|label:1|51.4545,-2.589" +
            "&markers=color:blue|label:2|51.4556,-2.5915" +
            "&markers=color:blue|label:3|51.4496,-2.6004" +
            "&markers=color:blue|label:4|51.4511,-2.6081" +
            "&path=color:0xff0000ff|weight:5|51.4545,-2.589|51.4556,-2.5915|51.4496,-2.6004|51.4511,-2.6081" +
            "&key=AIzaSyC5E4h5A0ASncbbtX9D2qz3_QSFcnWF0L0";
            const link = document.createElement("a");
            link.href = url;
            document.body.appendChild(link);
            link.click();
       
}