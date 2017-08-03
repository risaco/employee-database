$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyCkOKvemoaIHzwCXXzssVxJeiAN38tqvOI",
        authDomain: "employee-database-d9e5a.firebaseapp.com",
        databaseURL: "https://employee-database-d9e5a.firebaseio.com",
        projectId: "employee-database-d9e5a",
        storageBucket: "",
        messagingSenderId: "450233857300"
    };
    firebase.initializeApp(config);


    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values for Database Storage
    var name = "";
    var role = "";
    var startDate = "";
    var monthlyRate = "";

    // Capture Button Click
    $("#add-user").on("click", function(event) {
        event.preventDefault();

        // Grabbed values from text boxes
        name = $("#name-input").val().trim();
        email = $("#email-input").val().trim();
        age = $("#age-input").val().trim();
        comment = $("#comment-input").val().trim();

        // Code for handling the push
        database.ref().push({
            name: name,
            email: email,
            age: age,
            comment: comment,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        // Console.loging the last user's data
        console.log(sv.name);
        console.log(sv.email);
        console.log(sv.age);
        console.log(sv.comment);

        // Change the HTML to reflect
        $("#name-display").html(sv.name);
        $("#email-display").html(sv.email);
        $("#age-display").html(sv.age);
        $("#comment-display").html(sv.comment);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});