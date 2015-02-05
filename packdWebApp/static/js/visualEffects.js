$(document).ready(function(){

	$("#time").text(new Date());
	$("#disagree").hide();
	$("#disagree_button").click(function() {
		$("#disagree").show();
		$("#data").hide();
        $("#percentage").hide();
	});
	$("#current_button").click(function() {
		$("#disagree").hide();
		$("#data").show();
        $("#percentage").show();
	});
	// $("#graph_button").click(generateGraph());
})