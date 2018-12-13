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

$plotID = intval($_POST['PlotID']);
//$userID = intval($_POST['UserID']);
$userID = $_SESSION['userID'];

$sql = "SELECT `RowID`, `RowName`, `RowETA`, `RowColor` FROM `rows_test` WHERE UserID = '$userID' AND PlotID = '$plotID'";
$result = $conn->query($sql);

$json_array = array();


while($row = mysqli_fetch_assoc($result))
{
    $json_array[] = $row;
    //echo json_encode($row);
}

echo json_encode($json_array);

$conn->close();


?>