//Creates a card for each Concert and Pushes concert data to concerts div
for(var i = 0; i < 9; i++){ //Will  need to adjust loop to match SongKick Response data length... Not sure its name.
    //Adjust class name of concertCard to match color scheme
    var concertCard = $("<div class='card deep-purple lighten-1'>");
    var cardContent = $("<div class='card-content white-text'>");
    var cardTitle = $("<span class='card-title'>").text("Test Concert " + i + "!"); //Link to SongKick Band Name
    var cardVenue = $("<p>").text("Venue " + i + " info here."); //Link to SongKick Venue Name
    var cardDate = $("<p>").text("Date for " + i + " info here.");  //Link to SongKick Concert Date
    //Puts the card parts together
    cardContent.append(cardTitle);
    cardContent.append(cardVenue);
    cardContent.append(cardDate);
    cardContent.append(cardVenue);
    concertCard.append(cardContent);
    //Pushes finished card into the HTML
    $("#concerts").append(concertCard);
};
        