( function( $ ) {
	
  $('body').imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
      var s = skrollr.init({
        forceHeight: false,
        render: function(data) {
        }
      });

      s.refresh($('.section'));

      $('body').removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
} )( jQuery );