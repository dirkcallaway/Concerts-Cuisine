
//Loading Maps ------------------------------------------------------------------------------------------

var loadMap = function () {
    L.mapquest.key = 'h1AaSPSUGvuBlInfmGZQsZYqflUTxUri';

    var map = L.mapquest.map('map', {
        center: [39.6659, -105.2045],
        layers: L.mapquest.tileLayer('map'),
        zoom: 11
    });

};

//Geocoding ----------------------------------------------------------------------------------------------
var mapQueryUrl = "http://www.mapquestapi.com/geocoding/v1/address?";
var mapSearchObject = {
    key: "h1AaSPSUGvuBlInfmGZQsZYqflUTxUri",
    location: ""
};
var lat;
var lon;

var ajaxCall = function () {
    $.ajax({
            url: mapQueryUrl,
            method: "GET"
        })

        .then(function (response) {
            console.log(response);
            lat = response.results[0].locations[0].latLng.lat;
            lon = response.results[0].locations[0].latLng.lng;
            populateConcerts();
        });
};


//Calls -----------------------------------------------------------------------------------------------


//Submit Button Click...
$("#submit").on("click", function () {
    //Grabs Value from input box
    var zipCode = $("#zip").val().trim();
    //Checks length of input... is it 5 long
    if (zipCode.length > 5 || zipCode.length < 5) {
        //Alerts if more or less than 5 long
        alert("Please enter a valid Zip Code.");
    } else {
        //Sets the location in the mapSearchObject
        mapSearchObject.location = zipCode;
    }
    //Updates the mapQueryUrl
    mapQueryUrl += $.param(mapSearchObject);
    console.log(mapQueryUrl);
    //Resets the zip input box
    $("#zip").val("");
    //Calls the MapQuest API
    ajaxCall();
});