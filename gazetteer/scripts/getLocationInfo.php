<?php
// getLocationInfo.php

// API key from OpenCage - Replace with your API key
$apiKey = '614ade6b25c54593bf6264956fa5ef43';

// Get latitude and longitude from the AJAX request
$lat = $_GET['lat'];
$lng = $_GET['lng'];

// Build the OpenCage API URL
$apiUrl = "https://api.opencagedata.com/geocode/v1/json?q={$lat}+{$lng}&key={$apiKey}";

// Make the request to OpenCage API
$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>