function generateGraph(){var e=new Date;var t=e.getDay();var n=e.getHours()*100;var r=days[t];fireRef.once("value",function(e){var t=e.child("-JgOwwFlFThZOqBMUnP0").val();var i=t[r];var s=[];var o=[];var u=0;var a;for(var f in i){u=strings_to_ints[i[f]["current_average"]["measure"]];if(f>=n&&u!=s[s.length-1]){o.push(f);s.push(u)}}var l={labels:o,datasets:[{label:"My First dataset",fillColor:"rgba(41, 128, 185,0.5)",data:s}]};var c=$("#myChart").get(0).getContext("2d");var h=(new Chart(c)).Line(l);$("#future_graph").hide()},function(e){console.log("error in graph generation");myChartData={labels:["January","February","March"],datasets:[{data:[1,55,10],fillColor:"rgba(50, 120, 222, 0.5)"}]};var t=$("#myChart").get(0).getContext("2d");var n=(new Chart(t)).Line(myChartData);$("#future_graph").hide()})}var fireRef=new Firebase("https://packd.firebaseio.com/");var days={0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"}