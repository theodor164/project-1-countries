<?php
// getLocationInfo.php

// Check if latitude and longitude parameters are provided
if (!isset($_GET['lat']) || !isset($_GET['lng'])) {
  http_response_code(400); // Bad Request
  echo json_encode(array('error' => 'Latitude and longitude parameters are required.'));
  exit;
}

// API key from OpenCage - Replace with your API key
$apiKey = '614ade6b25c54593bf6264956fa5ef43';

// Get latitude and longitude from the AJAX request
$lat = $_GET['lat'];
$lng = $_GET['lng'];

// Validate latitude and longitude
if (!is_numeric($lat) || !is_numeric($lng)) {
  http_response_code(400); // Bad Request
  echo json_encode(array('error' => 'Latitude and longitude must be numeric values.'));
  exit;
}

// Build the OpenCage API URL
$apiUrl = "https://api.opencagedata.com/geocode/v1/json?q={$lat}+{$lng}&key={$apiKey}";

// Make the request to OpenCage API
$response = file_get_contents($apiUrl);

// Check if request was successful
if ($response === FALSE) {
  http_response_code(500); // Internal Server Error
  echo json_encode(array('error' => 'Error making request to OpenCage API.'));
  exit;
}
// Send the response back to the client
echo $response;
?>