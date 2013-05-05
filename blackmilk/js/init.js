// DOM Ready
$(function() {
  
  // assign `.full` div as `targ` var for later reference
  var targ = $( '.gallery .full' );

  // bind all `.previews` anchor tags with a click event handler
  $( '.gallery .previews a' ).on( 'click', function( e ) {

    // cache `$( this )` as a reference to the item being clicked
    var $this = $( this );

    // create an image element in the DOM
    var $img = $( '<img>' ).attr( 'src', $this.data( 'full' ) );

    // remove all classes from all anchors using `$this` and traversing upwards
    $this.parent().find( 'a' ).removeClass();

    // add class `selected` to the item being clicked
    $this.addClass( 'selected' );

    // empty the `.full` div and `append` our newly created `$img`
    targ.empty().append( $img.hide().fadeIn( 'slow' ) );
  });

  // add delegated-event `click` to `.full` div using `on`
  targ.on( 'click', 'img', function( e ) {
    // open a `fancybox` using the contained image
    $.fancybox.open( $( this ).attr( 'src' ) );
  });

  // getJSON on recent.json
  $.getJSON( 'recent.json', function( data ) {
    // each over data
    $.each( data.data, function( index, value ) {
      // create img
      var $instaImg = $( '<img>' ).attr( 'src', value.images.standard_resolution.url );
      // append img
      $( '.instagram' ).append( $instaImg );
    });
  });

  // bind submit event to form
  $( 'form' ).submit( function( e ) {

    var $form = $( this );
    var checked = $form.find( 'input:radio:checked' );

    if( checked.length ) {
      $( '.msg' ).hide();

      var option = checked.val();

      if( option === 'S' ) {

        $( '.status' ).show( 'slow' );

      } else {
        
        console.log( 'process form' );

        $( '.status' ).hide();

        $.ajax({
          type : 'post',
          url : 'post.php',
          data : $form.serialize(),
          success : function( data ) {
            console.log( data );
          }
        });
      }

    } else {
      $( '.msg' ).show( 'slow' );
    }

    return false;
  });
});