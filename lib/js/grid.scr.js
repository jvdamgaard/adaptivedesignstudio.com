jQuery(document).ready(function ($){
	$('body').prepend('<div id="toggle"><div></div><div></div><div></div></div>');
	var grid = '<div id="showgrid">';
		grid += '<div class="allGrids">';
		for (i=0;i<40;i++) {
			grid += '<div class="col"></div>';	
		}
		grid += '</div>';
		grid += '<div class="gutters"></div>';
		grid += '<div id="grid_description">';
			grid += '<div class="mobile">Mobile Tall</div>';
			grid += '<div class="mobile-wide">Mobile Wide</div>';
			grid += '<div class="tablet">Tablet Tall</div>';
			grid += '<div class="tablet-wide">Tablet Wide</div>';
			grid += '<div class="screen">Screen Laptop</div>';
			grid += '<div class="screen-wide">Screen Desktop</div>';
		grid += '</div>';
		grid += '<div class="fold"><p>Fold</p></div>';
	grid += '</div>';
	
	$('body').prepend(grid);
	$('#toggle').show().click(function() {
		setHeightOfGrid();
		$('html').toggleClass('show-grid-active');
	});
	
});

var resizeTimer;
jQuery(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setHeightOfGrid, 50);
});

function setHeightOfGrid() {
	var $ = jQuery;
	var height = $(document).height();
	$('#showgrid').height(height);
	var gutters = parseInt(height/24);
	var grid = '';
	for (i=0;i<gutters;i++) {
		grid += '<div class="gutter"></div>';	
	}
	$('#showgrid .gutters').html(grid);
}