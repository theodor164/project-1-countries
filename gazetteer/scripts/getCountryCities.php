<?php
// Check if country and countryFull parameters are provided
if (!isset($_GET['country']) || !isset($_GET['countryFull'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Country and countryFull parameters are required.'));
    exit;
}

$country = $_GET['country'];
$countryFull = $_GET['countryFull'];

// Validate country parameter
if (!preg_match('/^[A-Za-z]{2}$/', $country)) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Invalid country code format.'));
    exit;
}

// Encode the countryFull parameter
$encodedCountry = urlencode($countryFull);

$apiUrl = "http://api.geonames.org/searchJSON?q={$encodedCountry}&maxRows=30&username=theodor164&country={$country}";

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
