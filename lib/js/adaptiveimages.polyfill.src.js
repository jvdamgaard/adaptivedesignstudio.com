/*	Adaptive Images Polyfill v0.3
	- created by Adaptive Design Studio adaptivedesignstudio.com
	- follow project on adaptivedesignstudio.com/adaptiveimages
	- based on syntax from w3.org/community/respimg */	
	
/*jslint	browser: true */
/*global	jQuery, 
			Modernizr */

// debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/			
(function($,sr){
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap) {
					func.apply(obj, args);
				}
				timeout = null; 
			}
			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(obj, args);
			}
			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

// Handle responsive images
function RespImg($) {
	
	// Loop through all picture tags
	$('picture').each(function() {
		var	src = null,
			image = $(this).find('img');
					
		// Loop through all source tags inside picture tag 
		$(this).find('source').each(function() {
			
			// Has src attribute been set
			var mediasrc = $(this).attr('src');
			if (mediasrc) {
				var media = $(this).attr('media');
				
				// Source without any media-quereis
				if (!media || Modernizr.mq(media)) {
					src = mediasrc;
				}  
			}
		});
		
		// create image tag if it doesn't exist
		if (!image) {
			// TO-DO: create image
		}
		
		// Set new source of fallback image
		if (src) {
			image.attr('src',src);
			image.removeAttr('style');
			$(this).removeAttr('style');
		} else {
			image.attr('style', 'width:100%');
			$(this).attr('style', 'width:100%');
		}
	});
}
	
// start adaptive images polyfill when script has loaded
jQuery(document).ready(function($) {
	RespImg($);
	// activate adaptive images polyfill on resize and orientation change
	$(window).smartresize(function() {
		RespImg($);
	});
});

