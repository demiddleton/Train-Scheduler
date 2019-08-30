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


    $(".addTrain").on("click", function () {
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

        
        // Creates local "temporary" object for holding train data
        var newTrain = {
            tName: trainName,
            tDestination: trainDestination,
            tTime: trainTime,
            tFrequency: trainFrequency,
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.tName);
        console.log(newTrain.tDestination);
        console.log(newTrain.tTime);
        console.log(newTrain.tFrequency);


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

