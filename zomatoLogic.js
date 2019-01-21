//Zomato Logic



//api key 18e1e3853dbc10b73621abe274b59639

//test variables:
// var concertLat = 40.5343;
// var concertLon = -105.1151;

//insert true lat/lon variables here
// var lat = 
// var lon = 

var foodQueryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=40.5343&lon=-105.1151&count=10";

 //create ajax call
 $.ajax({
    url: foodQueryURL,
    //use headers from Curl request to create acceptable call format
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Accept", "application/json"),
        xhr.setRequestHeader("user-key", "18e1e3853dbc10b73621abe274b59639")
    }, success: function(data) {},
    method: "GET"
})

    .then(function(response) {
        
        //for loop to show data and create cards for each restaurant 
        for (var i = 0; i < response.nearby_restaurants.length; i++) {
            
            //turn data into an object
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
            $(".restaurant").append(restCard);
            
        };
            

           

        });
   

