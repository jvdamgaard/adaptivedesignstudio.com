jQuery(document).ready(function ($){
	$('body').prepend('<div id="toggle"><div></div><div></div><div></div></div>');
	var grid = '<div id="grid" class="showgrid">';
		grid += '<div class="allGrids">';
		for (i=0;i<41;i++) {
			grid += '<div class="col"></div>';	
		}
		grid += '</div>';
		grid += '<div class="wrapper">';
		for (i=0;i<23;i++) {
			grid += '<div class="col"></div>';	
		}
		grid += '</div>';
	grid += '</div>';
	grid += '<div id="grid_description">';
	grid += '<div class="grid_4cols">Mobile (320px)</div>';
	grid += '<div class="grid_6cols">Wide mobile (480px)</div>';
	grid += '<div class="grid_9cols">Tablet (720px)</div>';
	grid += '<div class="grid_12cols">Wide tablet or small screen (960px)</div>';
	grid += '<div class="grid_14cols">Normal screen (1120px)</div>';
	grid += '<div class="grid_23cols">Large screen (1840px)</div>';
	grid += '</div>';
	grid += '<div class="fold portrait"><p>Fold portrait</p></div>';
	grid += '<div class="fold landscape"><p>Fold landscape</p></div>';
	
	$('body').prepend(grid);
	$('#toggle').show().click(function() {
		$('#grid').toggle();
		$('.fold').toggle();
		$('#grid_description').toggle();
	});
	
});