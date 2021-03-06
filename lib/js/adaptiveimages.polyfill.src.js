/*	Adaptive Images Polyfill v0.2.1
	- created by Adaptive Design Studio adaptivedesignstudio.com
	- follow project on adaptivedesignstudio.com/adaptiveimages
	- based on syntax from w3.org/community/respimg */
	
(function (win, docEl) {
	
	// add window event
	function addWinEvent(type, fn) {
		if (win.addEventListener) addEventListener(type, fn, false); else attachEvent('on' + type, fn);
	}
	
	// resizer
	function onResize() {
		var width = docEl.clientWidth;
		
		// Loop through all picture tags
		var pictures = document.getElementsByTagName('picture');
		for (var i=0; i < pictures.length; i++) {
			var src = undefined;
						
			// Loop through all source tags inside picture tag
			var sources = pictures[i].getElementsByTagName('source'); 
			for (var j=0; j < sources.length; j++) {
				
				 // Has src attribute been set
				var mediasrc = sources[j].src;
				if (mediasrc != undefined) {
					var media = sources[j].getAttribute('media');
					
					// Source without any media-quereis
					if (media == undefined || Modernizr.mq(media)) {
						src = mediasrc;
					}
				}
			}
			
			// If some source has been set, then change src of img
			if (src != undefined) {
				var images = pictures[i].getElementsByTagName('img');
				if (images[0]) {
					images[0].src = src;
				} else {
					// TO-DO: make new img tag inside picture tag with new src
				}
			}
		}
	}
	
	// activate adaptive images polyfill on resize and orientation change
	addWinEvent('resize', onResize);
	addWinEvent('orientationchange', onResize);
	
	// start adaptive images polyfill when script has loaded
	onResize();
	
}(this, document.documentElement));