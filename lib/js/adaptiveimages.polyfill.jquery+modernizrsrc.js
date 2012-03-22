/*	Adaptive Images Polyfill v0.3
	- created by Adaptive Design Studio adaptivedesignstudio.com
	- follow project on adaptivedesignstudio.com/adaptiveimages
	- based on syntax from w3.org/community/respimg
	- using MatchMedia by Paul Irish on github.com/paulirish/matchMedia.js */	
	
(function (win, docEl) {
	
	"use strict";
	
	var bool, refNode, fakeBody, div, width, pictures, i, src, sources, j, mediasrc, media, images;
	
	function matchMedia(media) {
		refNode  = docEl.firstElementChild || docEl.firstChild;
		// fakeBody required for <FF4 when executed in <head>
		fakeBody = document.createElement('body');
		div      = document.createElement('div');

		div.id = 'mq-test-1';
		div.style.cssText = "position:absolute;top:-100em";
		fakeBody.appendChild(div);

		return function(media) {

			div.innerHTML = '&shy;<style media="'+media+'"> #mq-test-1 { width: 42px; }</style>';

			docEl.insertBefore(fakeBody, refNode);

			bool = div.offsetWidth === 42;

			docEl.removeChild(fakeBody);

			return bool;
		};	
	}
	
	// cross browser eventhandler
	function addWinEvent(type, fn) {
		if (win.addEventListener) {
			win.addEventListener(type, fn, false); 
		} else if (win.attachEvent) {
			win.attachEvent("on" + type, fn);
		} else {
			win["on" + type] = fn;
		}
	}
	
	// resizer
	function onResize() {
		width = docEl.clientWidth;
		
		// Loop through all picture tags
		pictures = document.getElementsByTagName('picture');
		for (i=0; i < pictures.length; i++) {
			src = undefined;
						
			// Loop through all source tags inside picture tag
			sources = pictures[i].getElementsByTagName('source'); 
			for (j=0; j < sources.length; j++) {
				
				// Has src attribute been set
				mediasrc = sources[j].src;
				if (mediasrc !== undefined) {
					media = sources[j].getAttribute('media');
					
					// Source without any media-quereis
					if (media === undefined || matchMedia(media)) {
						src = mediasrc;
					}
				}
			}
			
			// If some source has been set, then change src of img
			if (src !== undefined) {
				images = pictures[i].getElementsByTagName('img');
				if (images[0]) {
					images[0].src = src;
				} /*else {
					// TO-DO: make new img tag inside picture tag with new src
				}*/
			}
		}
	}
	
	// activate adaptive images polyfill on resize and orientation change
	addWinEvent('resize', onResize);
	addWinEvent('orientationchange', onResize);
	
	// start adaptive images polyfill when script has loaded
	onResize();
	
}(this, document.documentElement));