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

var name = "";
var destination = "";
var Time = "";
var frequency = 0;

