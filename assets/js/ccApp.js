//Songkick API variables
var apiKey = "N3NwIQTcgTiC3jVE";
var metroAreaId = "";
var lat = 39.7392;
var lon = -104.9903; //default to Denver

var concertDetails = "";
var concertCity = "";
var concertLink = "";

//Loading Maps ------------------------------------------------------------------------------------------

var loadMap = function () {
    L.mapquest.key = 'h1AaSPSUGvuBlInfmGZQsZYqflUTxUri';

    var map = L.mapquest.map('map', {
        center: [39.6659, -105.2045],
        layers: L.mapquest.tileLayer('map'),
        zoom: 11
    });

};

//Concerts -----------------------------------------------------------------------------------------------

// Populate Concert function calls the SongKick API and then builds the concert cards into the HTML
var populateConcerts = function () {

    var concertQueryUrl = "https://api.songkick.com/api/3.0/search/locations.json?location=geo:" + lat + "," + lon + "&apikey=" + apiKey
    // console.log(concertQueryUrl);

    $.ajax({
            url: concertQueryUrl,
            method: "GET"
        })

        .then(function (response) {
            // console.log(response);

            metroAreaId = response.resultsPage.results.location[0].metroArea.id;
            console.log("Metro Area ID: " + metroAreaId);

            var concertQueryUrlbyId = "https://api.songkick.com/api/3.0/metro_areas/" + metroAreaId + "/calendar.json?&apikey=" + apiKey
            // console.log(concertQueryUrlbyId);

            $.ajax({
                    url: concertQueryUrlbyId,
                    method: "GET"
                })

                .then(function (response) {
                    // console.log(response);

                    for (var i = 0; i < 9; i++) {

                        concertDetails = response.resultsPage.results.event[i].displayName;
                        // console.log("Details: " + concertDetails);

                        concertCity = response.resultsPage.results.event[i].location.city;
                        // console.log("City, State: " + concertCity);

                        concertLink = response.resultsPage.results.event[i].uri;
                        // console.log("Link: " + concertLink);

                        //Adjust class name of concertCard to match color scheme
                        var concertCard = $("<div class='card deep-purple lighten-1 concert-click'>");
                        var cardContent = $("<div class='card-content white-text'>");

                        var cardTitle = $("<span class='card-title'>").text("Event: " + concertDetails); //Link to SongKick Band Name

                        var cardCity = $("<p>").text(concertCity); //Link to SongKick City, State, Country

                        var cardLink = $("<a target='_blank'>").text("Buy Tickets");
                        cardLink.attr("href", concertLink); //Link to SongKick Website Link


                        //Puts the card parts together
                        cardContent.append(cardTitle);
                        cardContent.append(cardCity);
                        cardContent.append(cardLink);
                        concertCard.append(cardContent);

                        //Pushes finished card into the HTML
                        $("#concerts").append(concertCard);
                        //Need to remove old search when new zip submitted 
                    }
                    $('#concerts-header').addClass("active");
                });


        });

};

//Restaurants --------------------------------------------------------------------------------------------

//Populate Restaurant function calls the Zomato API and then buildes the restaurant cards into the HTHML
var populateRestaurants = function() {

    //restaurant query url
    var foodQueryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + lon + "&count=10";
    
    //create ajax call
    $.ajax({
        url: foodQueryURL,

        //use headers from Curl request to create Zomato-acceptable call format
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/json"),
            xhr.setRequestHeader("user-key", "18e1e3853dbc10b73621abe274b59639")
        }, success: function(data) {},

        method: "GET"
    })

    .then(function(response) {
         
        //for loop to show data and create cards for each restaurant 
        for (var i = 0; i < response.nearby_restaurants.length; i++) {
            
            //turn data into an object for easier reference
            var restaurantData = {
                name: response.nearby_restaurants[i].restaurant.name,
                address: response.nearby_restaurants[i].restaurant.location.address,
                type: response.nearby_restaurants[i].restaurant.cuisines,
                price: response.nearby_restaurants[i].restaurant.price_range,
                menu: response.nearby_restaurants[i].restaurant.menu_url,
                link: response.nearby_restaurants[i].restaurant.url,
                rating: response.nearby_restaurants[i].restaurant.user_rating.aggregate_rating,
                ratingText: response.nearby_restaurants[i].restaurant.user_rating.rating_text,
            }

            console.log(restaurantData);
         
            //Retrieves restaurant data from object to populate card
            var restCard = $("<div class='card deep-purple lighten-1 concert-click'>");
            var restCardContent = $("<div class='card-content white-text'>");
            var restCardTitle = $("<span class='card-title'>").text(" " + restaurantData.name); 
            var restAddress = $("<p>").text("Address: " + restaurantData.address); 
            var restType = $("<p>").text("" + restaurantData.type); 
              // var restMenuLink = $("<>").html("" + restaurantData.menu); //not essential RN but will make work if/when I can
              // var restPrice = $("<p>").text("" + restaurantData.price); //not essential, would like to format differently
            var restRating = $("<p>").text("Customer Rating: " + restaurantData.rating); 


            //Puts the card parts together
            restCardContent.append(restCardTitle);
            restCardContent.append(restAddress);
            restCardContent.append(restType);
                // restCardContent.append(restMenuLink);
                // restCardContent.append(restPrice);
            restCardContent.append(restRating);
            restCard.append(restCardContent);

            //Pushes finished card into the HTML
            $("#restaurants").append(restCard);
            
        }  
        $("#restaurants-header").addClass("active");
    });
};

//Geocoding ----------------------------------------------------------------------------------------------
var mapQueryUrl = "https://www.mapquestapi.com/geocoding/v1/address?";
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
            console.log("Lat: " + lat);
            console.log("Lon: " + lon);
            populateConcerts();
            populateRestaurants();
        });
};


//Calls -----------------------------------------------------------------------------------------------


//Submit Button Click...
$("#submit").on("click", function (event) {
    event.preventDefault();
    $("#concerts").empty();
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
    // console.log(mapQueryUrl);
    //Resets the zip input box
    $("#zip").val("");
    //Calls the MapQuest API
    console.log(zipCode);
    ajaxCall();
});