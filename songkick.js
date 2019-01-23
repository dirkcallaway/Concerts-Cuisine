// Initialize Firebase - songkick
// var config = {
//     apiKey: "AIzaSyAwGCAnnYVNCrWzvHGUplO0Qg6Iw0NYXeI",
//     authDomain: "concert-cuisine.firebaseapp.com",
//     databaseURL: "https://concert-cuisine.firebaseio.com",
//     projectId: "concert-cuisine",
//     storageBucket: "concert-cuisine.appspot.com",
//     messagingSenderId: "195330153001"
// };
// firebase.initializeApp(config);

// var database = firebase.database();

//Songkick API variables
var apiKey = "N3NwIQTcgTiC3jVE";
var metroAreaId = "";
var lat = 39.7392;
var lon = -104.9903; //default to Denver

var concertDetails = "";
var concertCity = "";
var concertLink = "";


$(document).ready(function () {


    
    var populateConcerts = function () {


        var concertQueryUrl = "https://api.songkick.com/api/3.0/search/locations.json?location=geo:" + lat + "," + lon + "&apikey=" + apiKey
        console.log(concertQueryUrl);

        $.ajax({
                url: concertQueryUrl,
                method: "GET"
            })

            .then(function (response) {
                console.log(response);

                metroAreaId = response.resultsPage.results.location[0].metroArea.id;
                console.log("Metro Area ID: " + metroAreaId);

                var concertQueryUrlbyId = "https://api.songkick.com/api/3.0/metro_areas/" + metroAreaId + "/calendar.json?&apikey=" + apiKey
                console.log(concertQueryUrlbyId);

                $.ajax({
                        url: concertQueryUrlbyId,
                        method: "GET"
                    })

                    .then(function (response) {
                        console.log(response);

                        for (var i = 0; i < 9; i++) {

                            concertDetails = response.resultsPage.results.event[i].displayName;
                            console.log("Details: " + concertDetails);

                            concertCity = response.resultsPage.results.event[i].location.city;
                            console.log("City, State: " + concertCity);

                            concertLink = response.resultsPage.results.event[i].uri;
                            console.log("Link: " + concertLink);

                            //Adjust class name of concertCard to match color scheme
                            var concertCard = $("<div class='card deep-purple lighten-1 concert-click'>");
                            var cardContent = $("<div class='card-content white-text'>");

                            var cardTitle = $("<span class='card-title'>").text("Event: " + concertDetails); //Link to SongKick Band Name

                            var cardCity = $("<p>").text(concertCity); //Link to SongKick City, State, Country

                            var cardLink = $("<p>").text("Tickets: " + concertLink); //Link to SongKick Website Link


                            //Puts the card parts together
                            cardContent.append(cardTitle);
                            cardContent.append(cardCity);
                            cardContent.append(cardLink);

                            //Pushes finished card into the HTML
                            $("#concerts").append(concertCard);
                            $("#concerts").addClass("focus");
                            $("#concerts").addClass("active");
                            //Need to remove old search when new zip submitted 



                        }
                    });


        

            });

    };
});

