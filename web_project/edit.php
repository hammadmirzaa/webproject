<?php

// Allow CORS requests from the specified origin (your frontend)
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

// Handle OPTIONS request (preflight request for CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;  // Respond with status 200 and no content for OPTIONS preflight requests
}

$host = 'localhost';
$dbname = 'web_project';  
$username = 'root';     
$password = '';     

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the 'id' and data are passed in the request
if (isset($_GET['id']) && isset($_GET['name']) && isset($_GET['email']) && isset($_GET['mobile'])) {
    $id = $_GET['id'];
    $name = $_GET['name'];
    $email = $_GET['email'];
    $mobile = $_GET['mobile'];

    // SQL query to update the record in the database
    $sql = "UPDATE web_project SET name = ?, email = ?, mobile = ? WHERE id = ?";  // Update table name if needed

    // Prepare and bind the statement
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssi", $name, $email, $mobile, $id); // "s" means string type for name, email, mobile, "i" means integer type for ID
        $stmt->execute();

        // Check if a row was updated
        if ($stmt->affected_rows > 0) {
            // Fetch the updated data from the database
            $fetchSql = "SELECT * FROM web_project";  // Update table name if needed
            $result = $conn->query($fetchSql);

            if ($result->num_rows > 0) {
                $data = [];
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }

                // Send the updated data as a JSON response
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Data updated successfully',
                    'data' => $data  // Return the updated data
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'No records found in the database',
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'No record found with that ID',
            ]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to prepare the SQL statement',
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'ID or data parameters missing',
    ]);
}

// Close the database connection
$conn->close();
?>
