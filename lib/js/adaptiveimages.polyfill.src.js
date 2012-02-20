// Update images when page loaded and resizing
/*$(document).ready(function(){ adaptiveimages(); });
$(window).resize(function(){ adaptiveimages(); });*/

function adaptiveimages() {
	
	// Current widt of ducument
	var width = $(window).width();
	
	// Loop through all picture tags
	$('picture').each(function(){
		var src = undefined;
		
		// Loop through all source tags inside picture tag
		$(this).find('source').each(function() {
			
			// Has src attribute been set
			var mediasrc = $(this).attr('src');
			if (mediasrc != undefined) {
				var media = $(this).attr('media');
				
				// Source without any media-quereis
				// If source has been set this is skipped
				if (src == undefined && media == undefined) {
					src = mediasrc;
				
				// Handle media-queries	
				} else if (media != undefined) {
					var mediatype = media.split(':')[0].trim();
					var mediawidth = media.split(':')[1].replace('px','').trim();
					
					// Only select this source if:
					// - min-width is less than document width
					if (mediatype=='min-width' && width>=mediawidth) {
						minwidth = mediawidth;
						src = mediasrc;
					}
					// TO-DO: max-width, and
				}
			}
		});
		
		// If some source has been set, then change src of img tag inside picture tag
		if (src != undefined) {
			$(this).find('img').attr('src',src);
		}
	})
}