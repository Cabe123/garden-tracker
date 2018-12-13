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
$rowID = intval($_POST['RowID']);

$sql = "DELETE FROM `rows_test` WHERE UserID = $userID AND PlotID = $plotID AND RowID = $rowID";

if ($conn->query($sql) === TRUE) {
    echo $plotID . " " . $userID . " " . $rowID . " ";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();


?>