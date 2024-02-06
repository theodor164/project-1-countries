<?php

// Get latitude and longitude from the AJAX request
$city = $_GET['city'];

// Build the OpenCage API URL
$apiUrl = "http://api.geonames.org/wikipediaSearchJSON?q={$city}&maxRows=5&username=theodor164";

// Make the request to OpenCage API
$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>