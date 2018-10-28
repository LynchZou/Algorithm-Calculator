var count = 0;
var locations = [];
var map;
var geocoder;

$(document).ready(function(){

    $('#map').on("mouseover", function() {
        $("#instruction").addClass("hovered");
    });

    $('#uploadform').on('submit', function(e) {
        var data = new FormData($('#uploadform')[0]);
        e.preventDefault();
        $.ajax({
            type: "post",
            contentType: false,
            processData: false,
            url: "php/upload.php",
            data: data,
            success: function (mydata) {
                // obtain the path
                var path = mydata.toString().split('\n');

                // parse the latitude and longitude information
                var LatLng = [];
                path.forEach(element => {
                    // latitude
                    var latIndexStart = element.indexOf("latitude") + 10;
                    var latIndexEnd = element.indexOf(",");
                    var lat = element.substring(latIndexStart, latIndexEnd);
                    // longitude
                    var lngIndexStart = element.indexOf("longitude") + 11;
                    var lngIndexEnd = element.lenth;
                    var lng = element.substr(lngIndexStart, lngIndexEnd);
                    var position = {lat: parseFloat(lat, 10), lng: parseFloat(lng, 10)};
                    LatLng.push(position);
                });

                LatLng.pop();
                

                // define a symbol
                var lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                  };
                

                var flightPath = new google.maps.Polyline({
                    path: LatLng,
                    icons: [{
                        icon: lineSymbol,
                        offset: '100%',
                        repeat: '100px'
                    }],
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                flightPath.setMap(map);

            }
        });
    });
        

});

function Remove(num) {
    var id = num.substring(2, num.lenth);
    var trID = "#tr-" + id;
    $(trID).remove();


    // set corresponding object to null
    locations[parseInt(id, 10)] = null;
}

// init the map, create the Geocoder object and Map object
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 34.052, lng: -118.244}
    });
    geocoder = new google.maps.Geocoder();

    document.getElementById('address').addEventListener('keypress', function(e) {
        var key = e.which || e.keyCode;
        if (key === 13) { 
            geocodeAddress(geocoder, map);
        }
    });

    document.getElementById('buttonAdd').addEventListener('click', function() {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                AddLocation(results, status, address);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    });
}

// get geo information and set marker
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
                map: resultsMap,
                animation: google.maps.Animation.DROP,
                position: results[0].geometry.location
            });
            marker.addListener('click', function(){
                var address = document.getElementById('address').value;
                AddLocation(results, status, address);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function AddLocation(results, status, address) {

    if (status === 'OK') {
        // update the website

        var str = "<tr id='tr-" + count + "'><td>" + address + " <i id='i-" + count + "' class='fa fa-trash' aria-hidden='true' onclick='Remove(this.id)'></i></td><td>" + results[0].geometry.location.lat().toFixed(3) + "</td><td>" + results[0].geometry.location.lng().toFixed(3) + "</td></tr>";
        $("table tbody").append(str);

        // push elements
        var singleLocation = {location: address, latitude: results[0].geometry.location.lat().toFixed(3), longitude: results[0].geometry.location.lng().toFixed(3)};
        locations.push(singleLocation);

        count++;

    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    }
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}


function submit() {

    var outputStr = "";
    // read locations
    for(var i = 0; i < count; i++){
        if(locations[i] != null) {
            outputStr += locations[i]["location"] + "," + locations[i]["latitude"] + "," + locations[i]["longitude"] + "\n";
        }
    }

    download("output.txt", outputStr);
}