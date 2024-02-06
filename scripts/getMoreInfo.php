<?php

// Get latitude and longitude from the AJAX request
$country = $_GET['country'];

// Build the OpenCage API URL
$apiUrl = "http://api.geonames.org/countryInfoJSON?formatted=true&country={$country}&username=theodor164&style=full";

// Make the request to OpenCage API
$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>