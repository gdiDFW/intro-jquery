$(function() {

  function initialize() {

    // create a new google `map`
    var map = new google.maps.Map( document.getElementById( 'map' ), {
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // get instagram JSON data
    $.getJSON( 'recent.json', function( data ) {

      // create `items` array to populate with instagram data
      var items = [];

      // loop over json data
      $.each( data.data, function( index, value ) {

        // we only care about instagram data that has locations
        if( value.location ) {
          
          // create an `item` object to store instagram data
          var item = {};
          
          // store `location`, `img_url` and `user` data on `item` object
          item.location = value.location;
          item.img_url = value.images.standard_resolution.url;
          item.user = value.user.full_name;

          // push item object into `items` array
          items.push( item );
        }
      });

      $.each( items, function( index, value ) {

        // create a new `marker` using latitude and longitude from instagram
        var marker = new google.maps.Marker({
          position : new google.maps.LatLng( value.location.latitude, value.location.longitude ),
          title : value.user
        });

        // create `infoWindow` overlay
        var infoWindow = new google.maps.InfoWindow();

        // create `html` data
        var html = '<h2 class="heading">' + value.user + '</h2>';
          html += '<img class="instagram" src="' + value.img_url + '" />';

        // add event listener to `marker`
        google.maps.event.addListener( marker, 'click', function () {
          // on click open infoWindow
          infoWindow.open( map, marker );
        });

        // set `infoWindow` content with `html` data
        infoWindow.setContent( html );
        infoWindow.open( map, marker );

        // set the `marker` on the `map`
        marker.setMap( map );

        // when we've come to the last `item`, center the `map` on the last `marker`
        if( index === items.length - 1 ) {
          map.setCenter( marker.getPosition() );
        }
      });
    });
  }

  // call `initialize` method
  initialize();
});