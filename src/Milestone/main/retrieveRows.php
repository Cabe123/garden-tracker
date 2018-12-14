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

$plotID = intval($_POST['PlotID']);
$userID = $_SESSION['userID'];

$sql = "SELECT `RowID`, `RowName`, `RowETA`, `RowColor` FROM `rows_test` WHERE UserID = '$userID' AND PlotID = '$plotID'";
$result = $conn->query($sql);

$json_array = array();


while($row = mysqli_fetch_assoc($result))
{
    $json_array[] = $row;
}

echo json_encode($json_array);

$conn->close();


?>