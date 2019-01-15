var loadMap = function () {
    L.mapquest.key = 'h1AaSPSUGvuBlInfmGZQsZYqflUTxUri';

    var map = L.mapquest.map('map', {
        center: [39.6659, -105.2045],
        layers: L.mapquest.tileLayer('map'),
        zoom: 11
    });

    var map1 = L.mapquest.map('map2', {
        center: [39.6762, -104.9621],
        layers: L.mapquest.tileLayer('map'),
        zoom: 14
    });

    var map2 = L.mapquest.map('map3', {
        center: [40.7062, -73.9949],
        layers: L.mapquest.tileLayer('map'),
        zoom: 11
    });

    var map3 = L.mapquest.map('map4', {
        center: [41.6872, -70.2537],
        layers: L.mapquest.tileLayer('map'),
        zoom: 9
    });


};

document.addEventListener("DOMContentLoaded", function (event) {
    loadMap();
});