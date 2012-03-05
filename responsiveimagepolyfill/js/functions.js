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
		var testText = "";
		var width = docEl.clientWidth;
		testText += "Width: " + width + "<br />";
		
		// Loop through all picture tags
		var pictures = document.getElementsByTagName('picture');
		testText += pictures.length + " pictures found<br />"; 
		for (var i=0; i < pictures.length; i++) {
			var src = undefined;
						
			// Loop through all source tags inside picture tag
			var sources = pictures[i].getElementsByTagName('source');
			testText += sources.length + " sources found<br />"; 
			for (var j=0; j < sources.length; j++) {
				
				 // Has src attribute been set
				var mediasrc = sources[j].src;
				if (mediasrc != undefined) {
					var media = sources[j].getAttribute('media');
					testText += media + ": " + mediasrc;
					
					// Source without any media-quereis
					if (media == undefined || Modernizr.mq(media)) {
						src = mediasrc;
						testText += " - Passed";
					} else {
						testText += " - Failed";
					}
					testText += "<br />";
				}
			}
			
			// If some source has been set, then change src of img
			if (src != undefined) {
				testText += "Final src: " + src + "<br />";
				var images = pictures[i].getElementsByTagName('img');
				if (images[0]) {
					testText += "Img tags src set<br />";
					// images[0].src = src;
				} else {
					// TO-DO: make new img tag inside picture tag with new src
				}
			}
		}
		$("#test").html(testText);
	}
	
	// activate adaptive images polyfill on resize and orientation change
	addWinEvent('resize', onResize);
	addWinEvent('orientationchange', onResize);
	
	// start adaptive images polyfill when script has loaded
	onResize();
	
}(this, document.documentElement));