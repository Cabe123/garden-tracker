<?php 

$servername = "";
$username = "";
$password = "";
$dbname = "";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$un = $_POST['username'];
$pw = $_POST['password'];

$pwHash = password_hash($pw, PASSWORD_DEFAULT);

$sql = "INSERT INTO  users_test (UserName, UserPW)
VALUES ('$un', '$pwHash')";

if ($conn->query($sql) === TRUE) {
    echo "Info was successfully inserted";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}



$conn->close();


?>