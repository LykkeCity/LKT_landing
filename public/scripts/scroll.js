( function( $ ) {
	
  $('body').imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
      var s = skrollr.init({
        forceHeight: false,
        render: function(data) {
        }
      });

      // disable skrollr if using handheld device
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('body').removeClass('loading').addClass('loaded');
        skrollr.init().destroy();
      }

      s.refresh($('.section'));

      $('body').removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
} )( jQuery );