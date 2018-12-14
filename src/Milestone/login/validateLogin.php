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

$un = $_POST['username'];
$pw = $_POST['password'];

$sql = "SELECT `UserPW`, `UserID` FROM `users_test` WHERE `UserName` = '$un'";
$result = $conn->query($sql);
$row = mysqli_fetch_assoc($result);

$userID = $row['UserID'];
$_SESSION["userID"] = $userID;

$DBpw = $row['UserPW'];

if(password_verify($pw, $DBpw)){
    header('Location: ../home/home.html');
}else{
    print "Invalid login";
}

$conn->close();


?>