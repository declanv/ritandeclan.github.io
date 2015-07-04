$(document).ready(function(){

  var mapStyles =
    [
      {
        "featureType": "administrative.neighborhood",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#f7b7c7" }
        ]
      },{
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#f7b7c7" }
        ]
      },{
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#f7b7c7" }
        ]
      },{
        "featureType": "landscape.natural",
        "stylers": [
          { "color": "#75d0bb" }
        ]
      },{
        "featureType": "landscape",
        "stylers": [
          { "color": "#f7b7c7" }
        ]
      },{
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
          { "weight": 0.8 },
          { "color": "#656478" }
        ]
      },{
        "featureType": "water",
        "stylers": [
          { "color": "#75d0bb" }
        ]
      },{
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          { "color": "#e9243c" }
        ]
      },{
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "color": "#656478" },
          { "weight": 0.1 },
          { "visibility": "on" },
          { "invert_lightness": true }
        ]
      },{
        "featureType": "transit.station",
        "stylers": [
          { "color": "#f18d11" }
        ]
      },{
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          { "color": "#75d0bb" }
        ]
      },{
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "color": "#656478" },
          { "weight": 0.6 }
        ]
      },{
        "featureType": "poi.attraction",
        "stylers": [
          { "color": "#f18d11" }
        ]
      },{
        "featureType": "poi.attraction",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "color": "#656478" }
        ]
      },{
        "featureType": "poi.business",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "color": "#656478" },
          { "weight": 0.1 }
        ]
      },{
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
          { "color": "#ffffff" },
          { "weight": 0.8 },
          { "lightness": 32 },
          { "gamma": 1.04 },
          { "saturation": 1 }
        ]
      },{
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          { "color": "#ffffff" },
          { "weight": 2 },
          { "lightness": 32 },
          { "gamma": 1.04 },
          { "saturation": 1 }
        ]
      }
    ];

  var mapOptions = {
    center: { lat: 26.1451065, lng: -81.7918291},
    zoom: 12,
    styles: mapStyles
  };

  // map.setOptions({styles: styles});

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var yourWeather = 'Mediocre';
  var yourTemp = 'Meh&deg; F';

  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {

      // Ajax call for your weather
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat="+ position.coords.latitude + "&lon=" + position.coords.longitude+ "&units=imperial",
        crossDomain: true
      }).success(function(data) {
          console.log("your weather data", data);

          console.log(" your description", data.weather[0].description);
          console.log(" your main", data.weather[0].main);
          console.log(" your temp", data.main.temp);

          yourWeather = data.weather[0].description;
          yourTemp = data.main.temp + '&deg;' + ' F';

          $("#your-weather").html(yourWeather);
          $("#your-temp").html(yourTemp);

        }).error(function(){
          $("#your-weather").html(yourWeather);
          $("#your-temp").html(yourTemp);
        });
      });

  } else {
    $("#your-weather").html(yourWeather);
    $("#your-temp").html(yourTemp);
  }

  $("#your-weather").html(yourWeather);
  $("#your-temp").html(yourTemp);

// Ajax call for Naples temp, desc, and weather.
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?id=4165565&units=imperial",
    crossDomain: true
  }).success(function(data) {
      console.log("naples weather data", data);

      console.log("description", data.weather[0].description);
      console.log("main", data.weather[0].main);
      console.log("temp", data.main.temp);

        $("#naples-weather").html(data.weather[0].description);
        $("#naples-temp").html(data.main.temp + '&deg;' + ' F');

    });

  // smooth scroll jquery
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.href);
    if( target.length ) {
        event.preventDefault();
        $('html, body, window').animate({
            scrollTop: target.offset().top
        }, 5000);
    }
  });

  // set the date we're counting down to
var target_date = new Date("April 30, 2016").getTime();

// variables for time units
var days, hours, minutes, seconds;

// days
var daysElement = document.getElementById("days");
// hours
var hoursElement = document.getElementById("hours");
// minutes
var minutesElement = document.getElementById("minutes");
// seconds
var secondsElement = document.getElementById("seconds");

// update the tag with id "countdown" every 1 second
setInterval(function () {

    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);

    // format countdown string + set tag value
    daysElement.innerHTML = days;
    hoursElement.innerHTML = hours;
    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = seconds;

    console.log("time", days + "d, " + hours + "h, " + minutes + "m, " + seconds + "s");

}, 1000);

// The list of cards
var cardArray =
[
 'public/assets/img/card-1.jpg',
 'public/assets/img/card-2.jpg',
 'public/assets/img/card-3.jpg',
 'public/assets/img/card-4.jpg'
 ];

// seconds
var cardContainer = document.getElementById("cards-container");

// Create a for-loop that swaps the href in the container once every 5 seconds.
// Also include an animation for the transition.

// setInterval(function () {

//   $.forEach(cardArray) {
//     cardContainer.attr['href'] = cardArray[]
//   }

// }, 5000);

// Make Instagram API call to pull photos with the hashtag #ritandeclan

// Ajax call for Naples temp, desc, and weather.
  $.ajax({
    url: "https://api.instagram.com/v1/tags/ritandeclan/media/recent?client_id=8953bce455c5461f910bf9050de3891f",
    crossDomain: true
  }).success(function(data) {
      console.log("naples weather data", data['images']['standard_resolution']['url']);


        $("#insta-gallery").html(data['images']['standard_resolution']['url']);


    });

});
