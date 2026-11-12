window.grid_show=function(){$("#grid").show();};
window.grid_hide=function(){$("#grid").hide();};
$(function(){
	var grid=$("<div id=grid>").hide().appendTo($("#UI_div"));
	var grid_quarter=$("<div>");
	grid_quarter.addClass("grid_quarter");
	var screen_width=parseFloat(window.parent.screen.width);
	var screen_width_herf=screen_width/2;
	var width=Math.ceil(screen_width_herf/50)*50;
	var screen_height=parseFloat(window.parent.screen.height);
	var screen_height_herf=screen_height/2;
	var height=Math.ceil(screen_height_herf/50)*50;
	grid_quarter.width(width);
	grid_quarter.height(height);
	var grids=[[[-1,-1],[0,-1]],[[-1,0],[0,0]]];
	grids=grids.map(function(row){
		return row.map(function(quarter){
			var x=100*quarter[0];
			var y=100*quarter[1];
			var translate="translate("+x+"%,"+y+"%)";
			quarter=grid_quarter.clone();
			quarter.appendTo($("#grid"));
			quarter.css("transform",translate);
			return quarter;
		});
	});
	$(window).resize(function(){
		var screen_width=parseFloat(window.parent.screen.width);
		var screen_width_herf=screen_width/2;
		var width=Math.ceil(screen_width_herf/50)*50;
		var screen_height=parseFloat(window.parent.screen.height);
		var screen_height_herf=screen_height/2;
		var height=Math.ceil(screen_height_herf/50)*50;
		grids.map(function(row){
			row.map(function(quarter){
				quarter.width(width).height(height);
			});
		});
	});
});
