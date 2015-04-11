var days = {
    "0":"Sunday",
    "1":"Monday",
    "2":"Tuesday",
    "3":"Wednesday",
    "4":"Thursday",
    "5":"Friday",
    "6":"Saturday",
};

var ints_to_strings = {
    "1":"Not Crowded",
    "2":"Mildly Crowded",
    "3":"Very Crowded",
    "4":"Extreme",
};

var strings_to_ints = {
    "Not Crowded":1,
    "Mildly Crowded":2,
    "Very Crowded":3,
    "Extreme":4,
};

var strings_to_percents = {
    "Not Crowded":"0% - 25%",
    "Mildly Crowded":"26% - 65%",
    "Very Crowded": "66% - 89%",
    "Extreme": "89% - 100%",
}

var allowed_measures = new Set();
for (var measure in strings_to_ints) {
    allowed_measures.add(measure);
}

// Firebase url string
// var fireString = "https://packd.firebaseio.com/";
// Uncomment next line for stage testing:
var fireString = "https://packdstaging.firebaseio.com/";

// Firebase url
var fireRef = new Firebase(fireString);

// Message on Closed or Error
var closedMessage = "RSF is Closed";

// If true, message will display relative percentage of crowdedness.
var USE_PERCENTS = true;

//RSF coordinates
var RSF_LAT = 37.868501;
var RSF_LONG = -122.262702;

// How many feedback responses to store before refactoring
// var LOAD_FACTOR = 200;
// Uncomment next line for debugging:
var LOAD_FACTOR = 5;

// Allowable distance from the RSF to vote.
// var ALLOWED_RADIUS = 0.050;
// Uncomment next line for debugging:
var ALLOWED_RADIUS = 10000.00;

// If true, cookies will be checked before voting:
var checkCookies = false;

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

// Changes the color of certain divs based on
// The business message in data (value).
function applyColors(value) {
    var colorString = "rgba(50, 120, 222,";
    if (value == "Not Crowded") {
        colorString = "rgba(52, 152, 219,";
    } else if (value == "Mildly Crowded") {
        colorString = "rgba(41, 128, 185,";
    } else if (value == "Very Crowded") {
        colorString = "rgba(155, 89, 182,";    
    } else if (value == "Extreme") {
        colorString = "rgba(44, 62, 80,";
    }
    $("#title_container").css("background-color", colorString + " 0.7)");
    $("#data_container").css("background-color", colorString + "1)");
    $("body").css("background-color", colorString + "1)");
}

// Determines if a rehashing of data is necessary
function checkLoadFactor(snapshot, day, hour) {
    var size = snapshot.child("Size").val();
    if (size > LOAD_FACTOR) {
        fireRef.update({Locked : true });
        refactor(snapshot);
    } else {
        var dataText = snapshot.child("-JgOwwFlFThZOqBMUnP0").child(day).child(hour).child("current_average").child("measure").val();
        applyColors(dataText);
        if (dataText == null) {
            $("#data").text(closedMessage);
            return;
        } else if (USE_PERCENTS) {
            $("#percentage").text(strings_to_percents[dataText]);
        }
        if (dataText == "Mildly Crowded") {
            $("#data").text("Fairly Empty"); 
        } else if (dataText == "Not Crowded") {
            $("#data").text("Almost Empty");
        }
            else {
            $("#data").text(dataText);  
        }       
    }
}

// Refactors the tables for data to restructure json.
function refactor(snapshot) {
    var feedback = snapshot.child("-JgOwwFlFThZOqBMUnP0").val();
    for (var day in feedback) {
        for (var hour in feedback[day]) {
            var saved = {};
            var slots = feedback[day][hour];
            var average = 0;
            var denom = getDenom(slots);
            for (var slot in slots) {
                var new_save_element = {};
                var slot_in_question = slots[slot];
                var saved_element_name = slot_in_question["measure"];
                
                if (slot == "current_average") {
                    saved_element_name = "current_average";
                }
                
                new_save_element["measure"] = slot_in_question["measure"];
                
                new_save_element["weight"] = slot_in_question["weight"];
                new_save_element["number"] = slot_in_question["number"];
                saved[saved_element_name] = new_save_element;

                var measureInt = slot_in_question["number"];
                var weightInt = slot_in_question["weight"];
                average += measureInt * (weightInt / denom);
            }
            var newMeasure = ints_to_strings[Math.round(average)];
            var newWeight = denom;
            var url =  fireString + "-JgOwwFlFThZOqBMUnP0/" + day + "/" + hour;
            var updateRef = new Firebase(url);
            updateRef.set({
                "current_average": {
                    "measure":newMeasure,
                    "number":strings_to_ints[newMeasure],
                    "weight":newWeight,
                },
                "Not Crowded": {
                    "measure":"Not Crowded",
                    "number":saved["Not Crowded"]["number"],
                    "weight":saved["Not Crowded"]["weight"],
                },
                "Mildly Crowded": {
                    "measure":"Mildly Crowded",
                    "number":saved["Mildly Crowded"]["number"],
                    "weight":saved["Mildly Crowded"]["weight"],
                },
                "Very Crowded": {
                    "measure":"Very Crowded",
                    "number":saved["Very Crowded"]["number"],
                    "weight":saved["Very Crowded"]["weight"],
                },
                "Extreme": {
                    "measure":"Extreme",
                    "number":saved["Extreme"]["number"],
                    "weight":saved["Extreme"]["weight"],
                },
            }); 

        }
    }
    fireRef.update({Locked : false });
    fireRef.update({Size : 0});
    var dataText = snapshot.child("-JgOwwFlFThZOqBMUnP0").child(day).child(hour).child("current_average").child("measure").val();
    if (dataText == null) {
        $("#data").text(closedMessage);
        return;
    } else if (USE_PERCENTS) {
        $("#percentage").text(strings_to_percents[dataText]);
    }
    $("#data").text(dataText);
}

