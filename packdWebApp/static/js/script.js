$(document).ready(function(){
    // Here's our firebase url:
    var fireRef = new Firebase("https://packd.firebaseio.com/");
    
    // This function will be called when the data is changed in the server
    fireRef.on('value', function (snapshot) {
        var dataText = snapshot.child("test_text").val();
        $("#test").text(dataText);
    }, function (errorObject) {
        var dataText = "Sorry, we couldn't get any data right now.";
        $("#test").text(dataText);
    });

    

    
});