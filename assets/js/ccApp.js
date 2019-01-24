$(document).ready(function () {

    //Initialize Collapsibles
    $('.collapsible').collapsible();

    //Collapsible Instance Variables
    var elem;

    var instance;

    //Songkick API variables
    var apiKey = "N3NwIQTcgTiC3jVE";
    var metroAreaId = "";
    var lat = 39.7392;
    var lon = -104.9903; //default to Denver

    var concertDetails = "";
    var concertCity = "";
    var concertLink = "";
    var venueLat = "";
    var venueLon = "";


    //Loading Maps ------------------------------------------------------------------------------------------

    var loadMap = function () {
        L.mapquest.key = 'h1AaSPSUGvuBlInfmGZQsZYqflUTxUri';

        var map = L.mapquest.map('map', {
            center: [venueLat, venueLon],
            layers: L.mapquest.tileLayer('map'),
            zoom: 14
        });

    };


    //Concerts -----------------------------------------------------------------------------------------------

    // Populate Concert function calls the SongKick API and then builds the concert cards into the HTML
    var populateConcerts = function () {

        var concertQueryUrl = "https://api.songkick.com/api/3.0/search/locations.json?location=geo:" + lat + "," + lon + "&apikey=" + apiKey


        $.ajax({
                url: concertQueryUrl,
                method: "GET"
            })

            .then(function (response) {
                console.log(response);

                metroAreaId = response.resultsPage.results.location[0].metroArea.id;
                console.log("Metro Area ID: " + metroAreaId);

                var concertQueryUrlbyId = "https://api.songkick.com/api/3.0/metro_areas/" + metroAreaId + "/calendar.json?&apikey=" + apiKey

                $.ajax({
                        url: concertQueryUrlbyId,
                        method: "GET"
                    })

                    .then(function (response) {

                        for (var i = 0; i < 9; i++) {

                            concertDetails = response.resultsPage.results.event[i].displayName;
                            concertCity = response.resultsPage.results.event[i].location.city;
                            venueLat = response.resultsPage.results.event[i].location.lat;
                            venueLon = response.resultsPage.results.event[i].location.lng;


                            //Adjust class name of concertCard to match color scheme
                            var concertCard = $("<div class='card concert-click z-depth-4'>");
                            var cardContent = $("<div class='card-content white-text' id='concertCard'>");

                            var cardTitle = $("<span class='card-title' id='concertTitle'>").text(concertDetails); //Link to SongKick Band Name

                            var cardCity = $("<p class='col s6 offset-s9'>").text(concertCity); //Link to SongKick City, State, Country

                            concertLink = response.resultsPage.results.event[i].uri;


                            var cardLink = $("<a target='_blank'>").text("Buy Tickets");
                            cardLink.attr("href", concertLink); //Link to SongKick Website Link


                            //Puts the card parts together
                            cardContent.append(cardTitle);
                            cardContent.append(cardCity);
                            cardContent.append(cardLink);
                            concertCard.attr("data-lat", venueLat);
                            concertCard.attr("data-lon", venueLon);
                            concertCard.append(cardContent);

                            //Pushes finished card into the HTML
                            $("#concerts").append(concertCard);

                        }
                        elem = document.querySelector('.collapsible');

                        //triggers restaurant collapsible to open on concert div click
                        instance = M.Collapsible.getInstance(elem);
                        instance.open(0);
                        $(".concert-click").on("click", function () {
                            $("#concert-itinerary").empty();
                            $(this).clone().appendTo("#concert-itinerary");
                            venueLat = $(this).data("lat");
                            console.log("Lat: " + venueLat);
                            venueLon = $(this).data("lon");
                            console.log("Lon: " + venueLon);
                            populateRestaurants();
                            instance.open(1);
                        });
                    });
            });

    };

    //Restaurants --------------------------------------------------------------------------------------------

    //Populate Restaurant function calls the Zomato API and then buildes the restaurant cards into the HTHML
    var populateRestaurants = function () {

        //restaurant query url
        var foodQueryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=" + venueLat + "&lon=" + venueLon + "&count=10";

        //create ajax call
        $.ajax({
                url: foodQueryURL,

                //use headers from Curl request to create Zomato-acceptable call format
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json"),
                        xhr.setRequestHeader("user-key", "18e1e3853dbc10b73621abe274b59639")
                },
                success: function (data) {},

                method: "GET"
            })

            .then(function (response) {

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

                    //Retrieves restaurant data from object to populate card
                    var restCard = $("<div class='card rest-click z-depth-4'>");
                    var restCardContent = $("<div class='card-content white-text' id='restCard'>");
                    var restCardTitle = $("<span class='card-title' id='restTitle'>").text(" " + restaurantData.name);
                    var restAddress = $("<p>").text("Address: " + restaurantData.address);
                    var restType = $("<p>").text("" + restaurantData.type);
                    // var restMenuLink = $("<>").html("" + restaurantData.menu); //not essential RN but will make work if/when I can
                    // var restPrice = $("<p>").text("" + restaurantData.price); //not essential, would like to format differently
                    var restRating = $("<p id='custRating'>").text("Customer Rating: " + restaurantData.rating);


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
                elem = document.querySelector('.collapsible');

                //triggers itinerary collapsible to open on rest div click
                instance = M.Collapsible.getInstance(elem);
                $(".rest-click").on("click", function () {
                    $("#food-itinerary").empty();
                    $(this).clone().appendTo("#food-itinerary");
                    instance.open(2);
                    loadMap();
                });
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
                // populateRestaurants();
            });
    };

    //Clear concert & restaurant divs at new call function
    function clearConcerts() {
        $("#concerts").empty();

    };

    function clearRestaurants() {
        $("#restaurants").empty();
    };


    //Calls -----------------------------------------------------------------------------------------------


    //Submit Button Click...
    $("#submit").on("click", function (event) {
        event.preventDefault();
        clearConcerts();
        clearRestaurants();

        //Grabs Value from input box
        var zipCode = $("#zip").val().trim();

        //Checks length of input... is it 5 long
        if (zipCode.length > 5 || zipCode.length < 5) {
            M.toast({
                html: 'Invalid Zipcode',
                classes: 'rounded white-text red lighten-2',
            });
        } else {
            //Sets the location in the mapSearchObject
            mapSearchObject.location = zipCode;
        }

        //Updates the mapQueryUrl
        mapQueryUrl = "https://www.mapquestapi.com/geocoding/v1/address?" + $.param(mapSearchObject);

        //Resets the zip input box
        $("#zip").val("");

        //Calls the MapQuest API
        console.log(zipCode);
        ajaxCall();

    });


});