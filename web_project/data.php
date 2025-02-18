<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_project";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch all records from the users table
$sql = "SELECT * FROM web_project";

// Execute the query and check if the result is valid
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Create an array to hold the data
    $data = [];
    
    // Fetch all rows as associative arrays
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Return the data as a JSON response
    echo json_encode(['status' => 'success', 'data' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No records found']);
}

// Close the database connection
$conn->close();
?>
