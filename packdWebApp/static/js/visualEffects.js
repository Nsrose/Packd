$(document).ready(function(){

	$("#time").text(new Date());
	$("#disagree").toggle();
	$("#disagree_button").click(function() {
		$("#disagree").toggle();
		$("#data").toggle();
        $("#percentage").toggle();
	});
	// $("#data_container").click(generateGraph());
})