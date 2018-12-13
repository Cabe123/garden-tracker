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
//echo "Connected successfully";

// IDs
$plotID = intval($_POST['PlotID']);
//$userID = intval($_POST['UserID']);
$userID = $_SESSION['userID'];

$rowName = $_POST['RowName'];
$rowETA = $_POST['RowETA'];
$rowColor = $_POST['RowColor'];
$rowID = intval($_POST['RowID']);

// $sql = "INSERT INTO  rows_test (RowName, RowETA, RowColor, UserID, PlotID)
// VALUES ('$rowName', '$rowETA', '$rowColor', '$userID', '$plotID')";

$sql = "UPDATE `rows_test` SET `RowName`='$rowName', `RowETA`='$rowETA', `RowColor`='$rowColor' WHERE UserID = $userID AND PlotID = $plotID AND RowID = $rowID";

if ($conn->query($sql) === TRUE) {
    echo $plotID . " " . $userID . " " . $rowID . " ";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();


?>