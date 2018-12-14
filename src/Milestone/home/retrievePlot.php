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

$UserID = $_SESSION['userID']; 

$sql = "SELECT `PlotID`, `PlotName` FROM `plots_test` WHERE UserID = '$UserID'";
$result = $conn->query($sql);

$json_array = array();

while($row = mysqli_fetch_assoc($result))
{
    $json_array[] = $row;
}

echo json_encode($json_array);

$conn->close();


?>