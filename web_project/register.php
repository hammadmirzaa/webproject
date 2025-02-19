<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection
$host = 'localhost';
$dbname = 'web_project';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

// Check if all required fields are set
if (isset($data['username']) && isset($data['email']) && isset($data['password'])) {
    $username = $data['username'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash the password for security

    // SQL query to insert a new user
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sss", $username, $email, $password);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "User registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "User registration failed"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}

$conn->close();
?>