// Gets the denominator of a list of nodes
function getDenom(dataPoints) {
    var result = 0;
    for (var d in dataPoints) {
        var current = dataPoints[d];
        result += current["weight"];
    }
    return result;
}

// Given a heuristic string, returns an integer value representing
// that string.
function weight(string) {
    return strings_to_ints[string];
}

// Sets a cookie for disallowing multiple votes
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// Gets a cookie with name CNAME
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

// Checks whether user has already voted. Returns true if
// the user already voted.
function checkCookie(data) {
    var voteCookie = getCookie("user_data");
    if (voteCookie != "") {
        alert("You already voted, thanks!");
        return true;
    } else {
        setCookie("user_data", data, 1);
        return false;
    }
}

$(document).ready(function(){
    // True iff feedback has not already been sent
    var feedbackSent = false;

    var d = new Date();
    var dayNumber = d.getDay();
    var hour = d.getHours() * 100;
    var day = days[dayNumber];
    
    // This function will be called when the data is changed in the server
    fireRef.once('value', function (snapshot) {
        var dataText = null;
        var locked = snapshot.child("Locked").val();
        if (!locked) {
            checkLoadFactor(snapshot, day, hour);
        } else {
            dataText = snapshot.child(day).child(hour).val();
            if (dataText == null) {
                $("#data").text(closedMessage);
            } else {
                applyColors(dataText);
                if (USE_PERCENTS) {
                    var percent = strings_to_percents[dataText];
                    $("#percentage").text(percentage);        
                }
                if (dataText == "Mildly Crowded") {
                    $("#data").text("Fairly Empty"); 
                } else {
                    $("#data").text(dataText);  
                }
            }
        } 
    }, function (errorObject) {
        var dataText = "Either the RSF is closed, or something went wrong.";
        $("#data").text(dataText);
    });

    // Feedback data form
    $("#send_data_submit").click(function() {
        if (!feedbackSent || !checkCookies) {
            obscure("Calculating your location...");
            navigator.geolocation.getCurrentPosition(checkLocation);
        } else {
            alert("Thanks, we got it!");
        }
    })

    // Obscures the screen with a message MESSAGE.
    function obscure(message) {
        $(".obscure_window_container").fadeIn(200);
        $(".obscure_window_text").text(message);
    }

    // Deobscures the screen.
    function deobscure() {
        $(".obscure_window_container").fadeOut(200);
    }

    // Checks the location of the user and sends data, if okay.
    function checkLocation(location) {
        if (navigator.geolocation) {
            var latitude = location.coords.latitude;
            var longitude = location.coords.longitude;
            var dist = distance(longitude, latitude, RSF_LONG, RSF_LAT);
            if (dist > ALLOWED_RADIUS) {
                alert("You aren't actually at the RSF.");
                deobscure();
            } else {
                var data = null;
                for (var i = 1; i < 5; i++) {
                    var radioNum = "radio" + i;
                    if (document.getElementById(radioNum).checked) {
                        data = $("#" + radioNum).val();
                    }
                }
                if (!checkCookie(data) || !checkCookies) {
                    if (!allowed_measures.has(data)) {
                        alert("Bad data input.");
                        deobscure();
                    } else {
                        fireRef.once('value', function(snapshot) {
                            var size = snapshot.child("Size").val();
                            console.log("Data: " + data);
                            var prevWeight = snapshot.child("-JgOwwFlFThZOqBMUnP0").child(day).child(hour).child(data).child("weight").val();
                            console.log("Previous weight: " + prevWeight);
                            size += 1;
                            fireRef.update({Size : size});
                            addData(data, prevWeight);
                        });
                    } 
                }
            }
        } else {
            alert("Location services not working");
            deobscure();
        }    
    }

    // Adds data to the firebase server
    function addData(data, prevWeight) {
        var url = fireString + "-JgOwwFlFThZOqBMUnP0/" + 
            day + "/" + hour + "/" + data;
        var updateRef = new Firebase(url);
        var newWeight = prevWeight + 1;
        console.log("New weight: " + newWeight);
        updateRef.set({
            "measure":data,
            "number":strings_to_ints[data],
            "weight":newWeight,
        });
        feedbackSent = true;
        alert("Thanks, we got it!");
        deobscure();
    }
});
