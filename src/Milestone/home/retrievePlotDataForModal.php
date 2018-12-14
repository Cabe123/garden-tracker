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


while($row = mysqli_fetch_assoc($result))
{
    $plotID = $row['PlotID'];
    echo "<tr>";
        echo "<td>" . "<h5>" . $row['PlotName'] . "</h5>" . "</td>";
        echo "<td>" . "<button id='$plotID' type='button' class='btn btn-sm btn-danger tableDeleteBtn'>" . "Delete" . "</button>" . "</td>"; 
    echo "</tr>";
}

$conn->close();


?>