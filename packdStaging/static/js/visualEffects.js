generateGraph();

$(document).ready(function(){

	$("#time").text(new Date());
	$("#disagree").hide();
	$("#disagree_button").click(function() {
		$("#data_container").show();
		$("#future_graph").hide();
		$("#disagree").show();
		$("#data").hide();
        $("#percentage").hide();
	});
	$("#current_button").click(function() {
		$("#data_container").show();
		$("#future_graph").hide();
		$("#disagree").hide();
		$("#data").show();
        $("#percentage").show();
	});
	$("#predict_button").click(function() {
		$("#future_graph").show();		
		$("#data_container").hide();
	});
})