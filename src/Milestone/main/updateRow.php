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

$rowName = $_POST['RowName'];
$rowETA = $_POST['RowETA'];
$rowColor = $_POST['RowColor'];
$rowID = intval($_POST['RowID']);

$sql = "UPDATE `rows_test` SET `RowName`='$rowName', `RowETA`='$rowETA', `RowColor`='$rowColor' WHERE UserID = $userID AND PlotID = $plotID AND RowID = $rowID";

if ($conn->query($sql) === TRUE) {
    echo $plotID . " " . $userID . " " . $rowID . " ";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();


?>