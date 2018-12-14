<?php 

$servername = "";
$username = "";
$password = "";
$dbname = "";

session_start();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$userID = $_SESSION['userID'];

$plotName = $_POST['PlotName'];

$sql = "INSERT INTO  plots_test (PlotName, UserID)
VALUES ('$plotName', '$userID')";

if ($conn->query($sql) === TRUE) {
    //echo "Plot was successfully inserted";
} else {
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


?>