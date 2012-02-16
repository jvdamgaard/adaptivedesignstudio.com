	<!-- Async load:
    	jQuery
        Response
        JVDamgaard
        Custom functions -->
    <script>
        Modernizr.load({ load: [ 
			"http://adaptivedesignstudio.com/lib/js/jquery.min.js",
			"http://adaptivedesignstudio.com/lib/js/response.min.js", 
			"http://adaptivedesignstudio.com/lib/js/jvdamgaard.min.js", 
			"js/functions.js",
			('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
		] });
	</script>
    
    <!-- Responsive design powered by javascript
    	 rezitech.github.com/syze -->
	<script src="http://adaptivedesignstudio.com/lib/js/syze.min.js"></script>
    <script>
		// Set sizes and size names for use i CSS
		syze.sizes(1, 320, 480, 720, 960, 1120, 1840).names({ 1:'-oldie', 320:'-mobile-tall', 480:'-mobile-wide', 720:'-tablet-tall', 960:'-tablet-wide', 1120:'-screen', 1840:'-screen-wide' });
	</script>   