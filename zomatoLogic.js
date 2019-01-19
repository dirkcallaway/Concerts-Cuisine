//Zomato Logic



//api key 18e1e3853dbc10b73621abe274b59639

// var concertLat = 40.5343;
// var concertLon = -105.1151;


// var foodQueryURL = "https://developers.zomato.com/api/v2.1/locations?query=pizza&lat=40.5343&lon=-105.1151&count=10";
var foodQueryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=40.5343&lon=-105.1151&count=10";

 //create ajax call
 $.ajax({
    url: foodQueryURL,
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Accept", "application/json"),
        xhr.setRequestHeader("user-key", "18e1e3853dbc10b73621abe274b59639")
    }, success: function(data) {
        alert(data),
        console.log(data)
    },
    method: "GET"
})

    .then(function(response) {
        console.log(response)
    });