<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$dbname = 'web_project';  
$username = 'root';     
$password = '';     

try {
    // Create a new PDO connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $image = $_POST['image'];

    // SQL query to insert data into the table
    $sql = "INSERT INTO web_project (name, description, price, image) VALUES (:name, :description, :price, :image)";
    
    // Prepare the SQL statement
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':image', $image);

    // Execute the query and check if the data was inserted successfully
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to insert data"]);
    }
} catch (PDOException $e) {
    // Catch and handle any exceptions
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
