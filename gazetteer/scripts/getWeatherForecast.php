<?php
// Check if lat and lng parameters are provided
if (!isset($_GET['lat']) || !isset($_GET['lng'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Latitude and longitude parameters are required.'));
    exit;
}

$apiKey = 'e66eee081a7846c2a6a180153240602';

$lat = $_GET['lat'];
$lng = $_GET['lng'];

// Validate lat and lng parameters
if (!is_numeric($lat) || !is_numeric($lng)) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Latitude and longitude parameters must be numeric.'));
    exit;
}

$apiUrl = "http://api.weatherapi.com/v1/forecast.json?key={$apiKey}&q={$lat},{$lng}&days=3&aqi=no&alerts=no";

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
