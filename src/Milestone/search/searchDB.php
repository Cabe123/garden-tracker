<?php 

$servername = "";
$username = "";
$password = "";
$dbname = "";;

session_start();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$userID = $_SESSION['userID'];
$word = $_POST['searchField'];

$sql = "SELECT * FROM `rows_test` WHERE `UserID` = $userID AND `RowName` LIKE '%$word%'";
$result = $conn->query($sql);

echo "<tr class='searchHeader'>";
     echo "<th>Name</th>";
     echo "<th>ETA</th>";
     echo "<th>Yield</th>";
    echo "<th>Plot</th>";
echo "</tr>";

while($row = mysqli_fetch_assoc($result))
{   
    $plotID = intval($row['PlotID']);
    
    $sqlName = "SELECT `PlotName` FROM `plots_test` WHERE PlotID = $plotID";
    $resultName = $conn->query($sqlName);
    $rowName = mysqli_fetch_assoc($resultName);
    
    $color = $row['RowColor'] . "Search";
        echo "<tr class ='$plotID'>";
            echo "<td>" . $row['RowName'] . "</td>";
            echo "<td>" . $row['RowETA'] . "</td>";
            echo "<td>". "<div class='$color'>" . "</div>" . "</td>";
            echo "<td class ='searchPlotData'>" . $rowName['PlotName'] . "</td>";
        echo "<tr>";
}

$conn->close();


?>