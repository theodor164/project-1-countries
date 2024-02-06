<?php
// getLocationInfo.php

// API key from OpenCage - Replace with your API key
$apiKey = 'e66eee081a7846c2a6a180153240602';

// Get latitude and longitude from the AJAX request
$lat = $_GET['lat'];
$lng = $_GET['lng'];

// Build the OpenCage API URL
$apiUrl = "http://api.weatherapi.com/v1/forecast.json?key={$apiKey}&q={$lat},{$lng}&days=3&aqi=no&alerts=no";

// Make the request to OpenCage API
$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>