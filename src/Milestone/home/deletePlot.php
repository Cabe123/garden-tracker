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

// IDs
$plotID = intval($_POST['PlotID']);
$userID = $_SESSION['userID'];


$sqlRow = "DELETE FROM `rows_test` WHERE UserID = $userID AND PlotID = $plotID";
$sqlPlot = "DELETE FROM `plots_test` WHERE UserID = $userID AND PlotID = $plotID";

if ($conn->query($sqlRow) === TRUE) {
    echo "Success";
} else {
    echo "Error: " . $conn->error;
}

if ($conn->query($sqlPlot) === TRUE) {
    echo "Success";
} else {
    echo "Error: " . $conn->error;
}



$conn->close();


?>