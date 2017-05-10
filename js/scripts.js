  $(document).ready(function(){


    $('.tooltipped').tooltip({delay: 50});

    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 20
    });

    $('.modal').modal();

    $('select').material_select();

    $(".button-collapse").sideNav();


    // Intro animation
    if( $(window).width() > 992 ){

      $('#explore').on('click', function(){

        $('main').animate({
          "marginLeft": "375"
        }, 0, function(){

          initMap();
        });
       

        $('.tagline').fadeOut(400, function(){
          $('.tagline').remove();
        });

        $('.side-nav').removeClass('transparent-bg');

        $('.map-overlay').removeClass('white-overlay');

        $('.side-nav').delay(500).animate({
          "width": "375"
        }, 2000);

        $('img.logo').delay(500).animate({
          "paddingTop": "0.5em",
          "width": "200"
        }, 2000, function(){

          //Slide down the form
          $(".form-container").slideDown(2000, function(){

            $('.form-container .form-top').css('overflow-y', 'auto');
          });
        });

      });

    }
      


    //Set map height
    $('#map').css('height', $(window).height());


    //Place overlay over map
    $('main').prepend('<div class="map-overlay white-overlay"></div>');


    if( $(window).width() < 992){

      //If mobile, show side nav
        $('.button-collapse').sideNav('show');

      //If mobile, disable tooltips
        $('.tooltipped').tooltip('remove');

      //If mobile, decrease map height to accommodate top header
        $('#map').css('height', '-=49');
    }


    //Show more filters
    $('#show-filters').on('click', function(){

      $('#extra-filters').slideToggle();

      $(this).toggleClass('active');

      if( $(this).is('.active') ){

        $(this).html("Less Filters <i class='fa fa-arrow-up' aria-hidden='true'></i>");
      }
      else {

        $(this).html("More Filters <i class='fa fa-arrow-down' aria-hidden='true'></i>");

        //Clear values for input fields
        $('#extra-filters input[type="date"]').val('');
        $('#extra-filters input[type="checkbox"]').prop('checked', false);
      }

    }); //END show filters click



    var preloader = '<div class="preloader-container">' +
                      '<div class="preloader-wrapper big active">' +
                        '<div class="spinner-layer spinner-green-only">' +
                          '<div class="circle-clipper left">' +
                            '<div class="circle"></div>' +
                          '</div><div class="gap-patch">' +
                            '<div class="circle"></div>' +
                          '</div><div class="circle-clipper right">' +
                            '<div class="circle"></div>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>';

    $(document).ajaxStart(function(){

      $("main").prepend(preloader);
    });
    
    $(document).ajaxComplete(function(){

      $('.preloader-container').fadeOut(300, function(){
        $('.preloader-container').remove();
      });

    });


  });

  

  function initMap() {

    var map_position;
    var map_styles

    var map;

    var circle;

    var no_results;

    var markers = [];
    var windows = [];
    var circles = [];

    var geocoder = new google.maps.Geocoder();



    if (navigator.geolocation && false) {

      //Get current location | ^^^ Disabled with the false above
      navigator.geolocation.getCurrentPosition(success);

    }
    else {

      //map_position = {lat: 37.09024, lng: -95.712891};
      map_position = {lat: 0, lng: 0};

      map_styles = {
        hide: [
          {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
        ] 
      };

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: map_position,
        minZoom: 2,
        maxZoom: 2,
        draggable: false,
        streetViewControl: false,
        styles: map_styles['hide'],
        mapTypeId: 'terrain'
      });

    }


    function success(pos) {

      console.log('Your current position is:');
      console.log('Latitude : ' + pos.coords.latitude);
      console.log('Longitude: ' + pos.coords.longitude);

      //map_position.lat = pos.coords.latitude;
      //map_position.lng = pos.coords.longitude;

      map_position = {lat: Number(pos.coords.latitude), lng: Number(pos.coords.longitude)};

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: map_position,
        mapTypeId: 'terrain'
      });

    };



    // When map is dragged, prevent it from being dragged into gray area
    google.maps.event.addListener(map, 'center_changed', function() {
      checkBounds(map);
    });

    function checkBounds(map) {

    var latNorth = map.getBounds().getNorthEast().lat();
    var latSouth = map.getBounds().getSouthWest().lat();
    var newLat;

    if(latNorth<85 && latSouth>-85)    
        return;
    else {
        if(latNorth>85 && latSouth<-85)   
            return;
        else {
            if(latNorth>85)   
                newLat =  map.getCenter().lat() - (latNorth-85);   // too north, centering
            if(latSouth<-85) 
                newLat =  map.getCenter().lat() - (latSouth+85);   // too south, centering
        }   
    }
    if(newLat) {
        var newCenter= new google.maps.LatLng( newLat ,map.getCenter().lng() );
        map.setCenter(newCenter);
        }   
    }

    


    var taxon, threatened, captive, native_taxon, endemic, date1, date2, radius, address, address_lat, address_lng, results_to_show;


    //Search
    $('#search-form').on('submit', function(e){

      e.preventDefault();


      //hide sidebar in mobile
      if( $(window).width() < 992){
        $('.button-collapse').sideNav('hide');
      }


      //Remove green overlay
      $('.map-overlay').fadeOut(300, function(){
        $('.map-overlay').remove();
      });


      //"Unlock" map
      map.setOptions( {maxZoom: 17, draggable: true, streetViewControl: true} );


      // Clear markers
      for(var i=0; i<markers.length; i++){
        markers[i].setMap(null);
      }
      markers = [];

      // Clear circles
      for(var i=0; i<circles.length; i++){
        circles[i].setMap(null);
      }
      circles = [];

      // Clear no results
      if(no_results){
        no_results.setMap(null);
      }


      // Animal searched for
      taxon = $('#taxon-name').val();


      // Threatened
      threatened = "";

      if( $('#threatened').prop("checked") ){
        threatened = "&threatened=true";
      }


      // Captive
      captive = "";
      
      if( $('#captive').prop("checked") ){
        captive = "&captive=true";
      }


      // Native
      native_taxon = "";
      
      if( $('#native').prop("checked") ){
        native_taxon = "&native=true";
      }


      // Endemic
      endemic = "";
      
      if( $('#endemic').prop("checked") ){
        endemic = "&endemic=true";
      }


      // Date
      date1, date2 = "";

      if( $('#date1').val() != undefined ){
        date1 = "&d1=" + $('#date1').val();
      }

      if( $('#date2').val() != undefined ){
        date2 = "&d2=" + $('#date2').val();
      }


      // Results to show
      results_to_show = "";

      if( $('#results option:selected').val() != "default" ){
        results_to_show = "&per_page=" + $('#results').val();
      }



      // Radius
      radius = $('#radius').val();
      radius *= 1.60934; //convert from miles to km


      // Location
      address = $('#location').val();

      address_lat, address_lng;


      geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == 'OK') {

          /*map.setCenter(results[0].geometry.location);
          map.setZoom(9);*/

          address_lat = results[0].geometry.location.lat();
          address_lng = results[0].geometry.location.lng();

          console.log("geo lat: " + address_lat);
          console.log("geo lng: " + address_lng);


          circle = new google.maps.Circle({
            center: {lat: address_lat, lng: address_lng},
            radius: radius*1000, //convert km to m
            strokeColor: "#1b5e20",
            strokeOpacity: 0.2,
            strokeWeight: 2,
            fillColor: "#4caf50",
            fillOpacity: 0.2,  
            clickable: false,
            map: map
          });
          circle.setMap(map);

          circles.push(circle);

          map.fitBounds(circle.getBounds());


          findAnimals();

        }
        else {
          alert('Geocode was not successful for the following reason: ' + status);
        }

      }); // END Geocoder


    }); // END on click submit



    function findAnimals(){

      $.getJSON("http://api.inaturalist.org/v1/observations?q=" + taxon + "&search_on=names&lat=" + address_lat + "&lng=" + address_lng + "&radius=" + radius + captive + threatened + endemic + native_taxon + date1 + date2 + results_to_show + "&order=desc&order_by=created_at", function(data) {

        var bounds = new google.maps.LatLngBounds();

        // If there were no results
        if( data.total_results == 0 ){

          var imageBounds = {
            north: circle.getBounds().f.b,
            south: circle.getBounds().f.f,
            east: circle.getBounds().b.f,
            west: circle.getBounds().b.b
          };

          no_results = new google.maps.GroundOverlay(
              'img/no-results.svg',
              imageBounds);
          no_results.setMap(map);

          var circleOptions = {
            fillColor: "#fff"
          };

          circle.setOptions(circleOptions);      

        } // END if no results



        $.each(data.results, function(i,result){              

          // Time
          var date_time;

          if( result.time_observed_at != null ){

            date_time = moment(result.time_observed_at).format("MMMM Do YYYY, h:mm a");

            console.log( date_time );
          }
          else if( result.observed_on_details ){
            date_time = moment(result.observed_on_details.date).format("MMMM Do YYYY");

            console.log( date_time );
          }
          else {
            date_time = "";
          }


          // Name
          var name = result.taxon.preferred_common_name;

          console.log(result.taxon.preferred_common_name);


          // Captive
          var captive = "";

          if( result.captive == true ){
            console.log("(Captive)");

            captive = "<div class='chip blue darken-4 white-text'>CAPTIVE</div>";
          }


          // Threatened
          var threatened = "";

          if( result.taxon.threatened == true ){
            console.log("(Threatened)");

            threatened = "<div class='chip red darken-4 white-text'>THREATENED</div>";
          }


          // Native
          var animal_native = "";

          if( result.taxon.native == true ){
            console.log("(Native)");

            animal_native = "<div class='chip green darken-4 white-text'>NATIVE</div>";
          }


          // Endemic
          var endemic = "";

          if( result.taxon.endemic == true ){
            console.log("(Endemic)");

            endemic = "<div class='chip deep-purple darken-4 white-text'>ENDEMIC</div>";
          }


          // Description
          var description = "";

          if( result.description ){
            console.log(result.description);

            description = "<hr> <p class='description'>" + result.description + "</p>";
          }
          else{
            console.log("(no description)");
          }


          // Photos
          var photo_array = result.observation_photos;

          var photo;

          if( photo_array.length > 0 ){

            for( var i=0; i<photo_array.length; i++ ){

              var small_photo = result.observation_photos[i].photo.url;

              var large_photo = small_photo.replace("square", "large");

              console.log( large_photo );

              photo = large_photo;
              
            }

          }
          else{
            console.log(result.taxon.default_photo.medium_url);

            photo = result.taxon.default_photo.medium_url;
          }


          // Coordinates
          console.log("lat:" + result.geojson.coordinates[1]);
          console.log("lng:" + result.geojson.coordinates[0]);

          var coordinates = {lat: Number(result.geojson.coordinates[1]), lng: Number(result.geojson.coordinates[0])};

          console.log("\n");


          //Shorten the lat and lng values
          var lat_short = coordinates.lat;
          lat_short = lat_short.toFixed(3);

          var lng_short = coordinates.lng;
          lng_short = lng_short.toFixed(3);

          console.log("Short lat: " + lat_short);


          // Contents of info window
          var contentString = '<img class="window-img" src="' + photo + '">' +
            '<div class="window-content">' +
              '<h4>' + name + '</h4>' +
              '<p class="date">' + date_time + '</p>' +
              '<div class="location-coordinates valign-wrapper">' +
                '<i class="fa fa-globe" aria-hidden="true"></i> ' +
                 '<p>' + lat_short + ', ' + lng_short + '</p>' +
              '</div>' +
              '<div style="clear:both;">' +
              captive + threatened + animal_native + endemic +
              description +
          '</div>';


            
          var infowindow = new google.maps.InfoWindow({
            content: contentString,
            width: 650
          });
          windows.push(infowindow);


          var marker = new google.maps.Marker({
            position: coordinates,
            animation: google.maps.Animation.DROP,
            icon: "img/map-marker-small.png",
            map: map
          });
          markers.push(marker);


          //Open info window when marker is clicked
          marker.addListener('click', function() {

            for(var i=0; i<windows.length; i++){

              windows[i].close();
            }

            infowindow.open(map, marker);

          });


          //map.setZoom(9);

          //bounds.extend(marker.position);

          //map.fitBounds(bounds);

          

        }); // END .each


      }); // END json


    }; // END find animals function



  } // END init map