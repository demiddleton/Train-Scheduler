$(document).ready(function () {

    // Connect with Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyCi8shGwo1h69ZVMp20YqJ8GGSPhVzsys0",
        authDomain: "train-schedule-740c8.firebaseapp.com",
        databaseURL: "https://train-schedule-740c8.firebaseio.com",
        projectId: "train-schedule-740c8",
        storageBucket: "",
        messagingSenderId: "190155203085",
        appId: "1:190155203085:web:d67d8854343cac09"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();


    $("#add-train").on("click", function () {
        event.preventDefault();

        // Grabbed Values
        var tName = $("#train-name").val().trim();
        var tDestination = $("#train-destination").val().trim();
        var tTime = moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var tFrequency = $("#train-frequency").val().trim();

        //Check variables
        console.log(tName);
        console.log(tDestination);
        console.log(tTime);
        console.log(tFrequency);


        // Uploads train data to the database
        database.ref().push({

            tName: tName,
            tDestination: tDestination,
            tTime: tTime,
            tFrequency: tFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");


        // Create Firebase event for adding train info to the database and a row in the html when a user adds information

        database.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot.val());

            var tTime = moment(childSnapshot.val().tTime, "hh:mm").subtract(1, "years");
            // Store times into variables.
            var x = moment().diff(moment(tTime), "minutes");
            var minsAway = x % childSnapshot.val().tFrequency - minsAway;
            var nextArrival = moment(nextArrival).format("hh:mm");

            var newRow = $("<tr>").append(
                 $("<td>").text(tName),
                 $("<td>").text(tDestination),
                 $("<td>").text(tFrequency),
                $("<td>").text(nextArrival),
                $("<td>").text(minsAway)
                 );

              // Append the new row to the table
                $(".table").append(newRow);

        });
    });

});

