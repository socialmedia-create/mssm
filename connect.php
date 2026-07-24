<?php
$servername = "localhost:3306"; // Or check GoDaddy's DB hostname
$username = "mssm";
$password = "mssm@202512345";
$database = "mssmdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully!";
?>