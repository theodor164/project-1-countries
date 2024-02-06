<?php

$lat = $_GET['lat'];
$lng = $_GET['lng'];

// Build the OpenCage API URL
$apiUrl = "http://api.geonames.org/findNearByWeatherJSON?lat={$lat}&lng={$lng}&username=theodor164";

// Make the request to OpenCage API
$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>