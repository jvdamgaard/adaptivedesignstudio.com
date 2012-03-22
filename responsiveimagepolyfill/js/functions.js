/*jslint	browser: true */
/*global	jQuery, 
			Modernizr */

// Handle responsive images
function RespImg($) {
	var	testText = "",
		width = $(window).width();
	
	testText += "Document width: " + width + "<br /><br />";
	
	// Loop through all picture tags
	$('picture').each(function() {
		var	src = null,
			image = $(this).find('img');
		
		testText += '&lt;picture&gt;<br />';
					
		// Loop through all source tags inside picture tag 
		$(this).find('source').each(function() {
			
			// Has src attribute been set
			var mediasrc = $(this).attr('src');
			if (mediasrc) {
				var media = $(this).attr('media');
				
				// Source without any media-quereis
				if (!media || Modernizr.mq(media)) {
					src = mediasrc;
					testText += '<span style="color:green" class="passed">';
				} else {
					testText += '<span style="color:red" class="failed">';
				}
				testText += "&lt;source src=&quot;"+mediasrc+"&quot;";
				if (media) {
					testText += " media=&quot;"+media+"&quot;";
				} 
				testText += " /&gt;</span><br />";
			}
		});
		testText += "<span>&lt;!-- Fallback --&gt;</span><br />";
		
		// create image tag if it doesn't exist
		if (!image) {
			// TO-DO: create image
		}
		
		// Set new source of fallback image
		if (src) {
			image.attr('src',src);
			image.removeAttr('style');
			testText += '<span style="color:green">&lt;img src=&quot;'+src+'&quot; /&gt;</span><br />';	
		} else {
			testText += '<span style="color:red">&lt;img src=&quot;http://placehold.it/320x100&quot; /&gt;</span><br />';
			image.attr('style', 'width:100%');
		}
		
		testText += '&lt;/picture&gt;<br /><br />';
	});
	document.getElementById("test").innerHTML = testText;
}
	
// start adaptive images polyfill when script has loaded
jQuery(document).ready(function($) {
	RespImg($);
	// activate adaptive images polyfill on resize and orientation change
	$(window).resize(function() {
		RespImg($);
	});
});

