var mapQueryUrl = "http://www.mapquestapi.com/geocoding/v1/address?";
var mapSearchObject = {
    key: "h1AaSPSUGvuBlInfmGZQsZYqflUTxUri",
    location: ""
};

var ajaxCall = function () {
    $.ajax({
            url: mapQueryUrl,
            method: "GET"
        })

        .then(function (response) {
            console.log(response);
        });
};

//Submit Button Click...
$("#submit").on("click", function () {
    //Grabs Value from input box
    var zipCode = $("#zip").val().trim();
    //Checks length of input... is it 5 long
    if(zipCode.length > 5 || zipCode.length < 5){
        //Alerts if more or less than 5 long
        alert("Please enter a valid Zip Code.");
    } else{
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
    populateConcerts();
});


