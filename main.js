// creating global variables
let latitude, longitude, destination;

$(document).ready(function(){
    alert('Please allow your browser to know your location');
    initGeolocation();
});

$(function(){
    // navigating to the ar_weather.html page when the button is clicked
   $("#navigate_button").click(function(){
        window.location.href = `ar_weather.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
   });
});

// a function that takes the current position of the user
// and passing it to the success() callback function
function initGeolocation(){
    // checking if the geolocation property exists or not
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success);
    }
    else{
        alert('Please allow your browser to know your location');
    }
}

function success(position){
    console.log(position);

    // fetching lat and lng of the user's current location 
    // and saving them in the global variables declared above
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    destination;

    // the access token associates with your Mapbox GL JS with a Mapbox account (initialzing mapbox)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';

    // creating a new Map object
    var map = new mapboxgl.Map({
        container: 'map', // div container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style url
        center: [longitude, latitude], // starting position [longitude, latitude]
        zoom: 4 // starting zoom
    });

    // adding the image markers on the map
    var img1 = document.querySelector("#arch");
    var marker1 = new mapboxgl.Marker({
        element: img1
    })
    .setLngLat([-90.184776, 38.624691])
    .addTo(map)

    var img2 = document.querySelector("#sphinx");
    var marker2 = new mapboxgl.Marker({
        element: img2
    })
    .setLngLat([31.1360, 29.9718])
    .addTo(map)

    var img3 = document.querySelector("#liberty");
    var marker3 = new mapboxgl.Marker({
        element: img3
    })
    .setLngLat([-74.044502, 40.689247])
    .addTo(map)

    var img4 = document.querySelector("#mermaid");
    var marker4 = new mapboxgl.Marker({
        element: img4
    })
    .setLngLat([12.5929, 55.6890])
    .addTo(map)

    var img5 = document.querySelector("#taj_mahal");
    var marker5 = new mapboxgl.Marker({
        element: img5
    })
    .setLngLat([78.042068, 27.173891])
    .addTo(map)

    // adding a MapboxGeocoder control to search places in the map
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );

    // adding onResult() to the map's geocoder to save the destination position
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }).on('result', function(e){
            destination = e.result.center
        })
    );

    console.log(destination);
}