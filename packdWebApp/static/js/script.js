var days = {
    "0":"Sunday",
    "1":"Monday",
    "2":"Tuesday",
    "3":"Wednesday",
    "4":"Thursday",
    "5":"Friday",
    "6":"Saturday",
}

var RSF_LAT = 37.868578;
var RSF_LONG = -122.262812

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}


// Distance between two coords, from stackoverflow
function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

// Checks the location of the user
function checkLocation(location) {
    if (navigator.geolocation) {
        var latitude = location.coords.latitude;
        var longitude = location.coords.longitude;
        var dist = distance(longitude, latitude, RSF_LONG, RSF_LAT);
        if (dist > 0.090) {
            alert("You aren't actually at the RSF.");
        } else {
            alert("Hey, it worked");
        }
    } else {
        alert("Location services not working");
    }
}

$(document).ready(function(){
    // True iff feedback has not already been sent
    var feedbackSent = false;

    // Here's our firebase url:
    var fireRef = new Firebase("https://packd.firebaseio.com/");

    var d = new Date();
    var dayNumber = d.getDay();
    var hour = d.getHours() * 100;
    var day = days[dayNumber];
    
    // This function will be called when the data is changed in the server
    fireRef.on('value', function (snapshot) {
        var dataText = snapshot.child(day).child(hour).val();
        if (dataText == null) {
            $("#data").text("Either the RSF is closed, or something went wrong.");
        } else {
            $("#data").text(dataText);    
        }
    }, function (errorObject) {
        var dataText = "Either the RSF is closed, or something went wrong.";
        $("#data").text(dataText);
    });

    // Feedback form
    $("#feedback_submit").click(function() {
        if (!feedbackSent) {
            var text = $("#feedback_form").val();
            var feedbackRef = fireRef.child("feedback");
            feedbackRef.push({
                message: text,
            })
            feedbackSent = true;
            alert("Thanks for helping us make our data better!");
        } else {
            alert("Thanks, we got it!");    
        }
    })

    // Feedback data form
    $("#send_data_submit").click(function() {
        if (!feedbackSent) {
            navigator.geolocation.getCurrentPosition(checkLocation);
        } else {
            alert("Thanks, we got it!");
        }
    })
});