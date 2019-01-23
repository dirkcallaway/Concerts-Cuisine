$(".concert-click").on("click", function(){
    $("#concert-itinerary").empty();
    $(this).clone().appendTo("#concert-itinerary");
});