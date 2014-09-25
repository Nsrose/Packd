$(document).ready(function(){
    // Get data from Firebase
    var fireRef = new Firebase("https://radiant-torch-8194.firebaseio.com/");
    fireRef.on('value', function (snapshot) {
        var dataText = snapshot.child("user_data_text").val();
        $("#test").text(dataText);
    }, function (errorObject) {
        var dataText = "Sorry, we couldn't get any data right now.";
        $("#test").text(dataText);
    });

    

    
});