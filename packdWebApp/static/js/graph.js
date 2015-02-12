var fireRef = new Firebase("https://packd.firebaseio.com/");

var days = {
    "0":"Sunday",
    "1":"Monday",
    "2":"Tuesday",
    "3":"Wednesday",
    "4":"Thursday",
    "5":"Friday",
    "6":"Saturday",
};

// Generates graph for next 6 hours. X is hours of day. Y is 
// values from Dynamic data. 
function generateGraph() {
	var d = new Date();
    var dayNumber = d.getDay();
    var hour = d.getHours() * 100;
    var day = days[dayNumber];

	fireRef.once('value', function (snapshot) {
		var theDynamicData = snapshot.child("-JgOwwFlFThZOqBMUnP0").val();
		var dayData = theDynamicData[day];
        var y_axis_values = [];
        var x_axis_values = [];
        var cur_int_val = 0;
        var prev_int_val;
        for (var key in dayData) {
            cur_int_val = strings_to_ints[dayData[key]["current_average"]["measure"]];
            if (key >= hour) {
                x_axis_values.push(key);
                y_axis_values.push(cur_int_val);
            }
        }
        var myChartData = {
        labels: x_axis_values,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(41, 128, 185,0.5)",
                data: y_axis_values,
            },
        ]};
        var ctx = $("#myChart").get(0).getContext("2d");
        var myNewChart = new Chart(ctx).Line(myChartData);
        $("#future_graph").hide();
	}, function (errorObject) {
        console.log("error in graph generation");
            myChartData = {
                labels: ["January", "February", "March"],
                datasets: [{
                    data: [1,55,10],
                    fillColor: "rgba(50, 120, 222, 0.5)",
                }]
            };
        var ctx = $("#myChart").get(0).getContext("2d");
        var myNewChart = new Chart(ctx).Line(myChartData);
        $("#future_graph").hide();
    });
}