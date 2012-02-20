// Set sizes and size names for use i CSS
var adaptSize = null;
syze
	.sizes(0, 320, 480, 720, 960, 1120, 1840)
	.names({ 0:'-oldie', 320:'-mobile-tall', 480:'-mobile-wide', 720:'-tablet-tall', 960:'-tablet-wide', 1120:'-screen', 1840:'-screen-wide' })
	
	// Adaptive images
	.callback(function(currentSize) {
		
		// Only run code, if breakpoint has changed
		if (currentSize != adaptSize) {
			adaptSize = currentSize;
			
			// Set source variable based on current breakpoint
			var sources=["data-src-oldie","data-src-mobile-tall","data-src-mobile-wide","data-src-tablet-tall","data-src-tablet-wide","data-src-screen","data-src-screen-wide"];
			var srcNum;
			switch(currentSize) {
				case 320:
				  	srcNum = 1;
					break;
				case 480:
				  	srcNum = 2;
					break;
				case 720:
				  	srcNum = 3;
					break;
				case 960:
				  	srcNum = 4;
					break;
				case 1120:
				  	srcNum = 5;
					break;
				case 1840:
				  	srcNum = 6;
					break;
				default:
				  	srcNum = 0;
					break;
			}
			
			// Change all images accordingly to breakpoint
			var imgs = document.getElementsByTagName("img");
		    for (var i = 0; i < imgs.length; i++) {
		    	
		    	// Sets default value of images from src attr
		    	if (!imgs[i].getAttribute(sources[0])) {
		    		imgs[i].setAttribute(sources[0],imgs[i].src)
		    	}
		    	
		    	// Downgrading img src, if current breakpoints images hasn't been set
		    	var src = null;
		    	var j = 0;
		    	do {
	  				src = imgs[i].getAttribute(sources[srcNum-j]);
	  				j++;
	  			} while (src == null);
	  			
		        imgs[i].src = src;
		    }
		}
	});