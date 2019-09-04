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

    function displayTime() {
        var time = moment().format('hh:mm:ss');
        $('#current-time').html("Current Time: " + time);
        setTimeout(displayTime, 1000);
    }
    displayTime();


    $("#add-train").on("click", function () {
        event.preventDefault();

        // Grabbed Values
        var tName = $("#train-name").val().trim();
        var tDestination = $("#train-destination").val().trim();
        var tTime = $("#train-time").val().trim();
        var tFrequency = $("#train-frequency").val().trim();

        //Check variables
        console.log(tName);
        console.log(tDestination);
        console.log(tFrequency);
        console.log(tTime);


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

        database.ref().once("child_added", function (childSnapshot) {

            // Store times into variables.
            var trainDiff = 0;
            var trainRemainder = 0;
            var minsAway = "";
            var nextArrival = "";

            //Convert tTime into standard time
            var startTime = moment(childSnapshot.val().tTime, "hh:mm").subtract(1, "years");

            //Find difference in time from 'now' and the first train and convert to minutes
            var trainDiff = moment().diff(moment(startTime), "minutes");
            console.log(trainDiff)

            //Get the remainder of time by using 'moderator' with the frequency & time difference
            trainRemainder = trainDiff % tFrequency;

            //Subtract the remainder from the frequency
            minsAway = tFrequency - trainRemainder;

            //Find next train & convert to standard time format
            nextArrival = moment().add(minsAway, "minmutes").format("hh:mm A");


            //var newRow = $("<tr>").append(
            //     $("<td>").text(tName),
            //      $("<td>").text(tDestination),
            //      $("<td>").text(tFrequency),
            //     $("<td>").text(nextArrival),
            //     $("<td>").text(minsAway),
            //     );

            var newRow = $("<tr>");

            newRow.append($("<td>" + tName + "</td>"));
            newRow.append($("<td>" + tDestination + "</td>"));
            newRow.append($("<td>" + tFrequency + "</td>"));
            newRow.append($("<td>" + nextArrival + "</td>"));
            newRow.append($("<td>" + minsAway + "</td>"));



            // Append the new row to the table
            $("#table-area").append(newRow);

        });

    });

});

