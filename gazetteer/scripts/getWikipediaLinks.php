<?php
// Check if city parameter is provided
if (!isset($_GET['city'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'City parameter is required.'));
    exit;
}

$city = $_GET['city'];

// Validate city parameter 
if (empty($city)) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'City parameter cannot be empty.'));
    exit;
}

$encodedCity = urlencode($city);

$apiUrl = "http://api.geonames.org/wikipediaSearchJSON?q={$encodedCity}&maxRows=5&username=theodor164";

// Make the request to the API
$response = file_get_contents($apiUrl);

// Check if request was successful
if ($response === FALSE) {
    http_response_code(500); // Internal Server Error
    echo json_encode(array('error' => 'Error making request to the API.'));
    exit;
}

// Send the response back to the client
echo $response;
?>
