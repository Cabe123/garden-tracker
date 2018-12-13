<?php 

$servername = "localhost";
$username = "root";
$password = null;
$dbname = "testdb";

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

$rowName = $_POST['RowName'];
$rowETA = $_POST['RowETA'];
$rowColor = $_POST['RowColor'];


$sql = "INSERT INTO  rows_test (RowName, RowETA, RowColor, UserID, PlotID)
VALUES ('$rowName', '$rowETA', '$rowColor', '$userID', '$plotID')";

if ($conn->query($sql) === TRUE) {
    echo "<h3 style='color:rgb(0, 187, 31);'> Success: Row has been saved</h3>";
} else {
    echo "<h3 style='color:rgb(224, 32, 64);'>Error: Row could not be saved</h3>";
}

$conn->close();


?>

