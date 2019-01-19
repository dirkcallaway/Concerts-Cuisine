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
var locationLatLong = "39.6303,-106.0434";
var metroAreaId = "";
var lat = 39.6903
console.log(lat);
var lon = -106.0434
console.log(lon);



var concertQueryUrl = "https://api.songkick.com/api/3.0/search/locations.json?location=geo:" + lat + "," + lon + "&apikey=" + apiKey
console.log(concertQueryUrl);


$(document).ready(function(){

$.ajax({
        url: concertQueryUrl,
        method: "GET"
    })

    .then(function (response) {
        console.log(response);
        
        metroAreaId = response.resultsPage.results.location[0].metroArea.id;
        console.log(metroAreaId);
        
        var concertQueryUrlbyId = "https://api.songkick.com/api/3.0/metro_areas/" + metroAreaId + "/calendar.json?&apikey=" + apiKey
        console.log(concertQueryUrlbyId);

        $.ajax({
            url: concertQueryUrlbyId,
            method: "GET"
        })
    
        .then(function (response) {
            console.log(response);
        });
    });

    });

