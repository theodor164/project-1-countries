<?php
// getLocationInfo.php

// API key from OpenCage - Replace with your API key
$apiKey = '614ade6b25c54593bf6264956fa5ef43';

// Get latitude and longitude from the AJAX request
$country = $_GET['country'];

// Encode the country name
$encodedCountry = urlencode($country);

// Build the OpenCage API URL
$apiUrl = "https://api.opencagedata.com/geocode/v1/json?q={$encodedCountry}&key={$apiKey}";

// Make the request to OpenCage API
$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>