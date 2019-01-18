var mapQueryUrl = "http://www.mapquestapi.com/geocoding/v1/address?";
var mapSearchObject = {
    key : "h1AaSPSUGvuBlInfmGZQsZYqflUTxUri",
    location : "80526"
};

//Button Click eventually...
mapQueryUrl += $.param(mapSearchObject);
console.log(mapQueryUrl);


var ajaxCall = function () {
    $.ajax({
            url: mapQueryUrl,
            method: "GET"
        })

        .then(function (response) {
            console.log(response);
        });
};

ajaxCall();