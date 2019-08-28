$(document).ready(function () {

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


    $("#submit-input").on("click", function () {
        event.preventDefault();

        // Grabbed Values
        var name = $("#train.name").val().trim();
        var destination = $("#train-destination").val().trim();
        var time = $("#train-time").val().trim();
        var frequency = $("#train-frequency").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency
        };

        // Uploads employee data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);


        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");
    });

    // Create Firebase event for adding train info to the database and a row in the html when a user adds information
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;

        // Train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);


        //Create next arrival time


        //Create minutes away

        

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainTime),
            $("<td>").text(trainFrequency),
        );

        // Append the new row to the table
        $("#table-area > tbody").append(newRow);
    });



});

