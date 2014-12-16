var days = {
    "0":"Sunday",
    "1":"Monday",
    "2":"Tuesday",
    "3":"Wednesday",
    "4":"Thursday",
    "5":"Friday",
    "6":"Saturday",
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
});