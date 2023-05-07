// global variable which will be an empty object
var coordinates = {}

$(document).ready(function(){
    get_coordinates();
    get_weather();
}); 

function get_coordinates(){
    // using URLSearchParams() to get the lat and lng of the source and destination
    let searchParams = new URLSearchParams(window.location.search);

    // checking if source and destination exists in searchParams
    if(searchParams.has('source') && searchParams.has('destination')){
        // getting the source and destination info from searchParams
        let source = searchParams.get('source');
        let destination = searchParams.get('destination');

        // getting lat and lng of the source's location
        coordinates.source_latitude = source.split(';')[0];
        coordinates.source_longitude = source.split(';')[1];

        // getting lat and lng of the destination's location
        coordinates.destination_latitude = destination.split(';')[0];
        coordinates.destination_longitude = destination.split(';')[1];
    }
    else{
        alert('Coordinates were not selected!');

        // you go back to the last visited page in your history
        window.history.back();
    }
}

// function to get the weather of our destination's location
function get_weather(){
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_latitude}&lon=${coordinates.destination_longitude}&appid=a375a93b25d9eea647c50e5d052c2328`,
        type: "get",
        success: function(response){
           console.log(response);

           let name = response.name;
           let weather = response.weather[0].main;
            $("#scene_container").append(
                `
                    <a-entity gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0]};">
                        <a-entity>
                            <a-text height="50" value="Weather forecast is ${weather} at ${name}"></a-text>
                        </a-entity>
                    </a-entity>
                `
            )
           
        }
    });
}