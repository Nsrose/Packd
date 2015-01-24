var days = {
    "0":"Sunday",
    "1":"Monday",
    "2":"Tuesday",
    "3":"Wednesday",
    "4":"Thursday",
    "5":"Friday",
    "6":"Saturday",
}

var ints_to_strings = {
    "1":"Not Crowded",
    "2":"Mildly Crowded",
    "3":"Very Crowded",
    "4":"Extreme",
}

var strings_to_ints = {
    "Not Crowded":1,
    "Mildly Crowded":2,
    "Very Crowded":3,
    "Extreme":4,
}

// Firebase url
var fireRef = new Firebase("https://packd.firebaseio.com/");


//RSF coordinates
var RSF_LAT = 37.868578;
var RSF_LONG = -122.262812

// How many feedback responses to store before refactoring
var LOAD_FACTOR = 0;

// Allowable distance from the RSF to vote.
// var ALLOWED_RADIUS = 0.090;
var ALLOWED_RADIUS = 10000.00;

// Converts numeric degrees to radians, from stackoverflow
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}


// Distance between two coords, from stackoverflow, in km
function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Determines if a rehashing of data is necessary
function checkLoadFactor(snapshot) {
    var size = snapshot.child("Size").val();
    if (size > LOAD_FACTOR) {
        refactor(snapshot);
    }
}

// Refactors the tables for data to restructure json.
function refactor(snapshot) {
    var feedback = snapshot.child("feedback").val();
    for (var day in feedback) {
        for (var hour in feedback[day]) {
            var dataPoints = feedback[day][hour];
            console.log(dataPoints);
            var denom = 0;
            var num = 0;
            if (dataPoints != "none") {
                for (var dataPoint in dataPoints) {
                    denom += 1;
                    num += weight(dataPoints[dataPoint]["measure"]);
                }
                var average = num / denom;
                console.log(average);
            }
        }
    }
}

// Given a heuristic string, returns an integer value representing
// that string.
function weight(string) {
    return strings_to_ints[string];
}

$(document).ready(function(){
    // True iff feedback has not already been sent
    var feedbackSent = false;

    var d = new Date();
    var dayNumber = d.getDay();
    var hour = d.getHours() * 100;
    var day = days[dayNumber];
    
    // This function will be called when the data is changed in the server
    fireRef.on('value', function (snapshot) {
        var dataText = snapshot.child(day).child(hour).val();
        checkLoadFactor(snapshot);
        if (dataText == null) {
            $("#data").text("Either the RSF is closed, or something went wrong.");
        } else {
            $("#data").text(dataText);    
        }
    }, function (errorObject) {
        var dataText = "Either the RSF is closed, or something went wrong.";
        $("#data").text(dataText);
    });

    // Feedback data form
    $("#send_data_submit").click(function() {
        if (!feedbackSent) {
            navigator.geolocation.getCurrentPosition(checkLocation);
        } else {
            alert("Thanks, we got it!");
        }
    })

    // Checks the location of the user and sends data, if okay.
    function checkLocation(location) {
        if (navigator.geolocation) {
            var latitude = location.coords.latitude;
            var longitude = location.coords.longitude;
            var dist = distance(longitude, latitude, RSF_LONG, RSF_LAT);
            if (dist > ALLOWED_RADIUS) {
                alert("You aren't actually at the RSF.");
            } else {
                var data = null;
                for (var i = 1; i < 5; i++) {
                    var radioNum = "radio" + i;
                    if (document.getElementById(radioNum).checked) {
                        data = $("#" + radioNum).val();
                    }
                }
                fireRef.once('value', function(snapshot) {
                    var size = snapshot.child("Size").val();
                    size += 1;
                    fireRef.update({Size : size});
                });
                var feedbackRef = fireRef.child("feedback");
                var node = {
                    "measure":data
                }
                feedbackRef.child(day).child(hour).push(node);
                feedbackSent = true;
            }
        } else {
            alert("Location services not working");
        }
    }
});